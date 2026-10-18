'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, ExternalLink, ArrowRight, CheckCircle2, ChevronRight, Loader2, Bot } from 'lucide-react';
import { NewsItem } from '@/lib/types';
import Link from 'next/link';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  bullets?: string[];
  whyItMatters?: string;
  source?: string;
  sourceUrl?: string;
  slug?: string;
  relatedQuestions?: string[];
}

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [proactiveStories, setProactiveStories] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load proactive 5-10 suggestions
  useEffect(() => {
    fetch('/api/chat')
      .then(res => res.json())
      .then(data => {
        if (data.suggestions) {
          setProactiveStories(data.suggestions);
        }
      })
      .catch(err => console.warn('Could not load proactive chat stories:', err));
  }, []);

  // Auto-scroll on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const q = (textToSend || inputMessage).trim();
    if (!q || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: q
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: q })
      });

      if (res.ok) {
        const data = await res.json();
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: data.reply,
          bullets: data.bullets,
          whyItMatters: data.whyItMatters,
          source: data.source,
          sourceUrl: data.sourceUrl,
          slug: data.slug,
          relatedQuestions: data.relatedQuestions
        };
        setMessages(prev => [...prev, botMsg]);
      }
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: 'Sorry, I had trouble retrieving that from our live US news database. Please try again.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStoryChipClick = (story: NewsItem) => {
    handleSend(`Explain the full details and impact of: ${story.title}`);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-xl shadow-blue-500/30 transition-all hover:scale-105 active:scale-95 ${
          isOpen ? 'hidden' : 'inline-flex'
        }`}
      >
        <div className="relative">
          <Bot className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
        </div>
        <div className="text-left">
          <p className="text-xs font-bold leading-tight">Ask US News Bot</p>
          <p className="text-[10px] text-blue-100">Live AI Assistant</p>
        </div>
      </button>

      {/* Chat Window Modal / Drawer */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[460px] h-[640px] max-h-[85vh] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300">
          {/* Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white flex items-center justify-between shrink-0 shadow-md">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-tight flex items-center gap-2">
                  <span>WhatIsInNewsToday Assistant</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                </h3>
                <p className="text-[11px] text-blue-100">Live US Aggregation Engine</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Conversation Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm">
            {/* Initial Welcome & Proactive Section */}
            <div className="bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/60 rounded-2xl p-4 text-zinc-800 dark:text-zinc-200">
              <div className="flex items-center gap-2 font-bold text-blue-800 dark:text-blue-300 mb-1">
                <Sparkles className="h-4 w-4" />
                <span>What do you want to know about today's US news?</span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-3">
                Ask about the economy, Federal Reserve, Supreme Court rulings, tech hubs, or healthcare.
              </p>

              {/* "Meanwhile, you might be interested in these 5-10 stories:" */}
              <div className="pt-2 border-t border-blue-200/60 dark:border-blue-900/40">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 block mb-2">
                  ⚡ Trending US Stories Right Now ({proactiveStories.length}):
                </span>

                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 scrollbar-none">
                  {proactiveStories.map((story, idx) => (
                    <button
                      key={story.id}
                      onClick={() => handleStoryChipClick(story)}
                      className="w-full text-left p-2 rounded-xl bg-white dark:bg-zinc-800/80 hover:bg-blue-100/70 dark:hover:bg-blue-900/40 border border-blue-100 dark:border-zinc-700 transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2 overflow-hidden mr-2">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shrink-0">
                          #{idx + 1}
                        </span>
                        <span className="truncate text-xs font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-blue-600 dark:group-hover:text-blue-300">
                          {story.title}
                        </span>
                      </div>
                      <ChevronRight className="h-3.5 w-3.5 text-zinc-400 group-hover:text-blue-600 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Chat History Messages */}
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl p-3.5 ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none shadow-sm'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-bl-none border border-zinc-200 dark:border-zinc-700'
                  }`}
                >
                  <p className="text-xs sm:text-sm whitespace-pre-wrap">{msg.text}</p>

                  {/* 3 Bullets if present */}
                  {msg.bullets && msg.bullets.length > 0 && (
                    <div className="mt-3 space-y-1.5 pt-2 border-t border-zinc-200 dark:border-zinc-700">
                      {msg.bullets.map((b, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-xs text-zinc-700 dark:text-zinc-300">
                          <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Why it matters */}
                  {msg.whyItMatters && (
                    <div className="mt-2.5 p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-300">
                      <span className="font-bold">💡 Why It Matters: </span>
                      {msg.whyItMatters}
                    </div>
                  )}

                  {/* Source or Permalink link */}
                  {msg.slug && (
                    <div className="mt-2 pt-2 border-t border-zinc-200 dark:border-zinc-700 flex items-center justify-between text-[11px]">
                      <span className="text-zinc-500">{msg.source}</span>
                      <Link
                        href={`/news/${msg.slug}`}
                        className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1"
                      >
                        <span>Full story page</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  )}
                </div>

                {/* Follow up suggestions */}
                {msg.relatedQuestions && msg.relatedQuestions.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5 max-w-[88%]">
                    {msg.relatedQuestions.map((rq, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(rq)}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-blue-50 text-zinc-700 hover:text-blue-600 border border-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-blue-950 transition-colors"
                      >
                        "{rq}"
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 text-zinc-500 text-xs p-2">
                <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                <span>Searching live US news database...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask anything about today's US news..."
              className="flex-1 bg-zinc-100 dark:bg-zinc-800 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 px-3.5 py-2.5 rounded-xl border border-transparent focus:border-blue-500 focus:outline-none"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="h-9 w-9 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white flex items-center justify-center transition-colors shrink-0"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
