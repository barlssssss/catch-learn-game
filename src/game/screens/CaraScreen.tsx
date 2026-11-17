import { IKAN } from '../content'
import { FishSvg } from '../FishSvg'
import { useGame } from '../Game'
import { BackButton, GameButton, LakeBackground, Panel, Title3D } from '../ui'

const LANGKAH = [
  {
    ikon: '👆',
    tajuk: 'Lempar Mata Kail',
    teks: 'Klik atau ketik di mana-mana bahagian tasik untuk melempar mata kail ke situ.',
  },
  {
    ikon: '🐟',
    tajuk: 'Tunggu Ikan Istimewa',
    teks: 'Ikan yang bercahaya dan mempunyai tanda “?” ialah ikan istimewa. Ia akan datang menyambar umpan.',
  },
  {
    ikon: '⚡',
    tajuk: 'Tarik Pada Masa Tepat!',
    teks: 'Apabila pelampung tenggelam, tekan TARIK (atau kekunci SPACE) ketika penunjuk berada di zon hijau.',
  },
  {
    ikon: '📚',
    tajuk: 'Buka Bahan',
    teks: 'Nama komponen kit media akan muncul pada badan ikan. Tekan ikan untuk membuka bahan pembelajaran.',
  },
]

export function CaraScreen() {
  const { pergi } = useGame()
  return (
    <div className="cl-screen cl-cara">
      <LakeBackground fail="tasik.png" gelap={0.35} />
      <BackButton onClick={() => pergi('menu')} />
      <div className="cl-halaman">
        <Title3D teks="CARA BERMAIN" saiz="sederhana" />
        <Panel className="cl-cara__panel">
          <ol className="cl-langkah">
            {LANGKAH.map((l, i) => (
              <li key={i} className="cl-langkah__item" style={{ animationDelay: `${i * 0.12}s` }}>
                <div className="cl-langkah__no">{i + 1}</div>
                <div className="cl-langkah__ikon">{l.ikon}</div>
                <h3>{l.tajuk}</h3>
                <p>{l.teks}</p>
              </li>
            ))}
          </ol>
          <div className="cl-cara__misi">
            <div className="cl-cara__misi-teks">
              <strong>🎯 MISI ANDA:</strong> Tangkap kelima-lima ikan istimewa untuk melengkapkan
              Kit Media Pendidikan Kesihatan!
            </div>
            <div className="cl-cara__ikan">
              {IKAN.map((ikan) => (
                <div key={ikan.id} className="cl-cara__ikan-item">
                  <FishSvg ikan={ikan} tunjukLabel />
                </div>
              ))}
            </div>
          </div>
        </Panel>
        <GameButton warna="oren" ikon="▶" onClick={() => pergi('main')}>
          SAYA SUDAH FAHAM, JOM MAIN!
        </GameButton>
      </div>
    </div>
  )
}
