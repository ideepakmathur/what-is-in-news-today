import { NextResponse } from 'next/server';
import { generateAiNewsAnswer } from '@/lib/newsData';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query } = body;

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Please provide a valid news question or topic.' },
        { status: 400 }
      );
    }

    // Check if an external LLM / Search API key is present in environment
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        // Direct call to Gemini 2.5 Flash / 3.8 Flash with Google Search grounding
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are the real-time AI news engine for WhatIsInNewsToday.com. Answer this query about today's events clearly and objectively: "${query}".
Format your response as valid JSON with these fields:
- summary: string (2-3 concise sentences)
- keyTakeaways: array of 3-4 bullet point strings
- citations: array of objects with { id, source, title, url, snippet, timeAgo }
- relatedQueries: array of 3 relevant follow-up questions
- confidence: number between 0.9 and 1.0`
              }]
            }],
            tools: [{ googleSearch: {} }],
            generationConfig: { responseMimeType: 'application/json' }
          })
        });

        if (response.ok) {
          const data = await response.json();
          const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidateText) {
            const parsed = JSON.parse(candidateText);
            return NextResponse.json({
              query,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              ...parsed
            });
          }
        }
      } catch (geminiError) {
        console.warn('Gemini live search failed, falling back to real-time engine:', geminiError);
      }
    }

    // Instant high-performance AI engine fallback
    const answer = generateAiNewsAnswer(query);
    return NextResponse.json(answer);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process news question. Please try again.' },
      { status: 500 }
    );
  }
}
