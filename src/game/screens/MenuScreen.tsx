import { audio } from '../audio'
import { IKAN, MAKLUMAT } from '../content'
import { FishSvg } from '../FishSvg'
import { useGame } from '../Game'
import { Bubbles, GameButton, LakeBackground, Title3D } from '../ui'

export function MenuScreen() {
  const { skrin, pergi, setDitangkap, setSkor } = useGame()
  const mula = skrin === 'mula'

  return (
    <div className="cl-screen cl-menu">
      <LakeBackground fail="muka-depan.png" />
      <Bubbles bil={10} />

      {/* ikan melompat dari air */}
      <div className="cl-menu__lompat" aria-hidden>
        {IKAN.slice(0, 3).map((ikan, i) => (
          <div key={ikan.id} className={`cl-lompat cl-lompat--${i + 1}`}>
            <FishSvg ikan={ikan} className="cl-lompat__ikan" />
          </div>
        ))}
      </div>

      <div className="cl-menu__isi">
        <div className="cl-menu__logo">
          <div className="cl-menu__lencana">🎣</div>
          <Title3D teks={MAKLUMAT.tajuk} />
          <p className="cl-subtajuk">{MAKLUMAT.subtajuk}</p>
        </div>

        <div className="cl-reben-tugasan">
          <span>{MAKLUMAT.tugasan}</span>
        </div>

        {mula ? (
          <button
            type="button"
            className="cl-tekan-mula"
            onClick={() => {
              audio.unlock()
              audio.sfx('percikan')
              pergi('menu')
            }}
            autoFocus
          >
            ▶ TEKAN UNTUK MULA
          </button>
        ) : (
          <div className="cl-menu__bawah">
            <div className="cl-kad-pelajar">
              <div className="cl-kad-pelajar__ikon">🎓</div>
              <dl>
                <div>
                  <dt>Nama</dt>
                  <dd>{MAKLUMAT.nama}</dd>
                </div>
                <div>
                  <dt>Nombor Matrik</dt>
                  <dd>{MAKLUMAT.matrik}</dd>
                </div>
              </dl>
            </div>

            <nav className="cl-menu__butang">
              <GameButton
                warna="oren"
                ikon="▶"
                onClick={() => {
                  setDitangkap([])
                  setSkor(0)
                  pergi('main')
                }}
              >
                MULA BERMAIN
              </GameButton>
              <GameButton warna="hijau" ikon="📖" onClick={() => pergi('cara')}>
                CARA BERMAIN
              </GameButton>
              <GameButton warna="ungu" ikon="🎵" onClick={() => pergi('tetapan')}>
                TETAPAN MUZIK
              </GameButton>
            </nav>
          </div>
        )}
      </div>
    </div>
  )
}
