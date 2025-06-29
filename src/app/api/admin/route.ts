import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json({ error: 'Password required' }, { status: 400 });
    }

    // Hash the provided password
    const hashedPassword = createHash('sha256').update(password).digest('hex');
    
    // This is the correct hash of "manahil"
    const correctPasswordHash = 'f7b1649abdf605d88904e6d617ccbd78feb609c59d4117428694b8d0776194ed';
    
    // Compare hashes
    if (hashedPassword === correctPasswordHash) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }
  } catch (error) {
    console.error('❌ Admin auth error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
} 