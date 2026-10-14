/**
 * Web Audio API Sound Effects & Ambient Medieval Fantasy BGM
 * Provides realistic tactile page flipping, lock ratchet, and enchanting music.
 */

class SoundController {
  private ctx: AudioContext | null = null;
  private isBgmPlaying: boolean = false;
  private currentVolume: number = 0.55;
  private bgmAudio: HTMLAudioElement | null = null;
  private readonly bgmUrl: string = '/audio/bgm.mp3';
  private readonly fallbackBgmUrl: string =
    'https://raw.githubusercontent.com/W4vy0/lemon/main/harumachimusic-the-hermit-nostalgic-ancient-harp-259286.mp3';
  private listeners: Set<(playing: boolean) => void> = new Set();
  private userInteracted: boolean = false;

  constructor() {
    // Automatically register a one-time user interaction listener on the window
    // to unlock AudioContext and enable media playback across all modern browsers
    if (typeof window !== 'undefined') {
      const unlockHandler = () => {
        this.unlockUserGesture();
        window.removeEventListener('pointerdown', unlockHandler);
        window.removeEventListener('touchstart', unlockHandler);
        window.removeEventListener('click', unlockHandler);
      };
      window.addEventListener('pointerdown', unlockHandler, { once: true });
      window.addEventListener('touchstart', unlockHandler, { once: true });
      window.addEventListener('click', unlockHandler, { once: true });
    }
  }

  /**
   * Directly unlock and prime both Web Audio Context and Audio element
   * on the first real user interaction.
   */
  public unlockUserGesture() {
    this.userInteracted = true;
    try {
      const ctx = this.getAudioContext();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
    } catch {
      // Ignored
    }

    try {
      const audio = this.getOrCreateBgmAudio();
      // If BGM was requested to play, start it immediately upon user gesture
      if (this.isBgmPlaying && audio.paused) {
        audio.play().catch(() => {});
      }
    } catch {
      // Ignored
    }
  }

  private getAudioContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  private getOrCreateBgmAudio(): HTMLAudioElement {
    if (!this.bgmAudio) {
      this.bgmAudio = new Audio(this.bgmUrl);
      this.bgmAudio.loop = true;
      this.bgmAudio.volume = this.currentVolume;
      this.bgmAudio.preload = 'auto';

      // Fallback to remote URL if local asset ever fails
      this.bgmAudio.addEventListener('error', () => {
        if (this.bgmAudio && this.bgmAudio.src !== this.fallbackBgmUrl) {
          this.bgmAudio.src = this.fallbackBgmUrl;
          if (this.isBgmPlaying) {
            this.bgmAudio.play().catch(() => {});
          }
        }
      });
    }
    return this.bgmAudio;
  }

  public subscribe(listener: (playing: boolean) => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => {
      try {
        fn(this.isBgmPlaying);
      } catch {
        // Ignored
      }
    });
  }

  public getIsBgmPlaying(): boolean {
    return this.isBgmPlaying;
  }

  public setVolume(vol: number) {
    this.currentVolume = Math.max(0, Math.min(1, vol));
    if (this.bgmAudio) {
      this.bgmAudio.volume = this.currentVolume;
    }
  }

  public toggleBgm(): boolean {
    this.unlockUserGesture();
    if (this.isBgmPlaying) {
      this.stopBgm();
      return false;
    } else {
      this.startBgm();
      return true;
    }
  }

  public startBgm() {
    this.unlockUserGesture();
    this.isBgmPlaying = true;
    this.notify();

    try {
      const audio = this.getOrCreateBgmAudio();
      audio.volume = this.currentVolume;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('BGM play deferred pending user interaction:', err);
        });
      }
    } catch (err) {
      console.warn('Error starting BGM:', err);
    }
  }

  public stopBgm() {
    this.isBgmPlaying = false;
    this.notify();

    if (this.bgmAudio) {
      try {
        this.bgmAudio.pause();
      } catch {
        // Ignored
      }
    }
  }

  /**
   * Mechanical ratchet + heavy metal latch unlock: "드르르륵! 철컥"
   */
  public playUnlockSound() {
    this.unlockUserGesture();
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;

      // 1. Ratchet clicks (드르르륵...)
      const numClicks = 9;
      for (let i = 0; i < numClicks; i++) {
        const clickTime = now + i * 0.045;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300 + Math.random() * 200, clickTime);
        osc.frequency.exponentialRampToValueAtTime(80, clickTime + 0.03);

        gain.gain.setValueAtTime(0.18, clickTime);
        gain.gain.exponentialRampToValueAtTime(0.001, clickTime + 0.03);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(clickTime);
        osc.stop(clickTime + 0.03);
      }

      // 2. Final heavy metallic lock release: "철컥!"
      const latchTime = now + 0.45;

      const thudOsc = ctx.createOscillator();
      const thudGain = ctx.createGain();
      thudOsc.type = 'sine';
      thudOsc.frequency.setValueAtTime(140, latchTime);
      thudOsc.frequency.exponentialRampToValueAtTime(40, latchTime + 0.18);
      thudGain.gain.setValueAtTime(0.45, latchTime);
      thudGain.gain.exponentialRampToValueAtTime(0.001, latchTime + 0.2);

      thudOsc.connect(thudGain);
      thudGain.connect(ctx.destination);
      thudOsc.start(latchTime);
      thudOsc.stop(latchTime + 0.2);

      const chimeOsc = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      chimeOsc.type = 'sine';
      chimeOsc.frequency.setValueAtTime(1620, latchTime);
      chimeGain.gain.setValueAtTime(0.22, latchTime);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, latchTime + 0.35);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(ctx.destination);
      chimeOsc.start(latchTime);
      chimeOsc.stop(latchTime + 0.35);
    } catch {
      // Audio fallback
    }
  }

  /**
   * Realistic book page turning flutter: "촤라라라락!"
   */
  public playPageFlipSound() {
    this.unlockUserGesture();
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;
      const duration = 0.55;

      const bufferSize = Math.floor(ctx.sampleRate * duration);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        lastOut = lastOut * 0.94 + white * 0.06;
        data[i] = lastOut * 3.8;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.Q.setValueAtTime(1.8, now);
      filter.frequency.setValueAtTime(900, now);
      filter.frequency.exponentialRampToValueAtTime(3200, now + 0.2);
      filter.frequency.exponentialRampToValueAtTime(600, now + duration);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.4, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.15, now + 0.25);
      gain.gain.exponentialRampToValueAtTime(0.35, now + 0.38);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + duration);
    } catch {
      // Audio fallback
    }
  }

  /**
   * Heavy leather book closing thud: "착"
   */
  public playBookCloseSound() {
    this.unlockUserGesture();
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.15);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.16);
    } catch {
      // Audio fallback
    }
  }
}

export const sounds = new SoundController();
