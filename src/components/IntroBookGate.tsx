import React, { useState, useEffect, useRef } from 'react';
import { Key } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface IntroBookGateProps {
  onUnlock: () => void;
}

export const IntroBookGate: React.FC<IntroBookGateProps> = ({ onUnlock }) => {
  const [phase, setPhase] = useState<'flipping_initial' | 'shut' | 'ready' | 'opening'>('flipping_initial');
  const [flutterPageIdx, setFlutterPageIdx] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [keyPosition, setKeyPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const lockRef = useRef<HTMLDivElement>(null);
  const keyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Extended Loading sequence: 2.8s of page flipping before the book closes
    sounds.playPageFlipSound();

    const flutterInterval = setInterval(() => {
      setFlutterPageIdx((prev) => (prev + 1) % 6);
    }, 220);

    // After 2.8s, play heavy closing thud and snap book shut
    const shutTimer = setTimeout(() => {
      clearInterval(flutterInterval);
      setPhase('shut');
      sounds.playBookCloseSound();
    }, 2800);

    // After 3.4s, make ready for interaction
    const readyTimer = setTimeout(() => {
      setPhase('ready');
    }, 3400);

    return () => {
      clearInterval(flutterInterval);
      clearTimeout(shutTimer);
      clearTimeout(readyTimer);
    };
  }, []);

  const triggerUnlock = () => {
    if (phase !== 'ready') return;
    setPhase('opening');

    // Mechanical lock ratchet sound "드르르륵! 철컥"
    sounds.playUnlockSound();

    // Page flip flutter & ambient music start
    setTimeout(() => {
      sounds.playPageFlipSound();
      sounds.startBgm();
    }, 700);

    // Transition to main site
    setTimeout(() => {
      onUnlock();
    }, 1500);
  };

  // Pointer drag events for dragging golden key to lock
  const handlePointerDown = (e: React.PointerEvent) => {
    if (phase !== 'ready') return;
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || phase !== 'ready') return;

    if (keyRef.current) {
      const rect = keyRef.current.getBoundingClientRect();
      const deltaX = e.clientX - (rect.left + rect.width / 2);
      const deltaY = e.clientY - (rect.top + rect.height / 2);
      setKeyPosition({ x: deltaX, y: deltaY });
    }

    // Check collision with the padlock on the right
    if (lockRef.current) {
      const lockRect = lockRef.current.getBoundingClientRect();
      if (
        e.clientX >= lockRect.left - 30 &&
        e.clientX <= lockRect.right + 30 &&
        e.clientY >= lockRect.top - 30 &&
        e.clientY <= lockRect.bottom + 30
      ) {
        setIsDragging(false);
        setKeyPosition({ x: 0, y: 0 });
        triggerUnlock();
      }
    }
  };

  const handlePointerUp = () => {
    if (isDragging) {
      setIsDragging(false);
      setKeyPosition({ x: 0, y: 0 });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#070204] p-4 select-none overflow-hidden">
      {/* Dark Ambient Vignette */}
      <div className="absolute inset-0 bg-radial-vignette opacity-90 pointer-events-none" />

      {/* Main Book Container */}
      <div className="relative max-w-sm sm:max-w-md w-full aspect-[3/4] rounded-2xl shadow-2xl shadow-black p-2 bg-[#420d13] border-2 border-[#7a2028] perspective-1000">

        {/* Real Brass Hasp & Padlock on the RIGHT side of the book */}
        <div
          ref={lockRef}
          onClick={triggerUnlock}
          className={`absolute -right-3.5 sm:-right-4 top-1/2 -translate-y-1/2 z-30 flex items-center cursor-pointer transition-all duration-300 ${
            phase === 'ready' ? 'hover:scale-105' : ''
          }`}
          title="자물쇠"
        >
          {/* Leather Clasp Strap extending from the back cover */}
          <div className="w-6 sm:w-8 h-12 bg-[#2d0a0d] border-y border-l border-amber-600/60 rounded-l shadow-md flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
          </div>

          {/* Detailed Padlock Body */}
          <div className="relative flex flex-col items-center">
            {/* Shackle */}
            <div
              className={`w-7 h-7 sm:w-8 sm:h-8 border-4 border-amber-300 rounded-t-full transition-transform duration-500 ${
                phase === 'opening' ? '-translate-y-2 rotate-12' : ''
              }`}
            />
            {/* Brass Padlock Case */}
            <div className="w-9 h-11 sm:w-10 sm:h-12 bg-gradient-to-b from-[#e5a93b] via-[#c68928] to-[#805414] border-2 border-amber-200 rounded-md shadow-2xl flex flex-col items-center justify-center -mt-2">
              {/* Keyhole */}
              <div className="w-2.5 h-2.5 rounded-full bg-[#200d08] border border-amber-900 flex items-center justify-center">
                <div className="w-0.5 h-2 bg-[#120503] -mb-1" />
              </div>
            </div>
          </div>
        </div>

        {/* PHASE 1: Extended Page Flutter (2.8s) */}
        {phase === 'flipping_initial' && (
          <div className="relative w-full h-full rounded-xl bg-[#23060a] overflow-hidden flex items-center justify-center border border-amber-700/40">
            <div className="relative w-5/6 h-5/6 parchment-bg rounded shadow-2xl flex flex-col justify-between p-7 overflow-hidden">
              <div className="border-b border-[#a87d55] pb-2 text-center text-xs font-cinzel text-[#6a3a1f] tracking-widest uppercase">
                ERDEIA CHRONICLES
              </div>
              <div className="space-y-2.5 opacity-50">
                <div className="h-2 bg-[#b88c63] rounded w-full" />
                <div className="h-2 bg-[#b88c63] rounded w-4/5" />
                <div className="h-2 bg-[#b88c63] rounded w-5/6" />
                <div className="h-2 bg-[#b88c63] rounded w-3/4" />
                <div className="h-2 bg-[#b88c63] rounded w-full" />
              </div>
              <div className="text-[10px] text-center font-cinzel text-[#8a5732] uppercase tracking-wider">
                Unfolding Records...
              </div>

              {/* Animated Rapid Flipping Paper Sheets */}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`absolute inset-0 parchment-bg border-r-2 border-[#a87c53] shadow-2xl origin-left transition-transform duration-300 pointer-events-none ${
                    flutterPageIdx >= i ? '-rotate-y-180 opacity-0' : 'rotate-y-0 opacity-100'
                  }`}
                  style={{ transformStyle: 'preserve-3d' }}
                />
              ))}
            </div>
          </div>
        )}

        {/* PHASE 2 & 3: Sleek Dark Crimson Leather Book Cover */}
        {(phase === 'shut' || phase === 'ready' || phase === 'opening') && (
          <div
            className={`relative w-full h-full rounded-xl bg-gradient-to-br from-[#4f1218] via-[#2d070b] to-[#140205] border-2 border-amber-600/40 p-6 flex flex-col items-center justify-between text-center transition-all duration-700 shadow-inner ${
              phase === 'opening' ? 'scale-105 filter brightness-110 opacity-70' : 'scale-100'
            }`}
          >
            {/* Ornate Gold Filigree Corners */}
            <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-amber-400/80 rounded-tl" />
            <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-amber-400/80 rounded-tr" />
            <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-amber-400/80 rounded-bl" />
            <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-amber-400/80 rounded-br" />

            {/* Top English Title ONLY (No '성력') */}
            <div className="pt-6">
              <span className="text-[11px] tracking-[0.35em] text-amber-400/80 font-cinzel uppercase block">
                IMPERIAL ARCHIVES
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold font-cinzel text-[#faebd7] tracking-wider mt-1 drop-shadow-md">
                CHRONICLES OF ERDEIA
              </h1>
            </div>

            {/* Center Embossed Emblem */}
            <div className="my-auto flex flex-col items-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-amber-500/50 bg-[#1f0508]/80 flex items-center justify-center shadow-inner">
                <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full border border-amber-400/30 flex items-center justify-center">
                  <div className="w-12 h-12 border border-amber-300/40 rotate-45 flex items-center justify-center">
                    <div className="w-4 h-4 bg-amber-400/50 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom: Golden Key ONLY (No text description) */}
            <div className="w-full flex justify-center pb-3">
              {phase === 'ready' && (
                <div
                  ref={keyRef}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onClick={triggerUnlock}
                  style={{
                    transform: isDragging
                      ? `translate(${keyPosition.x}px, ${keyPosition.y}px)`
                      : undefined,
                    touchAction: 'none',
                  }}
                  className="cursor-grab active:cursor-grabbing p-3 rounded-full bg-amber-500/10 border border-amber-400/60 shadow-lg animate-key-pulse hover:bg-amber-500/20 active:scale-95 transition-shadow"
                  aria-label="황금 열쇠"
                >
                  <Key className="w-7 h-7 sm:w-8 sm:h-8 text-amber-300 drop-shadow" />
                </div>
              )}
            </div>

            {/* Visual Book Opening Transition */}
            {phase === 'opening' && (
              <div className="absolute inset-0 bg-[#f7eedc] opacity-95 animate-page-turn pointer-events-none rounded-xl" />
            )}
          </div>
        )}

      </div>
    </div>
  );
};
