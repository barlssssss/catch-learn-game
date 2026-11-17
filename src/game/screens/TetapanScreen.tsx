import { audio } from '../audio'
import { useGame } from '../Game'
import { BackButton, GameButton, LakeBackground, Panel, Title3D } from '../ui'

function Suis({
  on,
  onChange,
  label,
}: {
  on: boolean
  onChange: (v: boolean) => void
  label: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      className={`cl-suis ${on ? 'is-on' : ''}`}
      onClick={() => {
        audio.sfx('klik')
        onChange(!on)
      }}
    >
      <span className="cl-suis__teks">{on ? 'ON' : 'OFF'}</span>
      <span className="cl-suis__tombol" />
    </button>
  )
}

export function TetapanScreen() {
  const { pergi, tetapan, ubahTetapan } = useGame()
  return (
    <div className="cl-screen cl-tetapan">
      <LakeBackground fail="muka-depan.png" gelap={0.4} />
      <BackButton onClick={() => pergi('menu')} />
      <div className="cl-halaman">
        <Title3D teks="TETAPAN MUZIK" saiz="sederhana" />
        <Panel className="cl-tetapan__panel">
          <div className="cl-tetapan__baris">
            <div className="cl-tetapan__label">
              <span className="cl-tetapan__ikon">🎵</span>
              <div>
                <h3>Muzik Latar Belakang</h3>
                <p>Setiap halaman mempunyai lagu tersendiri.</p>
              </div>
            </div>
            <Suis
              label="Muzik latar belakang"
              on={tetapan.muzik}
              onChange={(v) => ubahTetapan({ muzik: v })}
            />
          </div>
          <div className="cl-tetapan__slider">
            <span>🔈</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={tetapan.volMuzik}
              disabled={!tetapan.muzik}
              aria-label="Kelantangan muzik"
              onChange={(e) => ubahTetapan({ volMuzik: Number(e.target.value) })}
            />
            <span>🔊</span>
            <b>{Math.round(tetapan.volMuzik * 100)}%</b>
          </div>

          <div className="cl-tetapan__baris">
            <div className="cl-tetapan__label">
              <span className="cl-tetapan__ikon">💦</span>
              <div>
                <h3>Kesan Bunyi</h3>
                <p>Bunyi air, pancing, tangkapan ikan dan kejayaan.</p>
              </div>
            </div>
            <Suis
              label="Kesan bunyi"
              on={tetapan.bunyi}
              onChange={(v) => ubahTetapan({ bunyi: v })}
            />
          </div>
          <div className="cl-tetapan__slider">
            <span>🔈</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={tetapan.volBunyi}
              disabled={!tetapan.bunyi}
              aria-label="Kelantangan kesan bunyi"
              onChange={(e) => ubahTetapan({ volBunyi: Number(e.target.value) })}
            />
            <span>🔊</span>
            <b>{Math.round(tetapan.volBunyi * 100)}%</b>
          </div>

          <div className="cl-tetapan__uji">
            <span>Uji kesan bunyi:</span>
            <GameButton kecil warna="biru" onClick={() => audio.sfx('percikan')}>💦 Air</GameButton>
            <GameButton kecil warna="hijau" onClick={() => audio.sfx('lempar')}>🎣 Pancing</GameButton>
            <GameButton kecil warna="oren" onClick={() => audio.sfx('tangkap')}>🐟 Tangkap</GameButton>
            <GameButton kecil warna="ungu" onClick={() => audio.sfx('berjaya')}>🏆 Berjaya</GameButton>
          </div>
        </Panel>
        <GameButton warna="oren" ikon="✔" onClick={() => pergi('menu')}>
          SIMPAN &amp; KEMBALI
        </GameButton>
      </div>
    </div>
  )
}
