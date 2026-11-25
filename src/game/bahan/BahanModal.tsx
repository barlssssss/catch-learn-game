
import { useEffect, type CSSProperties } from 'react'
import { ikanById, type KomponenId } from '../content'
import { FishSvg } from '../FishSvg'
import { ManualPengguna } from './ManualPengguna'

export function BahanModal({ id, tutup }: { id: KomponenId; tutup: () => void }) {
  const ikan = ikanById(id)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && tutup()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [tutup])

  const pautan: Partial<Record<KomponenId, string>> = {
    rph: 'https://drive.google.com/drive/folders/1d7g-O3OW0X7-BOGMMoq3jtH29GLzCwnX',
    nota: 'https://horse-70hj71.my.canva.site/',
    permainan: 'https://drive.google.com/drive/folders/14JoyFWKNPG29OfQIjaUcTVsOojyzhOpC',
    kuiz: 'https://drive.google.com/drive/folders/1UHPZVLzCPCGqFzg9bgGeZANvZq7Wb-ki',
  }

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
          {id === 'pengguna' ? (
            <ManualPengguna />
          ) : pautan[id] ? (
            <div className="cl-dok">
              <h2>{ikan.ikon} {ikan.nama}</h2>
              <p>Tekan butang di bawah untuk membuka bahan pembelajaran.</p>
              <a href={pautan[id]} target="_blank" rel="noopener noreferrer">
                BUKA {ikan.nama.toUpperCase()}
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

