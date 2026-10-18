import { NextResponse } from 'next/server';
import { unsubscribeUser } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email, token } = await request.json();

    const target = email || token;
    if (!target) {
      return NextResponse.json({ error: 'Email or token is required to unsubscribe.' }, { status: 400 });
    }

    const result = unsubscribeUser(target);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process unsubscribe request.' }, { status: 500 });
  }
}
