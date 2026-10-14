import React, { useState } from 'react';
import { X } from 'lucide-react';

interface MapPin {
  id: string;
  title: string;
  colorClass: string; // Background color for the pin
  dotColor: string;
  coords: { x: number; y: number };
  imageUrl?: string;
  textOnly?: string;
}

const IMPERIAL_PINS: MapPin[] = [
  // 1. (빨간색 토글) 마탑
  {
    id: 'magic-tower',
    title: '마탑',
    colorClass: 'bg-red-500',
    dotColor: '#ef4444',
    coords: { x: 16, y: 19 },
    imageUrl: 'https://igx.kr/v/Wlc/b/2',
  },
  // 2. (주황색 토글) 찻집
  {
    id: 'teahouse',
    title: '찻집',
    colorClass: 'bg-orange-500',
    dotColor: '#f97316',
    coords: { x: 11, y: 44 },
    imageUrl: 'https://igx.kr/v/Wlc/b/3',
  },
  // 3. (노란색 토글) 마구간
  {
    id: 'stable',
    title: '마구간',
    colorClass: 'bg-yellow-400',
    dotColor: '#facc15',
    coords: { x: 17, y: 35 }, // 더 밑으로 이동
    imageUrl: 'https://igx.kr/v/Wlc/b/4',
  },
  // 4. (노란색 토글) 호숫가
  {
    id: 'lakeside',
    title: '호숫가',
    colorClass: 'bg-yellow-400',
    dotColor: '#facc15',
    coords: { x: 57, y: 63 },
    imageUrl: 'https://igx.kr/v/Wlc/b/5',
  },
  // 5. (주황색 토글) 저택 4개 지점
  {
    id: 'mansion-1',
    title: '저택',
    colorClass: 'bg-orange-500',
    dotColor: '#f97316',
    coords: { x: 40, y: 46 },
    imageUrl: 'https://igx.kr/v/Wlc/b/6',
  },
  {
    id: 'mansion-2',
    title: '저택',
    colorClass: 'bg-orange-500',
    dotColor: '#f97316',
    coords: { x: 54, y: 50 },
    imageUrl: 'https://igx.kr/v/Wlc/b/6',
  },
  {
    id: 'mansion-3',
    title: '저택',
    colorClass: 'bg-orange-500',
    dotColor: '#f97316',
    coords: { x: 72, y: 51 },
    imageUrl: 'https://igx.kr/v/Wlc/b/6',
  },
  {
    id: 'mansion-4',
    title: '저택',
    colorClass: 'bg-orange-500',
    dotColor: '#f97316',
    coords: { x: 86, y: 46 },
    imageUrl: 'https://igx.kr/v/Wlc/b/6',
  },
  // 6. (노랑색 토글) 정원
  {
    id: 'garden',
    title: '정원',
    colorClass: 'bg-yellow-400',
    dotColor: '#facc15',
    coords: { x: 23, y: 61 },
    imageUrl: 'https://igx.kr/v/Wlc/b/7',
  },
  // 7. (노란색 토글) 수도광장
  {
    id: 'capital-square',
    title: '수도광장',
    colorClass: 'bg-yellow-400',
    dotColor: '#facc15',
    coords: { x: 56, y: 32 },
    imageUrl: 'https://igx.kr/v/Wlc/b/8',
  },
  // 8. (연두색 토글) 연회장 & 황궁
  {
    id: 'banquet-hall',
    title: '연회장',
    colorClass: 'bg-lime-400',
    dotColor: '#a3e635',
    coords: { x: 52.5, y: 16 },
    imageUrl: 'https://igx.kr/v/Wlc/b/9',
  },
  {
    id: 'imperial-palace',
    title: '황궁',
    colorClass: 'bg-lime-400',
    dotColor: '#a3e635',
    coords: { x: 59, y: 16 }, // 살짝 더 옆으로 이동
    imageUrl: 'https://igx.kr/v/Wlc/b/10',
  },
  // 9. (연두색 토글) 신전
  {
    id: 'temple',
    title: '신전',
    colorClass: 'bg-lime-400',
    dotColor: '#a3e635',
    coords: { x: 87, y: 33 },
    imageUrl: 'https://igx.kr/v/Wlc/b/11',
  },
  // 10. (하늘색 토글) 숲 (사진 없음, 고요한 숲. 설명만)
  {
    id: 'forest',
    title: '숲',
    colorClass: 'bg-sky-400',
    dotColor: '#38bdf8',
    coords: { x: 43, y: 82 },
    textOnly: '고요한 숲.',
  },
];

export const ImperialMapPage: React.FC = () => {
  const [selectedPin, setSelectedPin] = useState<MapPin | null>(null);

  return (
    <div className="w-full">
      {/* Pure Map Only (No title, no subtitle, no text) */}
      <div className="relative rounded-xl overflow-hidden border border-[#824f2b] shadow-2xl bg-[#1c080b] w-full aspect-[709/1260] mx-auto select-none">
        <img
          src="https://igx.kr/v/Wlc/w/888"
          alt="제국 지도"
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain pointer-events-none"
        />

        {/* Interactive Location Pins */}
        {IMPERIAL_PINS.map((pin) => (
          <button
            key={pin.id}
            onClick={() => setSelectedPin(pin)}
            style={{
              left: `${pin.coords.x}%`,
              top: `${pin.coords.y}%`,
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none cursor-pointer p-2 z-20 group"
            aria-label={pin.title}
            title={pin.title}
          >
            {/* Subtle ping pulse */}
            <span
              className="absolute inset-1 rounded-full opacity-60 animate-ping pointer-events-none"
              style={{ backgroundColor: pin.dotColor }}
            />
            {/* Solid colored dot with white border */}
            <span
              className={`block w-3.5 h-3.5 rounded-full border-2 border-white shadow-md transition-transform group-hover:scale-125 ${pin.colorClass}`}
            />
          </button>
        ))}
      </div>

      {/* Click Modal: 1650x432 Full Photo View or Forest Text */}
      {selectedPin && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedPin(null)}
        >
          <div
            className="relative max-w-4xl w-full parchment-bg text-[#2e1c10] rounded-xl p-4 sm:p-6 shadow-2xl border-2 border-[#824f2b] space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header: Title and Close button */}
            <div className="border-b border-[#ad7f54] pb-2 flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold font-serif-kr text-[#3c1d0f]">
                {selectedPin.title}
              </h3>
              <button
                onClick={() => setSelectedPin(null)}
                className="p-1.5 rounded-full bg-[#522d13] text-[#faedd8] hover:bg-[#7a421b] transition-colors cursor-pointer"
                aria-label="닫기"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content: 1650x432 Full Photo Display without cropping */}
            {selectedPin.imageUrl ? (
              <div className="w-full aspect-[1650/432] rounded-lg overflow-hidden border border-[#824f2b] bg-black/90 shadow-md">
                <img
                  src={selectedPin.imageUrl}
                  alt={selectedPin.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              /* Case 10: 숲 (사진 없음, 고요한 숲. 설명만) */
              <div className="p-6 text-center">
                <p className="text-base font-serif-kr font-bold text-[#3c1d0f]">
                  {selectedPin.textOnly}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
