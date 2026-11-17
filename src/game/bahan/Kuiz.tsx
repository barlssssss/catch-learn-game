import { useState } from 'react'
import { audio } from '../audio'
import { SOALAN_KUIZ } from '../content'
import { GameButton } from '../ui'

const HURUF = ['A', 'B', 'C', 'D']

export function Kuiz() {
  const [indeks, setIndeks] = useState(0)
  const [pilih, setPilih] = useState<number | null>(null)
  const [betul, setBetul] = useState(0)
  const [tamat, setTamat] = useState(false)

  const soalan = SOALAN_KUIZ[indeks]
  const jumlah = SOALAN_KUIZ.length

  const jawab = (i: number) => {
    if (pilih !== null) return
    setPilih(i)
    if (i === soalan.jawapan) {
      setBetul((b) => b + 1)
      audio.sfx('betul')
    } else {
      audio.sfx('salah')
    }
  }

  const seterusnya = () => {
    if (indeks + 1 >= jumlah) {
      setTamat(true)
      audio.sfx('berjaya')
    } else {
      setIndeks(indeks + 1)
      setPilih(null)
    }
  }

  const ulang = () => {
    setIndeks(0)
    setPilih(null)
    setBetul(0)
    setTamat(false)
  }

  if (tamat) {
    const peratus = Math.round((betul / jumlah) * 100)
    const bintang = peratus >= 80 ? 3 : peratus >= 50 ? 2 : 1
    const ulasan =
      peratus >= 80
        ? 'Cemerlang! Anda memang pakar kesihatan! 🏆'
        : peratus >= 50
          ? 'Bagus! Ulang kaji nota untuk skor lebih tinggi. 👍'
          : 'Jangan berputus asa! Baca nota dan cuba lagi. 💪'
    return (
      <div className="cl-kuiz cl-kuiz--tamat">
        <div className="cl-menang__bintang">
          {[1, 2, 3].map((n) => (
            <span key={n} className={n <= bintang ? 'is-on' : ''} style={{ animationDelay: `${n * 0.2}s` }}>
              ★
            </span>
          ))}
        </div>
        <div className="cl-kuiz__skor-akhir">
          {betul} / {jumlah}
        </div>
        <p className="cl-kuiz__ulasan">{ulasan}</p>
        <GameButton warna="oren" ikon="🔄" onClick={ulang}>
          ULANG KUIZ
        </GameButton>
      </div>
    )
  }

  return (
    <div className="cl-kuiz">
      <div className="cl-kuiz__atas">
        <span className="cl-kuiz__no">SOALAN {indeks + 1} / {jumlah}</span>
        <div className="cl-kuiz__kemajuan">
          <div style={{ width: `${((indeks + (pilih !== null ? 1 : 0)) / jumlah) * 100}%` }} />
        </div>
        <span className="cl-kuiz__skor">✅ {betul}</span>
      </div>
      <h3 className="cl-kuiz__soalan" key={indeks}>
        {soalan.soalan}
      </h3>
      <div className="cl-kuiz__pilihan">
        {soalan.pilihan.map((p, i) => {
          let kelas = ''
          if (pilih !== null) {
            if (i === soalan.jawapan) kelas = 'is-betul'
            else if (i === pilih) kelas = 'is-salah'
            else kelas = 'is-pudar'
          }
          return (
            <button
              key={`${indeks}-${i}`}
              type="button"
              className={`cl-kuiz__jawapan ${kelas}`}
              onClick={() => jawab(i)}
              disabled={pilih !== null}
            >
              <span className="cl-kuiz__huruf">{HURUF[i]}</span>
              <span>{p}</span>
            </button>
          )
        })}
      </div>
      {pilih !== null && (
        <div className={`cl-kuiz__maklum ${pilih === soalan.jawapan ? 'is-betul' : 'is-salah'}`}>
          <div>
            <b>{pilih === soalan.jawapan ? '🎉 BETUL!' : '❌ SALAH!'}</b> {soalan.penerangan}
          </div>
          <GameButton warna="hijau" kecil onClick={seterusnya}>
            {indeks + 1 >= jumlah ? 'LIHAT KEPUTUSAN 🏁' : 'SETERUSNYA ➜'}
          </GameButton>
        </div>
      )}
    </div>
  )
}
