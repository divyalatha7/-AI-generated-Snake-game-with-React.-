import React, { useState } from 'react';
import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { MusicQueue } from './components/MusicQueue';
import { DUMMY_TRACKS } from './types';

export default function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // Music State
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleTogglePlay = () => setIsPlaying(!isPlaying);
  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  };
  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  };
  const handleTrackSelect = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg-dark text-white font-sans overflow-hidden">
      {/* Header */}
      <header className="h-20 px-10 flex items-center justify-between border-b border-glass-border backdrop-blur-md z-20">
        <div className="text-2xl font-black tracking-[4px] uppercase text-neon-cyan neon-shadow-cyan">
          Neon Synth
        </div>
        <div className="font-mono text-xl bg-glass-bg px-6 py-2 border border-neon-pink neon-shadow-pink rounded-sm">
          HI: {highScore.toString().padStart(4, '0')} &nbsp; SCORE: {score.toString().padStart(4, '0')}
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-1 grid grid-cols-[300px_1fr_300px] gap-5 p-5 overflow-hidden">
        {/* Left Sidebar */}
        <div className="flex flex-col gap-5">
          <div className="glass-panel flex-1 p-5 flex flex-col">
            <div className="text-[10px] uppercase tracking-[2px] opacity-50 mb-1">Current Vibe</div>
            <div 
              className="w-full aspect-square rounded-lg mt-4 flex items-center justify-center text-4xl bg-cover bg-center border border-glass-border"
              style={{ backgroundImage: `url(${DUMMY_TRACKS[currentTrackIndex].cover})` }}
            >
              {!DUMMY_TRACKS[currentTrackIndex].cover && '⚡'}
            </div>
            <div className="mt-5">
              <h3 className="text-xl font-bold truncate">{DUMMY_TRACKS[currentTrackIndex].title}</h3>
              <p className="opacity-60 text-sm truncate">{DUMMY_TRACKS[currentTrackIndex].artist}</p>
            </div>
          </div>
          
          <div className="glass-panel p-4">
            <div className="text-[10px] uppercase tracking-[2px] opacity-50 mb-2">Controls</div>
            <div className="text-xs space-y-1 font-mono">
              <p><span className="text-neon-cyan">ARROWS</span> to Move</p>
              <p><span className="text-neon-pink">SPACE</span> to Pause</p>
            </div>
          </div>
        </div>

        {/* Center: Game */}
        <div className="flex items-center justify-center bg-black/40 border-2 border-neon-cyan rounded-lg relative overflow-hidden">
          <SnakeGame onScoreChange={setScore} onHighScoreChange={setHighScore} />
        </div>

        {/* Right Sidebar */}
        <div className="flex flex-col gap-5">
          <div className="glass-panel flex-1 p-5 overflow-hidden flex flex-col">
            <div className="text-[10px] uppercase tracking-[2px] opacity-50 mb-4">Queue</div>
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <MusicQueue 
                currentTrackId={DUMMY_TRACKS[currentTrackIndex].id} 
                onTrackSelect={handleTrackSelect} 
              />
            </div>
          </div>
          
          <div className="glass-panel p-5">
            <div className="text-[10px] uppercase tracking-[2px] opacity-50 mb-3">Game Speed</div>
            <div className="flex justify-between items-center">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-3 h-3 bg-neon-cyan rounded-full shadow-[0_0_10px_#00f3ff]" />
              ))}
              {[4, 5].map(i => (
                <div key={i} className="w-3 h-3 bg-white/20 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer: Music Player */}
      <footer className="h-[120px] bg-glass-bg border-t border-glass-border backdrop-blur-2xl z-20">
        <MusicPlayer 
          currentTrackIndex={currentTrackIndex}
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
          onNext={handleNext}
          onPrev={handlePrev}
          progress={progress}
          onProgressChange={setProgress}
        />
      </footer>
    </div>
  );
}
