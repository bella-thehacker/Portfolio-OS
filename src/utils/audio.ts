/**
 * CTRL OS Audio Engine
 * Pure Web Audio API Synthesizer - Zero external audio file dependencies
 * Features authentic vintage computing soundscapes: mechanical relays,
 * CRT hum, 3-note signature CTRL motif, tactile clicks, and disk seek tones.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  public soundEnabled: boolean = true;
  public soundMaster: boolean = true;
  public soundInterface: boolean = true;
  public soundStartup: boolean = true;
  public soundArcade: boolean = true;
  public volume: number = 0.5;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  public playChime() {
    this.playCtrlMotif();
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
    this.soundMaster = enabled;
  }

  public setSoundCategories(config: {
    soundMaster?: boolean;
    soundInterface?: boolean;
    soundStartup?: boolean;
    soundArcade?: boolean;
    volume?: number;
  }) {
    if (config.soundMaster !== undefined) {
      this.soundMaster = config.soundMaster;
      this.soundEnabled = config.soundMaster;
    }
    if (config.soundInterface !== undefined) this.soundInterface = config.soundInterface;
    if (config.soundStartup !== undefined) this.soundStartup = config.soundStartup;
    if (config.soundArcade !== undefined) this.soundArcade = config.soundArcade;
    if (config.volume !== undefined) this.setVolume(config.volume);
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  private initContext(): AudioContext | null {
    if (!this.soundMaster || !this.soundEnabled) return null;
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  /**
   * Tactile mechanical switch click (buttons, toggles, keys)
   */
  public playClick(pitch: number = 800) {
    if (!this.soundInterface) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(pitch, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.04);

      gain.gain.setValueAtTime(0.12 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.045);
    } catch {
      // Ignore audio failure
    }
  }

  /**
   * Subtle vintage mechanical keyboard keystroke
   */
  public playKeyClick() {
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const freq = 600 + Math.random() * 250;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.025);

      gain.gain.setValueAtTime(0.05 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.03);
    } catch {}
  }

  /**
   * Window Open: 2-tone pitch sweep up
   */
  public playWindowOpen() {
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(640, now + 0.07);

      gain.gain.setValueAtTime(0.06 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.085);
    } catch {}
  }

  /**
   * Window Close: soft mechanical relay + descending blip
   */
  public playWindowClose() {
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(540, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.06);

      gain.gain.setValueAtTime(0.06 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.075);
    } catch {}
  }

  /**
   * Signature 3-Note CTRL Motif
   * (Nostalgic, warm, technological, satisfying confirmation)
   */
  public playCtrlMotif() {
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Motif notes: E4 (329.6), G#4 (415.3), B4 (493.9) -> Warm Major Triad
      const notes = [329.63, 415.3, 493.88];

      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const noteStart = now + i * 0.11;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.0001, noteStart);
        gain.gain.linearRampToValueAtTime(0.15 * this.volume, noteStart + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.28);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(noteStart);
        osc.stop(noteStart + 0.3);
      });
    } catch {}
  }

  /**
   * Full Original Startup Sound:
   * 1. Mechanical power switch click
   * 2. Low CRT electrical hum
   * 3. Subtle disk-drive spinning texture
   * 4. Small digital initialization tones
   * 5. Short three-note CTRL motif
   * 6. Gentle rising electronic tone
   * 7. Final confirmation chime
   */
  public playStartupSound() {
    if (!this.soundStartup) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // 1. Mechanical switch click
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      clickOsc.type = 'triangle';
      clickOsc.frequency.setValueAtTime(1400, now);
      clickOsc.frequency.exponentialRampToValueAtTime(120, now + 0.05);
      clickGain.gain.setValueAtTime(0.2 * this.volume, now);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      clickOsc.connect(clickGain);
      clickGain.connect(ctx.destination);
      clickOsc.start(now);
      clickOsc.stop(now + 0.06);

      // 2. Low CRT electrical hum
      const humOsc = ctx.createOscillator();
      const humGain = ctx.createGain();
      humOsc.type = 'sawtooth';
      humOsc.frequency.setValueAtTime(58, now + 0.1);
      humGain.gain.setValueAtTime(0.001, now + 0.1);
      humGain.gain.linearRampToValueAtTime(0.04 * this.volume, now + 0.4);
      humGain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);
      humOsc.connect(humGain);
      humGain.connect(ctx.destination);
      humOsc.start(now + 0.1);
      humOsc.stop(now + 2.3);

      // 3. Digital initialization seek beeps
      [0.6, 0.75, 0.9, 1.05].forEach((t, i) => {
        const beepOsc = ctx.createOscillator();
        const beepGain = ctx.createGain();
        beepOsc.type = 'square';
        beepOsc.frequency.setValueAtTime(880 + i * 110, now + t);
        beepGain.gain.setValueAtTime(0.03 * this.volume, now + t);
        beepGain.gain.exponentialRampToValueAtTime(0.001, now + t + 0.04);
        beepOsc.connect(beepGain);
        beepGain.connect(ctx.destination);
        beepOsc.start(now + t);
        beepOsc.stop(now + t + 0.05);
      });

      // 4. Rising gentle electronic tone
      const riseOsc = ctx.createOscillator();
      const riseGain = ctx.createGain();
      riseOsc.type = 'sine';
      riseOsc.frequency.setValueAtTime(220, now + 1.2);
      riseOsc.frequency.exponentialRampToValueAtTime(660, now + 1.7);
      riseGain.gain.setValueAtTime(0.001, now + 1.2);
      riseGain.gain.linearRampToValueAtTime(0.09 * this.volume, now + 1.45);
      riseGain.gain.exponentialRampToValueAtTime(0.001, now + 1.75);
      riseOsc.connect(riseGain);
      riseGain.connect(ctx.destination);
      riseOsc.start(now + 1.2);
      riseOsc.stop(now + 1.8);

      // 5. Signature CTRL 3-note motif + Final chime
      const motifStart = now + 1.8;
      const motifNotes = [329.63, 415.3, 493.88, 659.25]; // E4, G#4, B4, E5 (Final Resolution)

      motifNotes.forEach((freq, idx) => {
        const mOsc = ctx.createOscillator();
        const mGain = ctx.createGain();
        const noteTime = motifStart + idx * 0.14;
        const duration = idx === 3 ? 0.7 : 0.3;

        mOsc.type = 'sine';
        mOsc.frequency.setValueAtTime(freq, noteTime);

        mGain.gain.setValueAtTime(0.001, noteTime);
        mGain.gain.linearRampToValueAtTime((idx === 3 ? 0.18 : 0.12) * this.volume, noteTime + 0.03);
        mGain.gain.exponentialRampToValueAtTime(0.001, noteTime + duration);

        mOsc.connect(mGain);
        mGain.connect(ctx.destination);

        mOsc.start(noteTime);
        mOsc.stop(noteTime + duration + 0.05);
      });
    } catch {}
  }

  /**
   * System Notification alert chime
   */
  public playNotification() {
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.setValueAtTime(1174.66, now + 0.07);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12 * this.volume, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch {}
  }

  /**
   * Error warning buzz
   */
  public playError() {
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.setValueAtTime(130, now + 0.08);

      gain.gain.setValueAtTime(0.1 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch {}
  }

  /**
   * Arcade Game Move: crisp retro 8-bit blip
   */
  public playArcadeMove(frequency: number = 520) {
    if (!this.soundArcade) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(frequency, now);
      osc.frequency.exponentialRampToValueAtTime(frequency * 1.5, now + 0.05);

      gain.gain.setValueAtTime(0.08 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.065);
    } catch {}
  }

  /**
   * Arcade Win fanfare: cheerful ascending arpeggio
   */
  public playArcadeWin() {
    if (!this.soundArcade) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5

      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const t = now + i * 0.1;

        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(0.12 * this.volume, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t);
        osc.stop(t + 0.24);
      });
    } catch {}
  }

  /**
   * Arcade Loss tone
   */
  public playArcadeLoss() {
    if (!this.soundArcade) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const notes = [330, 311, 293, 277]; // descending

      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const t = now + i * 0.12;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(0.1 * this.volume, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t);
        osc.stop(t + 0.2);
      });
    } catch {}
  }

  /**
   * Shutdown sequence: descending chord + CRT collapse pop
   */
  public playShutdown() {
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(55, now + 0.6);

      gain.gain.setValueAtTime(0.12 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.65);
    } catch {}
  }
}

export const sound = new SoundEngine();
