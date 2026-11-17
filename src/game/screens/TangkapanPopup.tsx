import type { IkanDef } from '../content'
import { FishSvg } from '../FishSvg'
import { GameButton } from '../ui'

export function Konfeti({ bil = 40 }: { bil?: number }) {
  const warna = ['#ff8a1f', '#2f8cff', '#2ecc71', '#b05cff', '#ff4d6d', '#ffd43b']
  return (
    <div className="cl-konfeti" aria-hidden>
      {Array.from({ length: bil }).map((_, i) => (
        <i
          key={i}
          style={{
            left: `${(i * 41) % 100}%`,
            background: warna[i % warna.length],
            animationDelay: `${(i % 10) * 0.12}s`,
            animationDuration: `${2.2 + (i % 5) * 0.4}s`,
            transform: `rotate(${i * 33}deg)`,
          }}
        />
      ))}
    </div>
  )
}

export function TangkapanPopup({
  ikan,
  mata,
  sempurna,
  akhir,
  bilangan,
  onBuka,
  onTerus,
}: {
  ikan: IkanDef
  mata: number
  sempurna: boolean
  akhir: boolean
  bilangan: number
  onBuka: () => void
  onTerus: () => void
}) {
  return (
    <div className="cl-overlay" role="dialog" aria-modal="true" aria-label={`Tahniah! Anda menangkap ikan ${ikan.nama}`}>
      <Konfeti />
      <div className="cl-tangkap">
        <div className="cl-tangkap__sinar" aria-hidden />
        <div className="cl-tangkap__tajuk">TAHNIAH!</div>
        <p className="cl-tangkap__sub">
          Anda berjaya menangkap ikan istimewa ke-{ikan.no}! ({bilangan}/5)
        </p>
        <button type="button" className="cl-tangkap__ikan" onClick={onBuka} aria-label={`Buka ${ikan.nama}`}>
          <FishSvg ikan={ikan} tunjukLabel />
          <span className="cl-tangkap__tekan">👆 Tekan ikan untuk membuka bahan</span>
        </button>
        <div className="cl-tangkap__nama">
          {ikan.ikon} {ikan.nama}
        </div>
        <div className="cl-tangkap__mata">
          +{mata} MATA {sempurna && <span>🌟 SEMPURNA</span>}
        </div>
        <div className="cl-tangkap__butang">
          <GameButton warna="hijau" ikon="📂" onClick={onBuka}>
            BUKA BAHAN
          </GameButton>
          <GameButton warna={akhir ? 'kuning' : 'biru'} ikon={akhir ? '🏆' : '🎣'} onClick={onTerus}>
            {akhir ? 'TAMAT MISI' : 'TERUS MEMANCING'}
          </GameButton>
        </div>
      </div>
    </div>
  )
}
