'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, FastForward, X } from 'lucide-react';

interface AudioBriefingPlayerProps {
  scriptText: string;
  isOpen: boolean;
  onClose: () => void;
}

export const AudioBriefingPlayer: React.FC<AudioBriefingPlayerProps> = ({
  scriptText,
  isOpen,
  onClose
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [rate, setRate] = useState<number>(1.0);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && !('speechSynthesis' in window)) {
      setSupported(false);
    }
  }, []);

  const handlePlayPause = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPlaying(true);
      } else {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(scriptText);
        utterance.rate = rate;
        utterance.pitch = 1.0;

        utterance.onend = () => {
          setIsPlaying(false);
        };
        utterance.onerror = () => {
          setIsPlaying(false);
        };

        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
      }
    }
  };

  const handleRestart = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(scriptText);
    utterance.rate = rate;
    utterance.onend = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  const cycleRate = () => {
    const nextRate = rate === 1.0 ? 1.25 : rate === 1.25 ? 1.5 : 1.0;
    setRate(nextRate);
    if (isPlaying) {
      // Re-trigger with new rate
      handleRestart();
    }
  };

  const handleClose = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-md px-4 sm:px-0 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-zinc-900 text-white rounded-2xl shadow-2xl border border-zinc-800 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Volume2 className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-zinc-100">Today’s 60-Second Audio Brief</h4>
              <p className="text-[11px] text-zinc-400">AI Synthesized Voice Edition</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-zinc-400 hover:text-white p-1 rounded-md transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Player Controls */}
        <div className="flex items-center justify-between gap-3 bg-zinc-800/60 rounded-xl px-3 py-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePlayPause}
              className="h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-transform active:scale-95 shadow-md shadow-blue-500/20"
            >
              {isPlaying ? <Pause className="h-4 w-4 fill-white" /> : <Play className="h-4 w-4 fill-white ml-0.5" />}
            </button>

            <button
              onClick={handleRestart}
              className="p-2 text-zinc-400 hover:text-white transition-colors"
              title="Restart briefing"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={cycleRate}
              className="px-2.5 py-1 rounded-md bg-zinc-700/60 text-xs font-semibold text-zinc-200 hover:bg-zinc-700 transition-colors"
              title="Change playback speed"
            >
              {rate}x
            </button>
            <span className="text-xs text-zinc-400 font-mono">
              {isPlaying ? 'Playing...' : 'Ready'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
