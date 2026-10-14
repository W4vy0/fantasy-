import React, { useState } from 'react';
import { CHARACTERS, Character } from '../data/rofanData';
import { sounds } from '../utils/soundEffects';

export const CharacterBookshelfSection: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  // Row 1: 하늘(아멜리아), 검정(베아트리스), 연두(엘로디), 연보라(세라피나)
  const row1 = CHARACTERS.slice(0, 4);
  // Row 2: 회색(루시안), 갈색(로웬), 노랑(아드리안), 파랑(카시오)
  const row2 = CHARACTERS.slice(4, 8);

  const handleSelectBook = (char: Character) => {
    sounds.playPageFlipSound();
    setSelectedCharacter(char);
  };

  const handleCloseBook = () => {
    sounds.playBookCloseSound();
    setSelectedCharacter(null);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="border-b border-[#824f2b]/40 pb-2">
        <h2 className="text-xl sm:text-2xl font-bold font-serif-kr text-[#fae8d2]">
          등장인물 서고
        </h2>
        <p className="text-xs text-amber-200/70 font-serif-kr mt-0.5">
          책장에 꽂힌 서책을 선택하여 상세 정보를 확인하십시오
        </p>
      </div>

      {/* Realistic Antique Wooden Bookshelf Container */}
      <div className="rounded-2xl p-4 sm:p-7 bg-gradient-to-b from-[#180709] via-[#100305] to-[#0a0203] border-4 border-[#3e170e] shadow-[0_20px_50px_rgba(0,0,0,0.9)] space-y-8">
        
        {/* Tier 1 */}
        <div className="space-y-1">
          <div className="flex items-center justify-between px-2 text-[11px] font-cinzel text-amber-300/80 tracking-wider">
            <span>UPPER SHELF · SECTION I</span>
          </div>

          {/* Book Row 1 Inside Deep Shelf Alcove */}
          <div className="relative pt-6 pb-0 px-4 sm:px-8 bg-[#140507] rounded-t-lg shadow-[inset_0_15px_30px_rgba(0,0,0,0.95)] flex items-end justify-center gap-3 sm:gap-7 h-56 sm:h-64 border-x-4 border-t-4 border-[#240c06]">
            {row1.map((char, idx) => (
              <RealisticBookSpine
                key={char.id}
                character={char}
                heightVariance={idx % 2 === 0 ? 'h-48 sm:h-56' : 'h-44 sm:h-52'}
                widthVariance={idx === 1 ? 'w-14 sm:w-18' : 'w-12 sm:w-16'}
                isSelected={selectedCharacter?.id === char.id}
                onSelect={() => handleSelectBook(char)}
              />
            ))}
          </div>

          {/* Realistic Wooden Plank Shelf Base with Brass Edge */}
          <div className="h-6 sm:h-7 bg-gradient-to-r from-[#31130a] via-[#4d2113] to-[#31130a] border-t-2 border-[#804222] border-b-4 border-[#120502] shadow-2xl flex items-center justify-between px-4 rounded-b">
            <div className="w-4 h-1 bg-[#b46b38]/70 rounded-full" />
            <div className="h-2 w-28 bg-[#200c06] rounded-sm border border-[#6b3518]/50" />
            <div className="w-4 h-1 bg-[#b46b38]/70 rounded-full" />
          </div>
        </div>

        {/* Tier 2 */}
        <div className="space-y-1">
          <div className="flex items-center justify-between px-2 text-[11px] font-cinzel text-amber-300/80 tracking-wider">
            <span>LOWER SHELF · SECTION II</span>
          </div>

          {/* Book Row 2 Inside Deep Shelf Alcove */}
          <div className="relative pt-6 pb-0 px-4 sm:px-8 bg-[#140507] rounded-t-lg shadow-[inset_0_15px_30px_rgba(0,0,0,0.95)] flex items-end justify-center gap-3 sm:gap-7 h-56 sm:h-64 border-x-4 border-t-4 border-[#240c06]">
            {row2.map((char, idx) => (
              <RealisticBookSpine
                key={char.id}
                character={char}
                heightVariance={idx % 2 === 1 ? 'h-48 sm:h-56' : 'h-44 sm:h-52'}
                widthVariance={idx === 2 ? 'w-14 sm:w-18' : 'w-12 sm:w-16'}
                isSelected={selectedCharacter?.id === char.id}
                onSelect={() => handleSelectBook(char)}
              />
            ))}
          </div>

          {/* Realistic Wooden Plank Shelf Base */}
          <div className="h-6 sm:h-7 bg-gradient-to-r from-[#31130a] via-[#4d2113] to-[#31130a] border-t-2 border-[#804222] border-b-4 border-[#120502] shadow-2xl flex items-center justify-between px-4 rounded-b">
            <div className="w-4 h-1 bg-[#b46b38]/70 rounded-full" />
            <div className="h-2 w-28 bg-[#200c06] rounded-sm border border-[#6b3518]/50" />
            <div className="w-4 h-1 bg-[#b46b38]/70 rounded-full" />
          </div>
        </div>

      </div>

      {/* Realistic Opened Book Presentation (Click-to-view only) */}
      {selectedCharacter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-sm animate-fadeIn overflow-y-auto">
          <div className="relative max-w-2xl w-full parchment-bg text-[#2e1c10] rounded-xl p-5 sm:p-7 shadow-2xl border-4 border-[#8c572b] my-auto">
            {/* Close Button */}
            <button
              onClick={handleCloseBook}
              className="absolute right-4 top-4 px-3 py-1 rounded bg-[#522d13] text-[#faedd8] hover:bg-[#7a421b] text-xs font-serif-kr font-bold transition-colors cursor-pointer"
            >
              닫기
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start pt-2">
              {/* 1:1 Image */}
              <div className="sm:col-span-5 flex flex-col items-center">
                <div className="w-full max-w-[240px] aspect-square rounded-lg overflow-hidden border-2 border-[#8c572b] shadow-md bg-stone-900">
                  <img
                    src={selectedCharacter.imageUrl}
                    alt={selectedCharacter.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[11px] text-[#6d3e1d] font-serif-kr mt-2">
                  {selectedCharacter.bookColorName} 서책
                </span>
              </div>

              {/* Character Details: 성격 / 외관 / 과거 이유 + MBTI, 키, 신분 */}
              <div className="sm:col-span-7 space-y-3 font-serif-kr">
                <div className="border-b border-[#ad7f54] pb-2">
                  <h3 className="text-xl font-bold text-[#3c1d0f]">
                    {selectedCharacter.name}
                  </h3>
                  <div className="text-xs text-[#6b3e1f] mt-0.5">
                    {selectedCharacter.role} · {selectedCharacter.mbti} · {selectedCharacter.height}
                  </div>
                </div>

                {/* 성격 */}
                <div>
                  <span className="text-xs font-bold text-[#562916] block mb-0.5">
                    성격
                  </span>
                  <p className="text-xs text-[#3a2213] leading-relaxed bg-[#f0dfc5]/80 p-2.5 rounded border border-[#cb9f72]">
                    {selectedCharacter.personality}
                  </p>
                </div>

                {/* 외관 */}
                <div>
                  <span className="text-xs font-bold text-[#562916] block mb-0.5">
                    외관
                  </span>
                  <p className="text-xs text-[#3a2213] leading-relaxed bg-[#f0dfc5]/80 p-2.5 rounded border border-[#cb9f72]">
                    {selectedCharacter.appearance}
                  </p>
                </div>

                {/* 과거 이유 */}
                <div>
                  <span className="text-xs font-bold text-[#7a1c1c] block mb-0.5">
                    과거 이유
                  </span>
                  <p className="text-xs text-[#451414] leading-relaxed bg-[#fbebe8] p-2.5 rounded border border-[#e5a8a8]">
                    {selectedCharacter.hateReason}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#b58b5e]/50 flex justify-end">
              <button
                onClick={handleCloseBook}
                className="px-5 py-1.5 rounded bg-[#522d13] text-[#faedd8] hover:bg-[#6c3a19] text-xs font-serif-kr font-bold transition-colors cursor-pointer"
              >
                서책 덮기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Hyper-Realistic Standing Book Spine on Shelf (No spoilers)
interface RealisticBookSpineProps {
  character: Character;
  heightVariance: string;
  widthVariance: string;
  isSelected: boolean;
  onSelect: () => void;
}

const RealisticBookSpine: React.FC<RealisticBookSpineProps> = ({
  character,
  heightVariance,
  widthVariance,
  isSelected,
  onSelect,
}) => {
  return (
    <button
      onClick={onSelect}
      className={`group relative ${widthVariance} ${heightVariance} rounded-t transition-all duration-300 cursor-pointer flex flex-col justify-between items-center py-2.5 border-t-2 border-x shadow-2xl ${
        isSelected
          ? '-translate-y-4 ring-2 ring-amber-300 scale-105'
          : 'hover:-translate-y-3 hover:scale-102 hover:shadow-[0_15px_30px_rgba(0,0,0,0.9)]'
      }`}
      style={{
        backgroundColor: character.spineColor,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        boxShadow: isSelected
          ? '0 20px 35px rgba(0,0,0,0.9), inset -4px 0 8px rgba(0,0,0,0.5), inset 4px 0 8px rgba(255,255,255,0.2)'
          : 'inset -3px 0 6px rgba(0,0,0,0.5), inset 3px 0 6px rgba(255,255,255,0.15)',
      }}
      aria-label={`${character.bookColorName} 서책`}
      title="클릭하여 펼치기"
    >
      {/* Top Raised Leather Band Cord */}
      <div className="w-full px-1">
        <div className="w-full h-1 bg-black/40 shadow-[0_1px_1px_rgba(255,255,255,0.3)] rounded-full" />
      </div>

      {/* Upper Gold Filigree Tooled Line */}
      <div className="w-3/4 h-[1px] bg-amber-200/40" />

      {/* Center Blank Spine with Leather Grain */}
      <div className="my-auto w-1 h-14 bg-black/20 rounded-full" />

      {/* Lower Gold Filigree Tooled Line */}
      <div className="w-3/4 h-[1px] bg-amber-200/40" />

      {/* Bottom Raised Leather Band Cord */}
      <div className="w-full px-1">
        <div className="w-full h-1 bg-black/40 shadow-[0_1px_1px_rgba(255,255,255,0.3)] rounded-full" />
      </div>

      {/* Hanging Silk Ribbon Bookmark tip dipping onto the shelf */}
      <div
        className="absolute -bottom-2 w-2.5 h-3.5 rounded-b-sm shadow-md transition-transform group-hover:translate-y-1"
        style={{ backgroundColor: character.spineColor }}
      />
    </button>
  );
};
