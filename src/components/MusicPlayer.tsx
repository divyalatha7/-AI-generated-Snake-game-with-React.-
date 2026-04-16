import React, { useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { DUMMY_TRACKS, Track } from '../types';

interface MusicPlayerProps {
  currentTrackIndex: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  progress: number;
  onProgressChange: (progress: number) => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  currentTrackIndex,
  isPlaying,
  onTogglePlay,
  onNext,
  onPrev,
  progress,
  onProgressChange,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const onTimeUpdate = () => {
    if (audioRef.current) {
      const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      onProgressChange(currentProgress || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = (newProgress / 100) * audioRef.current.duration;
      onProgressChange(newProgress);
    }
  };

  return (
    <div className="h-full px-10 flex items-center justify-between">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={onTimeUpdate}
        onEnded={onNext}
      />

      {/* Now Playing Info */}
      <div className="w-[250px]">
        <div className="text-[10px] uppercase tracking-[2px] opacity-50 mb-1">Now Playing</div>
        <div className="font-bold text-base truncate">{currentTrack.title}</div>
        <div className="text-xs opacity-50 truncate">
          {currentTrack.artist} • {audioRef.current ? formatTime(audioRef.current.currentTime) : '0:00'} / {audioRef.current ? formatTime(audioRef.current.duration) : '0:00'}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex-1 mx-16">
        <div className="relative w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-neon-cyan neon-shadow-cyan transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      </div>

      {/* Player Controls */}
      <div className="flex items-center gap-8">
        <button onClick={onPrev} className="text-white hover:text-neon-cyan transition-colors">
          <SkipBack className="w-5 h-5 fill-current" />
        </button>
        
        <button
          onClick={onTogglePlay}
          className="w-14 h-14 flex items-center justify-center bg-neon-cyan text-bg-dark rounded-full hover:scale-105 transition-all neon-shadow-cyan"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 fill-current" />
          ) : (
            <Play className="w-6 h-6 fill-current ml-1" />
          )}
        </button>

        <button onClick={onNext} className="text-white hover:text-neon-cyan transition-colors">
          <SkipForward className="w-5 h-5 fill-current" />
        </button>
      </div>
    </div>
  );
};

function formatTime(seconds: number): string {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
