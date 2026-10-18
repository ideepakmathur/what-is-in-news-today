import { NextResponse } from 'next/server';
import { getAllArticles, getProactiveChatSuggestions } from '@/lib/db';
import { generateAiNewsAnswer } from '@/lib/newsData';

export async function GET() {
  // Returns 5 to 10 proactive suggestions for the chatbot
  const suggestions = getProactiveChatSuggestions(8);
  return NextResponse.json({
    prompt: "What do you want to know about today's US news?",
    suggestions
  });
}

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Please enter a question.' }, { status: 400 });
    }

    const cleanMsg = message.toLowerCase();
    const articles = getAllArticles();

    // Check if query matches any curated US article in our database
    const matchingArticle = articles.find(a => 
      cleanMsg.includes(a.title.toLowerCase()) || 
      a.summaryBullets.some(b => cleanMsg.includes(b.toLowerCase().substring(0, 20))) ||
      cleanMsg.includes(a.category.toLowerCase())
    );

    if (matchingArticle) {
      return NextResponse.json({
        reply: `Here is the verified report on **${matchingArticle.title}**:`,
        bullets: matchingArticle.summaryBullets,
        whyItMatters: matchingArticle.whyItMatters,
        source: matchingArticle.source,
        sourceUrl: matchingArticle.sourceUrl,
        slug: matchingArticle.slug,
        relatedQuestions: [
          `What are both sides saying about this?`,
          `How does this impact the US economy?`,
          `Show me more ${matchingArticle.category} news today`
        ]
      });
    }

    // Fallback to high-performance AI answer synthesis
    const aiAnswer = generateAiNewsAnswer(message);
    return NextResponse.json({
      reply: aiAnswer.summary,
      bullets: aiAnswer.keyTakeaways,
      whyItMatters: "Relevant to ongoing US federal, market, and technological developments.",
      citations: aiAnswer.citations,
      relatedQuestions: aiAnswer.relatedQueries
    });

  } catch (err) {
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 });
  }
}
