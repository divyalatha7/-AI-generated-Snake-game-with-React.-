import React from 'react';
import { DUMMY_TRACKS, Track } from '../types';
import { cn } from '../lib/utils';

interface MusicQueueProps {
  currentTrackId: string;
  onTrackSelect: (index: number) => void;
}

export const MusicQueue: React.FC<MusicQueueProps> = ({ currentTrackId, onTrackSelect }) => {
  return (
    <ul className="space-y-1">
      {DUMMY_TRACKS.map((track, index) => (
        <li
          key={track.id}
          onClick={() => onTrackSelect(index)}
          className={cn(
            "p-3 border-b border-glass-border flex items-center gap-3 cursor-pointer transition-all hover:bg-white/5",
            currentTrackId === track.id && "bg-neon-cyan/10 border-l-2 border-l-neon-cyan"
          )}
        >
          <div 
            className="w-10 h-10 bg-neutral-800 rounded flex-shrink-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${track.cover})` }}
          />
          <div className="overflow-hidden">
            <h4 className="text-sm font-bold truncate">{track.title}</h4>
            <p className="text-[10px] opacity-60 uppercase truncate">{track.artist}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};
