/**
 * Web Audio API Sound Effects & Ambient Medieval Fantasy BGM
 * Provides realistic tactile page flipping, lock ratchet, and enchanting music.
 */

class SoundController {
  private ctx: AudioContext | null = null;
  private bgmGain: GainNode | null = null;
  private isBgmPlaying: boolean = false;
  private currentVolume: number = 0.45;
  private bgmIntervalId: number | null = null;
  private bgmAudio: HTMLAudioElement | null = null;
  private readonly bgmUrl: string =
    'https://raw.githubusercontent.com/W4vy0/lemon/main/harumachimusic-the-hermit-nostalgic-ancient-harp-259286.mp3';

  private getAudioContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  /**
   * Mechanical ratchet + heavy metal latch unlock: "드르르륵! 철컥"
   */
  public playUnlockSound() {
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;

      // 1. Ratchet clicks (드르르륵...)
      const numClicks = 9;
      for (let i = 0; i < numClicks; i++) {
        const clickTime = now + (i * 0.045);
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300 + Math.random() * 200, clickTime);
        osc.frequency.exponentialRampToValueAtTime(80, clickTime + 0.03);

        gain.gain.setValueAtTime(0.15, clickTime);
        gain.gain.exponentialRampToValueAtTime(0.001, clickTime + 0.03);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(clickTime);
        osc.stop(clickTime + 0.03);
      }

      // 2. Final heavy metallic lock release: "철컥!"
      const latchTime = now + 0.45;
      
      // Low metallic thud
      const thudOsc = ctx.createOscillator();
      const thudGain = ctx.createGain();
      thudOsc.type = 'sine';
      thudOsc.frequency.setValueAtTime(140, latchTime);
      thudOsc.frequency.exponentialRampToValueAtTime(40, latchTime + 0.18);
      thudGain.gain.setValueAtTime(0.4, latchTime);
      thudGain.gain.exponentialRampToValueAtTime(0.001, latchTime + 0.2);

      thudOsc.connect(thudGain);
      thudGain.connect(ctx.destination);
      thudOsc.start(latchTime);
      thudOsc.stop(latchTime + 0.2);

      // High metallic chime ring
      const chimeOsc = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      chimeOsc.type = 'sine';
      chimeOsc.frequency.setValueAtTime(1620, latchTime);
      chimeGain.gain.setValueAtTime(0.2, latchTime);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, latchTime + 0.35);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(ctx.destination);
      chimeOsc.start(latchTime);
      chimeOsc.stop(latchTime + 0.35);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  /**
   * Realistic book page turning flutter: "촤라라라락!"
   */
  public playPageFlipSound() {
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;
      const duration = 0.55;

      // Noise buffer for paper rustle
      const bufferSize = ctx.sampleRate * duration;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Pink-ish noise filter
        lastOut = (lastOut * 0.94) + (white * 0.06);
        data[i] = lastOut * 3.5;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      // Bandpass filter sweeping through frequencies like paper flutter
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.Q.setValueAtTime(1.8, now);
      filter.frequency.setValueAtTime(900, now);
      filter.frequency.exponentialRampToValueAtTime(3200, now + 0.2);
      filter.frequency.exponentialRampToValueAtTime(600, now + duration);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      // Quick flutter envelope
      gain.gain.linearRampToValueAtTime(0.35, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.15, now + 0.25);
      gain.gain.exponentialRampToValueAtTime(0.3, now + 0.38);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + duration);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  /**
   * Heavy leather book closing thud: "착"
   */
  public playBookCloseSound() {
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.15);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.16);
    } catch {
      // Audio fallback
    }
  }

  /**
   * Medieval Romantic Court Fantasy Music (Procedural Web Audio Synth)
   * Ambient harp, celesta & strings playing romantic court harmonies
   */
  public toggleBgm(): boolean {
    if (this.isBgmPlaying) {
      this.stopBgm();
      return false;
    } else {
      this.startBgm();
      return true;
    }
  }

  public getIsBgmPlaying(): boolean {
    return this.isBgmPlaying;
  }

  public setVolume(vol: number) {
    this.currentVolume = Math.max(0, Math.min(1, vol));
    if (this.bgmAudio) {
      this.bgmAudio.volume = this.currentVolume;
    }
    if (this.bgmGain) {
      this.bgmGain.gain.setValueAtTime(this.currentVolume * 0.25, this.getAudioContext().currentTime);
    }
  }

  public startBgm() {
    if (this.isBgmPlaying) return;
    this.isBgmPlaying = true;

    try {
      if (!this.bgmAudio) {
        this.bgmAudio = new Audio(this.bgmUrl);
        this.bgmAudio.loop = true;
        this.bgmAudio.volume = this.currentVolume;
        this.bgmAudio.crossOrigin = 'anonymous';
      }

      this.bgmAudio.play().catch(() => {
        // Fallback to synthesized fantasy harp if browser blocks network audio before gesture
        this.startSynthBgm();
      });
    } catch {
      this.startSynthBgm();
    }
  }

  public stopBgm() {
    this.isBgmPlaying = false;
    if (this.bgmAudio) {
      try {
        this.bgmAudio.pause();
      } catch {
        // Ignored
      }
    }
    this.stopSynthBgm();
  }

  private startSynthBgm() {
    try {
      const ctx = this.getAudioContext();
      if (this.bgmGain) return;

      this.bgmGain = ctx.createGain();
      this.bgmGain.gain.setValueAtTime(this.currentVolume * 0.25, ctx.currentTime);
      this.bgmGain.connect(ctx.destination);

      const chords: number[][] = [
        [220, 261.63, 329.63, 440],
        [174.61, 261.63, 329.63, 440],
        [146.83, 220, 293.66, 349.23],
        [164.81, 246.94, 329.63, 392.00],
        [130.81, 196.00, 261.63, 329.63],
        [196.00, 246.94, 293.66, 392.00],
        [220, 261.63, 329.63, 440],
        [164.81, 220, 293.66, 415.30],
      ];

      let step = 0;
      const playStep = () => {
        if (!this.isBgmPlaying || !this.bgmGain) return;
        const currentChord = chords[step % chords.length];
        const stepTime = ctx.currentTime;

        currentChord.forEach((freq, idx) => {
          const noteTime = stepTime + (idx * 0.22);
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = idx === 0 ? 'triangle' : 'sine';
          osc.frequency.setValueAtTime(freq, noteTime);

          gain.gain.setValueAtTime(0.001, noteTime);
          gain.gain.linearRampToValueAtTime(idx === 0 ? 0.18 : 0.12, noteTime + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 1.8);

          osc.connect(gain);
          gain.connect(this.bgmGain!);

          osc.start(noteTime);
          osc.stop(noteTime + 1.9);
        });

        step++;
      };

      playStep();
      this.bgmIntervalId = window.setInterval(playStep, 1800);
    } catch {
      // Ignored
    }
  }

  private stopSynthBgm() {
    if (this.bgmIntervalId !== null) {
      clearInterval(this.bgmIntervalId);
      this.bgmIntervalId = null;
    }
    if (this.bgmGain) {
      try {
        this.bgmGain.gain.linearRampToValueAtTime(0.001, this.getAudioContext().currentTime + 0.4);
      } catch {
        // Ignored
      }
    }
  }
}

export const sounds = new SoundController();
