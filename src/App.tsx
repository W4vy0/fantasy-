/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { IntroBookGate } from './components/IntroBookGate';
import { NavigationRibbons, ActivePage } from './components/NavigationRibbons';
import { MusicPlayerWidget } from './components/MusicPlayerWidget';
import { ContinentWorldviewPage } from './components/ContinentWorldviewPage';
import { ImperialMapPage } from './components/ImperialMapPage';
import { CharacterBookshelfSection } from './components/CharacterBookshelfSection';
import { DestinyChoiceSection } from './components/DestinyChoiceSection';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<ActivePage>('continent');
  const [isFlipping, setIsFlipping] = useState<boolean>(false);

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  const handleSelectPage = (page: ActivePage) => {
    if (page === activePage) return;
    setIsFlipping(true);
    setActivePage(page);
    setTimeout(() => {
      setIsFlipping(false);
    }, 350);
  };

  return (
    <div className="min-h-screen bg-[#110507] text-[#edd9c0] font-serif-kr relative selection:bg-amber-900 selection:text-amber-100 flex flex-col justify-start">
      {/* 1. Loading / Intro Screen with Padlock & Draggable Golden Key */}
      {!isUnlocked && <IntroBookGate onUnlock={handleUnlock} />}

      {/* 2. Top Header with BGM Toggle Only */}
      <header className="sticky top-0 z-30 w-full px-4 sm:px-6 py-2.5 bg-[#1b060a]/90 backdrop-blur-md border-b border-amber-950/60 flex items-center justify-between">
        <MusicPlayerWidget />
      </header>

      {/* 3. Ultra-compact right bookmarks (선택 시에만 확장되어 화면을 전혀 가리지 않음) */}
      {isUnlocked && (
        <NavigationRibbons
          activePage={activePage}
          onSelectPage={handleSelectPage}
        />
      )}

      {/* 4. Main 4-Page Content Area (완전 균형 잡힌 전폭 중앙 정렬) */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-6 py-5 sm:py-8">
        <div
          className={`transition-opacity duration-300 w-full ${
            isFlipping ? 'opacity-20' : 'opacity-100'
          }`}
        >
          {activePage === 'continent' && <ContinentWorldviewPage />}
          {activePage === 'map' && <ImperialMapPage />}
          {activePage === 'characters' && <CharacterBookshelfSection />}
          {activePage === 'destiny' && <DestinyChoiceSection />}
        </div>
      </main>
    </div>
  );
}
