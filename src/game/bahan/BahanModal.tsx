import { useEffect, type CSSProperties } from 'react'
import { ikanById, type KomponenId } from '../content'
import { FishSvg } from '../FishSvg'

import { Rph } from './Rph'
import { ManualPengguna } from './ManualPengguna'
import { ManualPermainan } from './ManualPermainan'
import { Kuiz } from './Kuiz'

export function BahanModal({ id, tutup }: { id: KomponenId; tutup: () => void }) {
  const ikan = ikanById(id)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && tutup()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [tutup])

  return (
    <div className="cl-overlay cl-overlay--bahan" role="dialog" aria-modal="true" aria-label={ikan.nama}>
      <div className="cl-bahan" style={{ '--warna': ikan.warna.badan, '--gelap': ikan.warna.gelap } as CSSProperties}>
        <header className="cl-bahan__kepala">
          <div className="cl-bahan__ikan">
            <FishSvg ikan={ikan} tunjukLabel />
          </div>
          <div className="cl-bahan__tajuk">
            <small>KOMPONEN {ikan.no} • KIT MEDIA PENDIDIKAN KESIHATAN TINGKATAN 1</small>
            <h2>
              {ikan.ikon} {ikan.nama}
            </h2>
          </div>
          <button type="button" className="cl-bahan__tutup" onClick={tutup} aria-label="Tutup bahan">
            ✕ TUTUP
          </button>
        </header>
        <div className="cl-bahan__isi">
          {id === 'nota' && (
  <div className="cl-dok">
    <a
      href="https://horse-70hj71.my.canva.site/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Buka Nota Pendidikan Kesihatan
    </a>
  </div>
)}
          {id === 'rph' && <Rph />}
          {id === 'pengguna' && <ManualPengguna />}
          {id === 'permainan' && <ManualPermainan />}
          {id === 'kuiz' && <Kuiz />}
        </div>
      </div>
    </div>
  )
}
