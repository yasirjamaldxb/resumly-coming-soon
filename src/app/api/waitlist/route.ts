import { NextRequest, NextResponse } from 'next/server';
import { trackServerEvent } from '../../../lib/posthog-server';

// Keys for persistent storage
const EMAILS_SET_KEY = 'resumly:emails';
const EMAILS_HISTORY_KEY = 'resumly:history';

// Fallback in-memory storage (TEMPORARY - NOT PERSISTENT)
declare global {
  var tempEmailStore: Set<string> | undefined;
  var tempEmailHistory: Array<{ email: string; timestamp: string }> | undefined;
}

// Initialize fallback storage
if (!global.tempEmailStore) {
  global.tempEmailStore = new Set<string>();
}
if (!global.tempEmailHistory) {
  global.tempEmailHistory = [];
}

export async function POST(request: NextRequest) {
  let email = '';
  
  try {
    const requestBody = await request.json();
    email = requestBody.email;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
    }

    const emailLower = email.toLowerCase();
    let isPersistent = false;
    let totalEmails = 0;

    try {
      // Try to use Vercel KV (persistent storage)
      const { kv } = await import('@vercel/kv');
      
      // Check if email already exists in persistent storage
      const emailExists = await kv.sismember(EMAILS_SET_KEY, emailLower);
      if (emailExists) {
        return NextResponse.json({ error: 'This email is already on the waitlist' }, { status: 409 });
      }

      // Add email to persistent set
      await kv.sadd(EMAILS_SET_KEY, emailLower);
      
      // Create timestamp and entry for history
      const timestamp = new Date().toISOString();
      const historyEntry = { email, timestamp };
      
      // Add to persistent history list
      await kv.lpush(EMAILS_HISTORY_KEY, JSON.stringify(historyEntry));
      
      // Get total count
      totalEmails = await kv.scard(EMAILS_SET_KEY);
      isPersistent = true;
      
      console.log('✅ PERSISTENT STORAGE SUCCESS ✅');
      
    } catch (kvError) {
      // Fallback to temporary storage with warnings
      console.warn('⚠️ VERCEL KV NOT AVAILABLE - USING TEMPORARY STORAGE ⚠️');
      console.warn('🚨 EMAILS WILL BE LOST ON DEPLOYMENT! 🚨');
      console.warn('📋 Please set up Vercel KV database ASAP');
      console.warn('Error:', kvError);
      
      // Check duplicates in temporary storage
      if (global.tempEmailStore!.has(emailLower)) {
        return NextResponse.json({ error: 'This email is already on the waitlist' }, { status: 409 });
      }
      
      // Add to temporary storage
      global.tempEmailStore!.add(emailLower);
      const timestamp = new Date().toISOString();
      global.tempEmailHistory!.push({ email, timestamp });
      totalEmails = global.tempEmailStore!.size;
      isPersistent = false;
    }
    
    const formattedTime = new Date().toLocaleString();
    
    // Log signup with persistence status
    console.log('🎉 NEW WAITLIST SIGNUP 🎉');
    console.log('📧 Email:', email);
    console.log('⏰ Time:', formattedTime);
    console.log('📊 Total emails:', totalEmails);
    console.log('💾 Storage:', isPersistent ? 'Vercel KV (PERSISTENT)' : 'Memory (TEMPORARY)');
    console.log('🔒 Data Persistence:', isPersistent ? 'GUARANTEED' : '⚠️ NOT GUARANTEED');
    if (!isPersistent) {
      console.log('🚨 WARNING: Set up Vercel KV to prevent data loss!');
    }
    console.log('📝 CSV Row:', `${email},${new Date().toISOString()},landing-page`);
    console.log('================================');

    return NextResponse.json({ 
      success: true, 
      message: isPersistent 
        ? 'Successfully added to waitlist!' 
        : 'Added to waitlist (temporary storage - please set up Vercel KV for persistence)'
    });
    
  } catch (error) {
    console.error('❌ Waitlist signup error:', error);
    console.error('🚨 CRITICAL: Email may not be saved!');
    console.error('📧 Email that failed to save:', email);
    console.error('⏰ Timestamp:', new Date().toISOString());
    
    return NextResponse.json({ 
      error: 'Unable to process your request. Please try again.' 
    }, { status: 500 });
  }
} 