import { IKAN } from '../content'
import { FishSvg } from '../FishSvg'

export function ManualPermainan() {
  return (
    <div className="cl-dok">
      <h3>Manual Permainan: Catch &amp; Learn</h3>
      <div className="cl-info">
        🎯 <b>Objektif:</b> Pancing kelima-lima ikan istimewa di tasik. Setiap ikan membawa satu komponen Kit
        Media Pendidikan Kesihatan. Lengkapkan koleksi untuk menamatkan misi!
      </div>

      <h3>Peraturan Permainan</h3>
      <ol className="cl-langkah-dok">
        <li><b>Lempar:</b> Klik / ketik pada permukaan air tasik. Mata kail akan dilempar ke kedudukan tersebut.</li>
        <li><b>Tunggu:</b> Ikan istimewa (bercahaya dengan tanda “?”) akan berenang ke arah umpan. Ikan bayang-bayang biasa tidak membawa bahan.</li>
        <li><b>Sambar:</b> Apabila pelampung tenggelam dan tanda “!” muncul, bar masa akan dipaparkan.</li>
        <li><b>Tarik:</b> Tekan butang <b>TARIK!</b>, klik pada tasik atau tekan kekunci <b>SPACE</b> ketika penunjuk berada di zon hijau.</li>
        <li><b>Terlepas?</b> Jika tersilap masa atau terlalu lambat (5 saat), ikan akan lari. Jangan risau — lempar semula dan cuba lagi!</li>
        <li><b>Buka Bahan:</b> Nama komponen akan dipaparkan pada badan ikan. Tekan ikan untuk membuka bahan.</li>
      </ol>

      <h3>Sistem Mata</h3>
      <div className="cl-grid-3">
        <div className="cl-kad cl-kad--tengah"><div className="cl-kad__ikon">💪</div><h4>Tangkapan Biasa</h4><p>+100 mata</p></div>
        <div className="cl-kad cl-kad--tengah"><div className="cl-kad__ikon">🌟</div><h4>Tarikan Sempurna</h4><p>+150 mata (tepat di tengah zon hijau)</p></div>
        <div className="cl-kad cl-kad--tengah"><div className="cl-kad__ikon">⭐⭐⭐</div><h4>Bintang</h4><p>700+ = 3 bintang, 600+ = 2 bintang</p></div>
      </div>
      <p className="cl-kecil">
        ⚠️ Setiap kali anda menangkap ikan, zon hijau menjadi lebih kecil dan penunjuk bergerak lebih laju. Cabaran semakin meningkat!
      </p>

      <h3>Senarai Ikan Istimewa</h3>
      <div className="cl-senarai-ikan">
        {IKAN.map((ikan) => (
          <div key={ikan.id} className="cl-senarai-ikan__item">
            <FishSvg ikan={ikan} tunjukLabel />
            <span>{ikan.no}. {ikan.nama}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
