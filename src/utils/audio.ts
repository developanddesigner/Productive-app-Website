// Safe Web Audio API synthesizer for ambient focus soundscape
class AmbientSoundGenerator {
  private ctx: AudioContext | null = null;
  private noiseNode: AudioNode | null = null;
  private gainNode: GainNode | null = null;
  private isPlaying: boolean = false;
  private currentType: 'brown' | 'pink' | 'binaural' = 'brown';

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play(type: 'brown' | 'pink' | 'binaural' = 'brown') {
    try {
      this.initContext();
      if (!this.ctx) return;
      this.stop();

      this.currentType = type;
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      if (type === 'brown') {
        // Brownian (red) noise: integrated white noise
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          data[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = data[i];
          data[i] *= 3.5; // Gain compensation
        }
      } else if (type === 'pink') {
        // Pink noise (1/f) approximation
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
          data[i] *= 0.11;
          b6 = white * 0.115926;
        }
      } else {
        // Binaural 76 BPM tone rhythm (1.266 Hz modulation over 216Hz calm drone)
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(216, this.ctx.currentTime);

        const lfo = this.ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(1.266, this.ctx.currentTime); // 76 BPM

        const lfoGain = this.ctx.createGain();
        lfoGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        lfo.connect(lfoGain.gain);

        const mainGain = this.ctx.createGain();
        mainGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        osc.connect(mainGain);
        mainGain.connect(this.ctx.destination);

        osc.start();
        lfo.start();
        this.noiseNode = osc;
        this.gainNode = mainGain;
        this.isPlaying = true;
        return;
      }

      const noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = buffer;
      noiseSource.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(type === 'brown' ? 380 : 800, this.ctx.currentTime);

      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.06, this.ctx.currentTime);

      noiseSource.connect(filter);
      filter.connect(this.gainNode);
      this.gainNode.connect(this.ctx.destination);

      noiseSource.start();
      this.noiseNode = noiseSource;
      this.isPlaying = true;
    } catch {
      // Audio autoplay policy catch
      this.isPlaying = false;
    }
  }

  public stop() {
    try {
      if (this.gainNode && this.ctx) {
        this.gainNode.gain.setTargetAtTime(0, this.ctx.currentTime, 0.05);
      }
      setTimeout(() => {
        if (this.noiseNode && 'stop' in this.noiseNode) {
          (this.noiseNode as AudioScheduledSourceNode).stop();
        }
        this.noiseNode = null;
        this.gainNode = null;
        this.isPlaying = false;
      }, 60);
    } catch {
      this.isPlaying = false;
    }
  }

  public playChime() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(528, this.ctx.currentTime); // 528 Hz clarity frequency
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 1.25);
    } catch {
      // Audio context catch
    }
  }

  public getActive() {
    return this.isPlaying;
  }

  public getType() {
    return this.currentType;
  }
}

export const ambientSound = new AmbientSoundGenerator();
