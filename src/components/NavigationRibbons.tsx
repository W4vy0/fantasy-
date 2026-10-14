import React from 'react';
import { sounds } from '../utils/soundEffects';

export type ActivePage = 'continent' | 'map' | 'characters' | 'destiny';

interface NavigationRibbonsProps {
  activePage: ActivePage;
  onSelectPage: (page: ActivePage) => void;
}

export const NavigationRibbons: React.FC<NavigationRibbonsProps> = ({
  activePage,
  onSelectPage,
}) => {
  const tabs: { id: ActivePage; label: string; bg: string; border: string }[] = [
    {
      id: 'continent',
      label: '대륙지도·세계관',
      bg: 'bg-[#66161c]',
      border: 'border-[#a8323c]',
    },
    {
      id: 'map',
      label: '제국 지도',
      bg: 'bg-[#78350f]',
      border: 'border-[#b45309]',
    },
    {
      id: 'characters',
      label: '캐릭터 서고',
      bg: 'bg-[#1e293b]',
      border: 'border-[#475569]',
    },
    {
      id: 'destiny',
      label: '운명의 선택',
      bg: 'bg-[#3b0764]',
      border: 'border-[#6b21a8]',
    },
  ];

  const handleTabClick = (pageId: ActivePage) => {
    if (pageId === activePage) return;
    sounds.playPageFlipSound();
    onSelectPage(pageId);
  };

  return (
    <aside
      className="fixed right-0 top-20 sm:top-24 z-40 flex flex-col items-end gap-2 pointer-events-auto select-none"
      aria-label="우측 책갈피 메뉴"
    >
      {tabs.map((tab) => {
        const isActive = activePage === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`group relative flex items-center justify-end rounded-l-md border-l-2 border-y transition-all duration-300 cursor-pointer shadow-lg overflow-hidden ${
              tab.bg
            } ${tab.border} ${
              isActive
                ? 'px-3 py-1.5 w-auto text-[#fff7ed] font-bold text-xs ring-1 ring-amber-400 shadow-black'
                : 'w-2.5 sm:w-3.5 h-7 hover:w-auto hover:px-2.5 hover:py-1 opacity-70 hover:opacity-100 text-stone-300'
            }`}
            title={tab.label}
          >
            {/* When not active, text is hidden; when active or hovered, label displays smoothly */}
            <span
              className={`font-serif-kr whitespace-nowrap transition-opacity duration-200 ${
                isActive ? 'opacity-100 text-xs' : 'hidden group-hover:inline opacity-100 text-[11px]'
              }`}
            >
              {tab.label}
            </span>

            {/* Subtle ribbon edge accent */}
            {isActive && (
              <span className="w-1 h-3 rounded-full bg-amber-400 ml-1.5 shrink-0" />
            )}
          </button>
        );
      })}
    </aside>
  );
};
