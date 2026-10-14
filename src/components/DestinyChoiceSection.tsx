import React from 'react';
import { sounds } from '../utils/soundEffects';

export const DestinyChoiceSection: React.FC = () => {
  const handleClickYes = () => {
    sounds.playUnlockSound();
  };

  return (
    <div className="py-6 sm:py-10">
      {/* Blank Antique Book Page */}
      <div className="relative max-w-xl mx-auto parchment-bg text-[#2e1c10] rounded-xl p-8 sm:p-14 border-2 border-[#824f2b] shadow-2xl flex flex-col items-center justify-center text-center space-y-8 min-h-[420px]">
        {/* Subtle decorative inner line */}
        <div className="absolute inset-4 border border-[#c49a6c]/50 rounded-lg pointer-events-none" />

        <div className="space-y-3 z-10">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif-kr text-[#3c1d0f] tracking-tight">
            운명을 바꿔쓰러 가볼까요?
          </h2>
          <p className="text-xs text-[#6e4627] font-serif-kr">
            성력 987년의 기록을 새로이 작성합니다.
          </p>
        </div>

        {/* Choice Box with "네" linked to the requested URL */}
        <div className="z-10 pt-2">
          <a
            href="https://share.crack.wrtn.ai/sui4dy0"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClickYes}
            className="inline-block px-8 py-3 rounded-lg bg-[#532712] hover:bg-[#6e361b] text-[#faedd8] border border-[#a87441] font-serif-kr text-sm font-bold shadow-md transition-all active:scale-95 cursor-pointer select-none"
          >
            네
          </a>
        </div>
      </div>
    </div>
  );
};
