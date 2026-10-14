import React, { useState } from 'react';

interface FactionSpot {
  id: 'erdeia' | 'veloa';
  title: string;
  coords: { x: number; y: number };
  description: string;
}

const FACTION_SPOTS: FactionSpot[] = [
  {
    id: 'erdeia',
    title: '신성제국 에르디아',
    coords: { x: 26, y: 35 }, // 왼쪽으로 더 땡김
    description: '황실, 대신전, 대귀족이 권력을 다투는 중심 제국. 마법과 신성력이 존재하며, 대신전에서 공표된 [이방인의 신탁]으로 인해 권력 구도가 요동치고 있습니다.',
  },
  {
    id: 'veloa',
    title: '벨로아 왕국',
    coords: { x: 78, y: 35 }, // 왼쪽으로 다시 이동
    description: '제국 남쪽 바다 너머에 위치한 온난한 해양 왕국. 친선 사절로 파견된 엘로디 왕녀의 조국이며, 과거 {{user}}의 누명 조작으로 인해 제국과 일촉즉발의 위기를 겪었습니다.',
  },
];

export const ContinentWorldviewPage: React.FC = () => {
  const [activeModalSpot, setActiveModalSpot] = useState<FactionSpot | null>(null);

  return (
    <div className="space-y-6 w-full">
      <div className="border-b border-[#824f2b]/40 pb-2">
        <h2 className="text-xl sm:text-2xl font-bold font-serif-kr text-[#fae8d2]">
          대륙 지도 및 세계관
        </h2>
        <p className="text-xs text-amber-200/70 font-serif-kr mt-0.5">
          성력 987년, 신성제국 에르디아와 남부 벨로아 왕국의 대륙 형세
        </p>
      </div>

      {/* Full 898 x 384 Continent Map Container */}
      <div className="relative rounded-xl overflow-hidden border border-[#824f2b] shadow-2xl bg-[#1c080b] w-full aspect-[898/384]">
        <img
          src="https://igx.kr/v/Wlc/w/999"
          alt="대륙 지도"
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain"
        />

        {/* Small Red Dot Toggles */}
        {FACTION_SPOTS.map((spot) => (
          <button
            key={spot.id}
            onClick={() => setActiveModalSpot(spot)}
            style={{
              left: `${spot.coords.x}%`,
              top: `${spot.coords.y}%`,
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none cursor-pointer p-2"
            aria-label={spot.title}
            title={spot.title}
          >
            <span className="absolute inset-1 rounded-full bg-red-600/60 animate-ping" />
            <span className="block w-3 h-3 rounded-full bg-red-600 border border-white hover:scale-125 transition-transform shadow-md" />
          </button>
        ))}
      </div>

      {/* Description Popup Modal (Click to view only) */}
      {activeModalSpot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative max-w-md w-full parchment-bg text-[#2e1c10] rounded-xl p-5 shadow-2xl border-2 border-[#824f2b] space-y-3">
            <div className="border-b border-[#ad7f54] pb-2 flex items-center justify-between">
              <h3 className="text-base font-bold font-serif-kr text-[#3c1d0f]">
                {activeModalSpot.title}
              </h3>
              <button
                onClick={() => setActiveModalSpot(null)}
                className="px-2 py-0.5 rounded bg-[#522d13] text-[#faedd8] text-xs font-serif-kr cursor-pointer"
              >
                닫기
              </button>
            </div>
            <p className="text-xs text-[#3a2213] font-serif-kr leading-relaxed">
              {activeModalSpot.description}
            </p>
          </div>
        </div>
      )}

      {/* Redesigned Worldview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 w-full">
        
        {/* Card 1: Background & Setting */}
        <div className="parchment-bg rounded-xl p-4 border border-[#824f2b] shadow-md flex flex-col justify-between space-y-2">
          <div className="border-b border-[#c49a6c] pb-1.5">
            <span className="text-[10px] font-cinzel uppercase tracking-wider text-[#7a481c] font-bold">
              SETTING
            </span>
            <h4 className="text-sm font-bold font-serif-kr text-[#3c1d0f]">
              신성제국 에르디아
            </h4>
          </div>
          <p className="text-xs text-[#422917] font-serif-kr leading-relaxed">
            마법과 신성력이 존재하는 중세 유럽풍 세계. 황실, 대신전, 대귀족의 치열한 암투와 엄격한 신분제 및 정략혼이 작동합니다.
          </p>
        </div>

        {/* Card 2: Reincarnation & The Oracle */}
        <div className="parchment-bg rounded-xl p-4 border border-[#824f2b] shadow-md flex flex-col justify-between space-y-2">
          <div className="border-b border-[#c49a6c] pb-1.5">
            <span className="text-[10px] font-cinzel uppercase tracking-wider text-[#7a481c] font-bold">
              THE ORACLE
            </span>
            <h4 className="text-sm font-bold font-serif-kr text-[#3c1d0f]">
              이방인의 신탁
            </h4>
          </div>
          <p className="text-xs text-[#422917] font-serif-kr leading-relaxed italic">
            “세계의 경계를 넘어온 이방인이 도래하였다. 이방인의 발걸음이 쇠락하는 제국에 새로운 번영을 가져오리라.”
          </p>
        </div>

        {/* Card 3: The Villainess & Initial Affection -100 */}
        <div className="parchment-bg rounded-xl p-4 border border-[#824f2b] shadow-md flex flex-col justify-between space-y-2">
          <div className="border-b border-[#c49a6c] pb-1.5">
            <span className="text-[10px] font-cinzel uppercase tracking-wider text-[#8b2323] font-bold">
              CRISIS
            </span>
            <h4 className="text-sm font-bold font-serif-kr text-[#3c1d0f]">
              악역 빙의와 초기 호감도 -100
            </h4>
          </div>
          <p className="text-xs text-[#422917] font-serif-kr leading-relaxed">
            게임 본편 전 8인을 짓밟았던 악역 조연에 빙의. 신탁에도 불구하고 8인 전원이 {'{{user}}'}를 극도로 불신하고 경계합니다.
          </p>
        </div>

      </div>
    </div>
  );
};
