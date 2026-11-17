import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { audio, type TrackId } from './audio'
import type { KomponenId } from './content'
import { MenuScreen } from './screens/MenuScreen'
import { CaraScreen } from './screens/CaraScreen'
import { TetapanScreen } from './screens/TetapanScreen'
import { PlayScreen } from './screens/PlayScreen'
import { MenangScreen } from './screens/MenangScreen'
import { BahanModal } from './bahan/BahanModal'
import { MusicToggle } from './ui'

export type Skrin = 'mula' | 'menu' | 'cara' | 'tetapan' | 'main' | 'menang'

export interface Tetapan {
  muzik: boolean
  bunyi: boolean
  volMuzik: number
  volBunyi: number
}

const LALAI: Tetapan = { muzik: true, bunyi: true, volMuzik: 0.7, volBunyi: 0.85 }
const KUNCI = 'catch-learn-tetapan'

interface GameCtx {
  skrin: Skrin
  pergi: (s: Skrin) => void
  tetapan: Tetapan
  ubahTetapan: (t: Partial<Tetapan>) => void
  bukaBahan: (id: KomponenId) => void
  ditangkap: KomponenId[]
  setDitangkap: (ids: KomponenId[]) => void
  skor: number
  setSkor: (n: number) => void
}

const Ctx = createContext<GameCtx | null>(null)
export const useGame = () => useContext(Ctx)!

const MUZIK_SKRIN: Record<Skrin, TrackId> = {
  mula: 'menu',
  menu: 'menu',
  cara: 'cara',
  tetapan: 'tetapan',
  main: 'permainan',
  menang: 'menang',
}

export function Game() {
  const [skrin, setSkrin] = useState<Skrin>('mula')
  const [bahan, setBahan] = useState<KomponenId | null>(null)
  const [ditangkap, setDitangkap] = useState<KomponenId[]>([])
  const [tetapan, setTetapan] = useState<Tetapan>(LALAI)
  const [skor, setSkor] = useState(0)

  // muat tetapan tersimpan
  useEffect(() => {
    try {
      const s = localStorage.getItem(KUNCI)
      if (s) setTetapan({ ...LALAI, ...JSON.parse(s) })
    } catch {
      /* abaikan */
    }
  }, [])

  // selaraskan enjin audio dengan tetapan
  useEffect(() => {
    audio.musicOn = tetapan.muzik
    audio.sfxOn = tetapan.bunyi
    audio.musicVolume = tetapan.volMuzik
    audio.sfxVolume = tetapan.volBunyi
    audio.applyVolumes()
    try {
      localStorage.setItem(KUNCI, JSON.stringify(tetapan))
    } catch {
      /* abaikan */
    }
  }, [tetapan])

  // muzik latar berbeza mengikut halaman
  useEffect(() => {
    const lagu: TrackId = bahan
      ? bahan === 'kuiz'
        ? 'kuiz'
        : 'bahan'
      : MUZIK_SKRIN[skrin]
    audio.playMusic(lagu)
    audio.setAmbience(skrin === 'main' && !bahan)
  }, [skrin, bahan])

  // buka kunci audio pada interaksi pertama
  useEffect(() => {
    const buka = () => audio.unlock()
    window.addEventListener('pointerdown', buka)
    window.addEventListener('keydown', buka)
    return () => {
      window.removeEventListener('pointerdown', buka)
      window.removeEventListener('keydown', buka)
    }
  }, [])

  const pergi = useCallback((s: Skrin) => setSkrin(s), [])
  const ubahTetapan = useCallback(
    (t: Partial<Tetapan>) => setTetapan((p) => ({ ...p, ...t })),
    [],
  )
  const bukaBahan = useCallback((id: KomponenId) => {
    audio.sfx('klik')
    setBahan(id)
  }, [])

  const nilai = useMemo(
    () => ({ skrin, pergi, tetapan, ubahTetapan, bukaBahan, ditangkap, setDitangkap, skor, setSkor }),
    [skrin, pergi, tetapan, ubahTetapan, bukaBahan, ditangkap, skor],
  )

  return (
    <Ctx.Provider value={nilai}>
      <div className="cl-viewport">
        <div className="cl-stage" data-skrin={skrin}>
          {(skrin === 'mula' || skrin === 'menu') && <MenuScreen />}
          {skrin === 'cara' && <CaraScreen />}
          {skrin === 'tetapan' && <TetapanScreen />}
          {skrin === 'main' && <PlayScreen jeda={!!bahan} />}
          {skrin === 'menang' && <MenangScreen />}

          {skrin !== 'mula' && <MusicToggle />}
          {bahan && <BahanModal id={bahan} tutup={() => setBahan(null)} />}
        </div>
        <div className="cl-putar">
          <span>📱↻</span> Pusingkan peranti anda ke mod landskap untuk pengalaman terbaik.
        </div>
      </div>
    </Ctx.Provider>
  )
}
