import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, frequency = 'daily_morning', categoryPreference = 'all' } = await request.json();

    if (!email || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Webhook integration for Beehiiv / ConvertKit / Substack / Resend
    const beehiivApiKey = process.env.BEEHIIV_API_KEY;
    const beehiivPubId = process.env.BEEHIIV_PUBLICATION_ID;

    if (beehiivApiKey && beehiivPubId) {
      try {
        await fetch(`https://api.beehiiv.com/v2/publications/${beehiivPubId}/subscriptions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${beehiivApiKey}`
          },
          body: JSON.stringify({
            email,
            reactivate_existing: false,
            send_welcome_email: true,
            utm_source: 'whatisinnewstoday_web'
          })
        });
      } catch (err) {
        console.warn('External newsletter sync skipped:', err);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'You are now subscribed to WhatIsInNewsToday Daily Briefing! Check your inbox for confirmation.',
      email,
      frequency
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Subscription failed. Please try again.' },
      { status: 500 }
    );
  }
}
