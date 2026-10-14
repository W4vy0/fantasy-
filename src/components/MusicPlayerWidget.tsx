import React, { useState, useEffect } from 'react';
import { Disc3, VolumeX } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const MusicPlayerWidget: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    setIsPlaying(sounds.getIsBgmPlaying());
  }, []);

  const handleToggle = () => {
    const active = sounds.toggleBgm();
    setIsPlaying(active);
  };

  return (
    <button
      onClick={handleToggle}
      aria-label="음악 토글"
      className="relative w-9 h-9 rounded-full bg-[#20080b] border border-amber-700/60 flex items-center justify-center text-amber-300 hover:text-amber-100 transition-all active:scale-95 shadow-md"
    >
      {isPlaying ? (
        <Disc3 className="w-5 h-5 animate-spin text-amber-300" style={{ animationDuration: '3s' }} />
      ) : (
        <VolumeX className="w-4 h-4 text-stone-500" />
      )}
    </button>
  );
};
