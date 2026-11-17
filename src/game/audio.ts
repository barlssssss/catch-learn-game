/**
 * Enjin audio CATCH & LEARN.
 * Semua muzik dan kesan bunyi dijana secara prosedur dengan Web Audio API,
 * jadi tiada fail audio perlu dimuat turun dan setiap halaman ada lagu sendiri.
 */

export type TrackId =
  | 'menu'
  | 'cara'
  | 'tetapan'
  | 'permainan'
  | 'bahan'
  | 'kuiz'
  | 'menang'

export type SfxId =
  | 'klik'
  | 'percikan'
  | 'lempar'
  | 'gulung'
  | 'umpan'
  | 'tangkap'
  | 'berjaya'
  | 'terlepas'
  | 'betul'
  | 'salah'

type Note = number | null // nombor MIDI, null = rehat

interface Track {
  bpm: number
  /** Melodi, satu nota bagi setiap 1/8 ketukan */
  melody: Note[]
  bass: Note[]
  /** Kord (MIDI) bagi setiap bar 8 langkah */
  chords: number[][]
  /** Corak dram per 1/8: k = kick, s = snare, h = hi-hat, . = rehat */
  drums: string
  lead: OscillatorType
  leadGain: number
  padGain: number
}

const _ = null

// Kord asas
const C = [60, 64, 67]
const F = [60, 65, 69]
const G = [59, 62, 67]
const Am = [57, 60, 64]
const Dm = [57, 62, 65]
const Em = [59, 64, 67]

const TRACKS: Record<TrackId, Track> = {
  // Muka depan — riang dan bertenaga
  menu: {
    bpm: 118,
    melody: [
      72, _, 76, 79, 81, 79, 76, _, 77, _, 76, 74, 72, _, _, _,
      74, _, 77, 81, 79, 77, 76, _, 74, _, 72, 74, 76, _, _, _,
      72, _, 76, 79, 84, _, 81, 79, 77, 79, 81, _, 79, _, 76, _,
      74, 76, 77, _, 74, _, 71, _, 72, _, _, _, _, _, _, _,
    ],
    bass: [48, _, 55, _, 53, _, 48, _, 50, _, 57, _, 55, _, 43, _],
    chords: [C, F, Dm, G, C, Am, F, G],
    drums: 'k.h.s.h.k.khs.h.',
    lead: 'triangle',
    leadGain: 0.16,
    padGain: 0.035,
  },
  // Cara bermain — santai dan ingin tahu
  cara: {
    bpm: 96,
    melody: [
      69, _, 72, _, 76, _, 74, 72, 71, _, 67, _, 69, _, _, _,
      72, _, 74, _, 76, 79, 76, 74, 72, _, 71, _, 72, _, _, _,
    ],
    bass: [45, _, _, _, 52, _, _, _, 43, _, _, _, 48, _, _, _],
    chords: [Am, Em, G, C],
    drums: 'k...h...k.k.h...',
    lead: 'sine',
    leadGain: 0.18,
    padGain: 0.04,
  },
  // Tetapan muzik — lembut seperti kotak muzik
  tetapan: {
    bpm: 88,
    melody: [
      84, 79, 76, 79, 84, 79, 76, 79, 83, 79, 74, 79, 83, 79, 74, 79,
      81, 77, 72, 77, 81, 77, 72, 77, 79, 76, 72, 76, 79, _, _, _,
    ],
    bass: [48, _, _, _, 43, _, _, _, 41, _, _, _, 48, _, _, _],
    chords: [C, G, F, C],
    drums: '................',
    lead: 'sine',
    leadGain: 0.11,
    padGain: 0.03,
  },
  // Permainan — ceria, gaya pulau tropika
  permainan: {
    bpm: 112,
    melody: [
      67, _, 69, 72, _, 74, 72, _, 69, _, 67, _, 64, _, 67, _,
      69, _, 72, 74, _, 76, 74, _, 72, _, 69, 72, _, _, _, _,
      76, _, 74, 72, _, 69, 72, _, 74, _, 72, 69, 67, _, 64, _,
      67, _, 69, _, 64, _, 62, _, 60, _, _, _, _, _, _, _,
    ],
    bass: [48, _, 48, 55, _, 55, 52, _, 45, _, 45, 52, _, 52, 50, _],
    chords: [C, Am, F, G],
    drums: 'k.hsk.hsk.hsk.hs',
    lead: 'square',
    leadGain: 0.07,
    padGain: 0.03,
  },
  // Bahan pembelajaran — tenang untuk membaca
  bahan: {
    bpm: 80,
    melody: [
      76, _, _, 74, 72, _, _, _, 74, _, _, 72, 71, _, _, _,
      72, _, _, 71, 69, _, _, _, 71, _, 72, _, 74, _, _, _,
    ],
    bass: [48, _, _, _, _, _, _, _, 43, _, _, _, _, _, _, _, 45, _, _, _, _, _, _, _, 41, _, _, _, 43, _, _, _],
    chords: [C, G, Am, F],
    drums: '................',
    lead: 'sine',
    leadGain: 0.12,
    padGain: 0.05,
  },
  // Kuiz — bertenaga seperti rancangan permainan
  kuiz: {
    bpm: 128,
    melody: [
      72, 72, _, 79, _, 76, _, 72, 74, 74, _, 77, _, 74, _, _,
      76, 76, _, 81, _, 79, _, 76, 74, _, 71, _, 72, _, _, _,
    ],
    bass: [48, _, 48, _, 50, _, 50, _, 52, _, 52, _, 55, _, 43, _],
    chords: [C, Dm, Em, G],
    drums: 'k.h.s.hkk.h.s.hh',
    lead: 'square',
    leadGain: 0.06,
    padGain: 0.025,
  },
  // Kemenangan — fanfara meraikan
  menang: {
    bpm: 124,
    melody: [
      72, _, 72, 72, 76, _, 79, _, 84, _, _, 79, 84, _, _, _,
      77, _, 77, 77, 81, _, 84, _, 83, _, 81, 79, 79, _, _, _,
    ],
    bass: [48, _, 55, _, 48, _, 55, _, 41, _, 48, _, 43, _, 50, _],
    chords: [C, C, F, G],
    drums: 'k.s.k.s.k.s.kkss',
    lead: 'triangle',
    leadGain: 0.17,
    padGain: 0.04,
  },
}

const midiToFreq = (m: number) => 440 * Math.pow(2, (m - 69) / 12)

class AudioEngine {
  private ctx: AudioContext | null = null
  private master!: GainNode
  private musicBus!: GainNode
  private sfxBus!: GainNode
  private noiseBuffer!: AudioBuffer

  private current: TrackId | null = null
  private pending: TrackId | null = null
  private step = 0
  private nextTime = 0
  private timer: ReturnType<typeof setInterval> | null = null
  private trackGain: GainNode | null = null

  private ambience: { src: AudioBufferSourceNode; gain: GainNode } | null = null
  private wantAmbience = false

  musicOn = true
  sfxOn = true
  musicVolume = 0.7
  sfxVolume = 0.85

  /** Mesti dipanggil daripada interaksi pengguna (klik/ketik). */
  unlock() {
    if (typeof window === 'undefined') return
    if (!this.ctx) {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext
      if (!Ctx) return
      this.ctx = new Ctx()
      this.master = this.ctx.createGain()
      this.master.gain.value = 0.9
      this.master.connect(this.ctx.destination)
      this.musicBus = this.ctx.createGain()
      this.sfxBus = this.ctx.createGain()
      this.musicBus.connect(this.master)
      this.sfxBus.connect(this.master)
      this.applyVolumes()

      const len = this.ctx.sampleRate * 2
      this.noiseBuffer = this.ctx.createBuffer(1, len, this.ctx.sampleRate)
      const data = this.noiseBuffer.getChannelData(0)
      for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1
    }
    if (this.ctx.state === 'suspended') void this.ctx.resume()
    if (this.pending) {
      const t = this.pending
      this.pending = null
      this.playMusic(t)
    }
    if (this.wantAmbience) this.setAmbience(true)
  }

  get ready() {
    return !!this.ctx
  }

  applyVolumes() {
    if (!this.ctx) return
    const now = this.ctx.currentTime
    this.musicBus.gain.setTargetAtTime(
      this.musicOn ? this.musicVolume * 0.9 : 0,
      now,
      0.08,
    )
    this.sfxBus.gain.setTargetAtTime(
      this.sfxOn ? this.sfxVolume : 0,
      now,
      0.05,
    )
  }

  // ---------------- MUZIK ----------------

  playMusic(id: TrackId) {
    if (!this.ctx) {
      this.pending = id
      return
    }
    if (this.current === id && this.timer) return
    const ctx = this.ctx
    // pudar keluar lagu lama
    if (this.trackGain) {
      const old = this.trackGain
      old.gain.setTargetAtTime(0, ctx.currentTime, 0.15)
      setTimeout(() => old.disconnect(), 1200)
    }
    if (this.timer) clearInterval(this.timer)

    this.current = id
    this.trackGain = ctx.createGain()
    this.trackGain.gain.value = 0
    this.trackGain.gain.setTargetAtTime(1, ctx.currentTime + 0.1, 0.3)
    this.trackGain.connect(this.musicBus)
    this.step = 0
    this.nextTime = ctx.currentTime + 0.15
    this.timer = setInterval(() => this.schedule(), 25)
  }

  stopMusic() {
    if (this.timer) clearInterval(this.timer)
    this.timer = null
    this.current = null
    if (this.trackGain && this.ctx) {
      const old = this.trackGain
      old.gain.setTargetAtTime(0, this.ctx.currentTime, 0.15)
      setTimeout(() => old.disconnect(), 1200)
      this.trackGain = null
    }
  }

  private schedule() {
    if (!this.ctx || !this.current || !this.trackGain) return
    const track = TRACKS[this.current]
    const stepDur = 60 / track.bpm / 2
    while (this.nextTime < this.ctx.currentTime + 0.12) {
      this.playStep(track, this.step, this.nextTime, stepDur)
      this.nextTime += stepDur
      this.step++
    }
  }

  private playStep(track: Track, step: number, t: number, dur: number) {
    const out = this.trackGain!
    const m = track.melody[step % track.melody.length]
    if (m != null) {
      // panjangkan nota jika diikuti rehat
      let len = 1
      while (
        len < 4 &&
        track.melody[(step + len) % track.melody.length] === null
      )
        len++
      this.tone(midiToFreq(m), t, dur * len * 0.9, track.lead, track.leadGain, out)
      // gema ringan oktaf
      this.tone(midiToFreq(m + 12), t, dur * 0.6, 'sine', track.leadGain * 0.18, out)
    }
    const b = track.bass[step % track.bass.length]
    if (b != null) this.tone(midiToFreq(b), t, dur * 1.6, 'triangle', 0.17, out)

    if (step % 8 === 0) {
      const chord = track.chords[Math.floor(step / 8) % track.chords.length]
      for (const n of chord)
        this.tone(midiToFreq(n), t, dur * 7.5, 'sine', track.padGain, out, 0.25)
    }
    const d = track.drums[step % track.drums.length]
    if (d === 'k') this.kick(t, out)
    else if (d === 's') this.snare(t, out)
    else if (d === 'h') this.hat(t, out)
  }

  private tone(
    freq: number,
    t: number,
    dur: number,
    type: OscillatorType,
    gain: number,
    dest: AudioNode,
    attack = 0.01,
  ) {
    const ctx = this.ctx!
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = type
    o.frequency.value = freq
    g.gain.setValueAtTime(0.0001, t)
    g.gain.linearRampToValueAtTime(gain, t + attack)
    g.gain.setTargetAtTime(0.0001, t + Math.max(attack, dur * 0.6), dur * 0.35)
    o.connect(g)
    g.connect(dest)
    o.start(t)
    o.stop(t + dur + 0.6)
  }

  private kick(t: number, dest: AudioNode) {
    const ctx = this.ctx!
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.frequency.setValueAtTime(140, t)
    o.frequency.exponentialRampToValueAtTime(45, t + 0.15)
    g.gain.setValueAtTime(0.35, t)
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.22)
    o.connect(g)
    g.connect(dest)
    o.start(t)
    o.stop(t + 0.25)
  }

  private noise(
    t: number,
    dur: number,
    gain: number,
    filterType: BiquadFilterType,
    freq: number,
    dest: AudioNode,
  ) {
    const ctx = this.ctx!
    const src = ctx.createBufferSource()
    src.buffer = this.noiseBuffer
    const f = ctx.createBiquadFilter()
    f.type = filterType
    f.frequency.value = freq
    const g = ctx.createGain()
    g.gain.setValueAtTime(gain, t)
    g.gain.exponentialRampToValueAtTime(0.001, t + dur)
    src.connect(f)
    f.connect(g)
    g.connect(dest)
    src.start(t, Math.random())
    src.stop(t + dur + 0.05)
    return { f, g }
  }

  private snare(t: number, dest: AudioNode) {
    this.noise(t, 0.12, 0.12, 'highpass', 1800, dest)
  }
  private hat(t: number, dest: AudioNode) {
    this.noise(t, 0.04, 0.05, 'highpass', 7000, dest)
  }

  // ---------------- KESAN BUNYI ----------------

  sfx(id: SfxId) {
    if (!this.ctx) return
    const ctx = this.ctx
    const t = ctx.currentTime + 0.01
    const out = this.sfxBus
    switch (id) {
      case 'klik':
        this.sweep(620, 980, t, 0.08, 'sine', 0.25)
        break
      case 'percikan': {
        const { f } = this.noise(t, 0.5, 0.35, 'lowpass', 2400, out)
        f.frequency.exponentialRampToValueAtTime(300, t + 0.45)
        this.sweep(420, 120, t, 0.18, 'sine', 0.3)
        this.sweep(900, 300, t + 0.08, 0.12, 'sine', 0.12)
        break
      }
      case 'lempar': {
        const { f } = this.noise(t, 0.42, 0.22, 'bandpass', 500, out)
        f.frequency.exponentialRampToValueAtTime(3200, t + 0.38)
        for (let i = 0; i < 7; i++)
          this.tone(2200, t + i * 0.035, 0.015, 'square', 0.04, out)
        break
      }
      case 'gulung':
        for (let i = 0; i < 10; i++)
          this.tone(1700 + (i % 2) * 300, t + i * 0.045, 0.015, 'square', 0.045, out)
        break
      case 'umpan':
        this.sweep(380, 760, t, 0.1, 'sine', 0.35)
        this.sweep(380, 900, t + 0.14, 0.12, 'sine', 0.35)
        this.noise(t, 0.2, 0.15, 'lowpass', 1200, out)
        break
      case 'tangkap': {
        const { f } = this.noise(t, 0.7, 0.4, 'lowpass', 3000, out)
        f.frequency.exponentialRampToValueAtTime(400, t + 0.6)
        ;[72, 76, 79, 84].forEach((n, i) =>
          this.tone(midiToFreq(n), t + 0.12 + i * 0.08, 0.22, 'triangle', 0.25, out),
        )
        break
      }
      case 'berjaya':
        ;[
          [72, 0],
          [76, 0.12],
          [79, 0.24],
          [84, 0.36],
          [79, 0.52],
          [84, 0.64],
        ].forEach(([n, d]) => {
          this.tone(midiToFreq(n), t + d, 0.3, 'square', 0.1, out)
          this.tone(midiToFreq(n - 12), t + d, 0.3, 'triangle', 0.2, out)
        })
        ;[60, 64, 67, 72].forEach((n) =>
          this.tone(midiToFreq(n), t + 0.8, 1.2, 'triangle', 0.12, out),
        )
        break
      case 'terlepas':
        this.sweep(520, 140, t, 0.5, 'sawtooth', 0.12)
        this.noise(t, 0.35, 0.18, 'lowpass', 1500, out)
        break
      case 'betul':
        this.tone(midiToFreq(79), t, 0.15, 'triangle', 0.3, out)
        this.tone(midiToFreq(84), t + 0.12, 0.35, 'triangle', 0.3, out)
        break
      case 'salah':
        this.tone(160, t, 0.22, 'sawtooth', 0.14, out)
        this.tone(120, t + 0.2, 0.32, 'sawtooth', 0.14, out)
        break
    }
  }

  private sweep(
    from: number,
    to: number,
    t: number,
    dur: number,
    type: OscillatorType,
    gain: number,
  ) {
    const ctx = this.ctx!
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = type
    o.frequency.setValueAtTime(from, t)
    o.frequency.exponentialRampToValueAtTime(to, t + dur)
    g.gain.setValueAtTime(gain, t)
    g.gain.exponentialRampToValueAtTime(0.001, t + dur + 0.05)
    o.connect(g)
    g.connect(this.sfxBus)
    o.start(t)
    o.stop(t + dur + 0.1)
  }

  /** Bunyi air tasik berterusan semasa bermain */
  setAmbience(on: boolean) {
    this.wantAmbience = on
    if (!this.ctx) return
    const ctx = this.ctx
    if (on && !this.ambience) {
      const src = ctx.createBufferSource()
      src.buffer = this.noiseBuffer
      src.loop = true
      const f = ctx.createBiquadFilter()
      f.type = 'lowpass'
      f.frequency.value = 650
      const lfo = ctx.createOscillator()
      const lfoGain = ctx.createGain()
      lfo.frequency.value = 0.18
      lfoGain.gain.value = 260
      lfo.connect(lfoGain)
      lfoGain.connect(f.frequency)
      lfo.start()
      const gain = ctx.createGain()
      gain.gain.value = 0
      gain.gain.setTargetAtTime(0.06, ctx.currentTime, 0.6)
      src.connect(f)
      f.connect(gain)
      gain.connect(this.sfxBus)
      src.start()
      this.ambience = { src, gain }
    } else if (!on && this.ambience) {
      const a = this.ambience
      a.gain.gain.setTargetAtTime(0, ctx.currentTime, 0.2)
      setTimeout(() => a.src.stop(), 1000)
      this.ambience = null
    }
  }
}

export const audio = new AudioEngine()
