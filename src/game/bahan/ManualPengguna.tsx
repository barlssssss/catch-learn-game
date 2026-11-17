export function ManualPengguna() {
  return (
    <div className="cl-dok">
      <h3>Manual Pengguna Kit Media</h3>
      <p>
        Manual ini membantu guru dan murid menggunakan Kit Media Pendidikan Kesihatan Tingkatan 1: Penyakit
        dengan lancar di dalam bilik darjah.
      </p>

      <div className="cl-grid-2">
        <div className="cl-kad cl-kad--biru">
          <h4>💻 Keperluan Peranti</h4>
          <ul>
            <li>Komputer, komputer riba, tablet atau telefon pintar</li>
            <li>Pelayar web terkini (Chrome, Edge, Safari atau Firefox)</li>
            <li>Sambungan Internet</li>
            <li>Pembesar suara / fon kepala untuk muzik dan kesan bunyi</li>
            <li>Projektor LCD (untuk pembentangan di kelas)</li>
          </ul>
        </div>
        <div className="cl-kad cl-kad--hijau">
          <h4>📦 Kandungan Kit Media</h4>
          <ol>
            <li>Nota – isi pelajaran tentang penyakit</li>
            <li>Rancangan Pengajaran Harian (RPH)</li>
            <li>Manual Pengguna (dokumen ini)</li>
            <li>Manual Permainan</li>
            <li>Kuiz Interaktif – 10 soalan</li>
          </ol>
        </div>
      </div>

      <h3>Langkah Penggunaan</h3>
      <ol className="cl-langkah-dok">
        <li><b>Buka pautan permainan</b> pada pelayar web. Paparan terbaik dalam mod landskap (16:9) dan skrin penuh (tekan F11).</li>
        <li><b>Tekan “TEKAN UNTUK MULA”</b> untuk mengaktifkan muzik dan masuk ke Menu Utama.</li>
        <li>Pilih <b>CARA BERMAIN</b> untuk melihat panduan ringkas, atau <b>TETAPAN MUZIK</b> untuk menghidupkan / mematikan muzik dan kesan bunyi.</li>
        <li>Tekan <b>MULA BERMAIN</b> dan pancing kelima-lima ikan istimewa.</li>
        <li>Selepas ikan ditangkap, <b>tekan ikan</b> (atau butang BUKA BAHAN) untuk membuka komponen kit media.</li>
        <li>Ikan yang ditangkap disimpan dalam <b>Koleksi Kit Media</b> di bahagian atas skrin dan boleh dibuka semula pada bila-bila masa.</li>
        <li>Tekan <b>✕ TUTUP</b> atau kekunci <b>Esc</b> untuk menutup bahan dan kembali memancing.</li>
      </ol>

      <h3>Fungsi Butang</h3>
      <table className="cl-jadual">
        <thead><tr><th>Butang</th><th>Fungsi</th></tr></thead>
        <tbody>
          <tr><td>▶ MULA BERMAIN</td><td>Memulakan permainan memancing</td></tr>
          <tr><td>📖 CARA BERMAIN</td><td>Memaparkan panduan permainan</td></tr>
          <tr><td>🎵 TETAPAN MUZIK</td><td>Mengawal muzik latar dan kesan bunyi</td></tr>
          <tr><td>🎵 MUZIK ON / OFF</td><td>Butang pantas di penjuru kanan atas setiap halaman</td></tr>
          <tr><td>⏸ MENU</td><td>Kembali ke Menu Utama semasa bermain</td></tr>
          <tr><td>TARIK! 🎣</td><td>Menarik ikan ketika penunjuk berada di zon hijau</td></tr>
        </tbody>
      </table>

      <div className="cl-info">
        🛠️ <b>Penyelesaian masalah:</b> Jika tiada bunyi, pastikan butang MUZIK berstatus ON, kelantangan peranti
        dibuka dan anda telah menekan skrin sekurang-kurangnya sekali (pelayar memerlukan interaksi sebelum
        memainkan bunyi).
      </div>
    </div>
  )
}
