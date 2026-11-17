import { useEffect } from 'react'
import { audio } from '../audio'
import { IKAN, MAKLUMAT } from '../content'
import { FishSvg } from '../FishSvg'
import { useGame } from '../Game'
import { GameButton, LakeBackground, Title3D } from '../ui'
import { Konfeti } from './TangkapanPopup'

export function MenangScreen() {
  const { pergi, bukaBahan, skor, setDitangkap, setSkor } = useGame()

  useEffect(() => {
    const t = setTimeout(() => audio.sfx('berjaya'), 300)
    return () => clearTimeout(t)
  }, [])

  const bintang = skor >= 700 ? 3 : skor >= 600 ? 2 : 1

  return (
    <div className="cl-screen cl-menang">
      <LakeBackground fail="muka-depan.png" gelap={0.25} />
      <Konfeti bil={60} />
      <div className="cl-halaman">
        <Title3D teks="MISI SELESAI!" saiz="sederhana" />
        <div className="cl-menang__bintang" aria-label={`${bintang} bintang`}>
          {[1, 2, 3].map((n) => (
            <span key={n} className={n <= bintang ? 'is-on' : ''} style={{ animationDelay: `${n * 0.25}s` }}>
              ★
            </span>
          ))}
        </div>
        <p className="cl-menang__teks">
          Hebat! Anda telah melengkapkan <b>{MAKLUMAT.tugasan}</b> &nbsp;•&nbsp; Skor: <b>{skor}</b>
        </p>
        <div className="cl-menang__ikan">
          {IKAN.map((ikan, i) => (
            <button
              key={ikan.id}
              type="button"
              className="cl-menang__item"
              style={{ animationDelay: `${0.3 + i * 0.12}s` }}
              onClick={() => bukaBahan(ikan.id)}
              aria-label={`Buka ${ikan.nama}`}
            >
              <FishSvg ikan={ikan} tunjukLabel />
              <span>{ikan.ikon} Buka</span>
            </button>
          ))}
        </div>
        <p className="cl-menang__petunjuk">👆 Tekan mana-mana ikan untuk membuka bahan kit media.</p>
        <div className="cl-menang__butang">
          <GameButton
            warna="oren"
            ikon="🔄"
            onClick={() => {
              setDitangkap([])
              setSkor(0)
              pergi('main')
            }}
          >
            MAIN SEMULA
          </GameButton>
          <GameButton warna="biru" ikon="🏠" onClick={() => pergi('menu')}>
            MENU UTAMA
          </GameButton>
        </div>
      </div>
    </div>
  )
}
