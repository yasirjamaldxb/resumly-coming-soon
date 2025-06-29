import { NextResponse } from 'next/server';

// Keys for persistent storage (same as waitlist API)
const EMAILS_SET_KEY = 'resumly:emails';
const EMAILS_HISTORY_KEY = 'resumly:history';

// Access temporary storage (same as waitlist API)
declare global {
  var tempEmailStore: Set<string> | undefined;
  var tempEmailHistory: Array<{ email: string; timestamp: string }> | undefined;
}

export async function GET() {
  try {
    let totalSubscribers = 0;
    let recentEmails: string[] = [];
    let isPersistent = false;
    let storageMessage = '';

    try {
      // Try to use Vercel KV (persistent storage)
      const { kv } = await import('@vercel/kv');
      
      // Get total subscriber count from persistent storage
      totalSubscribers = await kv.scard(EMAILS_SET_KEY);
      
      // Get recent emails from persistent history (last 10)
      const recentEmailsRaw = await kv.lrange(EMAILS_HISTORY_KEY, 0, 9);
      
      // Parse and format recent emails
      recentEmails = recentEmailsRaw.map((item: string) => {
        try {
          const parsed = JSON.parse(item);
          return `${parsed.email} (${new Date(parsed.timestamp).toLocaleDateString()})`;
        } catch {
          return item; // fallback for any parsing issues
        }
      });

      isPersistent = true;
      storageMessage = 'Data loaded from persistent Vercel KV storage';
      
      console.log('✅ PERSISTENT STORAGE SUCCESS ✅');
      
    } catch (kvError) {
      // Fallback to temporary storage
      console.warn('⚠️ VERCEL KV NOT AVAILABLE - USING TEMPORARY STORAGE ⚠️');
      console.warn('🚨 DATA NOT PERSISTENT! 🚨');
      console.warn('Error:', kvError);
      
      // Get data from temporary storage
      totalSubscribers = global.tempEmailStore?.size || 0;
      recentEmails = (global.tempEmailHistory || [])
        .slice(-10)
        .reverse()
        .map(item => `${item.email} (${new Date(item.timestamp).toLocaleDateString()})`);
      
      isPersistent = false;
      storageMessage = '⚠️ Using temporary storage - Set up Vercel KV for persistence!';
    }

    // Log admin access with storage status
    console.log('🔐 Admin Dashboard Access');
    console.log('📊 Total Subscribers:', totalSubscribers);
    console.log('💾 Storage:', isPersistent ? 'Vercel KV (PERSISTENT)' : 'Memory (TEMPORARY)');
    console.log('🔒 Data Persistence:', isPersistent ? 'GUARANTEED' : '⚠️ NOT GUARANTEED');
    if (!isPersistent) {
      console.log('🚨 WARNING: Data will be lost on deployment!');
    }
    console.log('⏰ Access Time:', new Date().toLocaleString());
    console.log('================================');

    return NextResponse.json({
      totalSubscribers,
      recentEmails,
      isPersistent,
      message: storageMessage
    });
    
  } catch (error) {
    console.error('❌ Admin stats error:', error);
    console.error('🚨 CRITICAL: Unable to access any storage!');
    
    return NextResponse.json({ 
      error: 'Unable to load subscriber statistics',
      totalSubscribers: 0,
      recentEmails: [],
      isPersistent: false,
      message: 'Storage system temporarily unavailable'
    }, { status: 500 });
  }
} 