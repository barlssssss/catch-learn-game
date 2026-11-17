export function Rph() {
  return (
    <div className="cl-dok">
      <h3>Rancangan Pengajaran Harian (RPH)</h3>
      <table className="cl-jadual cl-jadual--rph">
        <tbody>
          <tr><th>Mata Pelajaran</th><td>Pendidikan Kesihatan</td><th>Tingkatan</th><td>1</td></tr>
          <tr><th>Tajuk</th><td>Penyakit</td><th>Masa</th><td>40 minit</td></tr>
          <tr><th>Bilangan Murid</th><td>30 orang</td><th>Bahan Bantu Mengajar</th><td>Kit Media “Catch &amp; Learn”, komputer, LCD, nota</td></tr>
        </tbody>
      </table>

      <div className="cl-grid-2">
        <div className="cl-kad cl-kad--biru">
          <h4>📌 Standard Pembelajaran</h4>
          <p>Mengenal pasti jenis penyakit berjangkit dan tidak berjangkit, punca, cara merebak serta langkah pencegahan.</p>
        </div>
        <div className="cl-kad cl-kad--hijau">
          <h4>🎯 Objektif Pembelajaran</h4>
          <p>Pada akhir pengajaran, murid dapat:</p>
          <ol>
            <li>Membezakan penyakit berjangkit dan tidak berjangkit.</li>
            <li>Menyatakan sekurang-kurangnya tiga cara penyakit berjangkit merebak.</li>
            <li>Mencadangkan langkah pencegahan penyakit dalam kehidupan harian.</li>
          </ol>
        </div>
      </div>

      <h3>Langkah Pengajaran &amp; Pembelajaran</h3>
      <table className="cl-jadual">
        <thead>
          <tr><th>Fasa</th><th>Aktiviti Guru &amp; Murid</th><th>Masa</th><th>Catatan</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><b>Set Induksi</b></td>
            <td>Guru menayangkan muka depan permainan “Catch &amp; Learn” dan bertanya: “Pernahkah anda demam selepas rakan anda selesema?”</td>
            <td>5 minit</td>
            <td>Menarik minat murid</td>
          </tr>
          <tr>
            <td><b>Langkah 1</b></td>
            <td>Murid memancing ikan <b>NOTA</b>. Guru menerangkan maksud penyakit berjangkit dan tidak berjangkit berpandukan nota.</td>
            <td>10 minit</td>
            <td>Kaedah: penerangan &amp; soal jawab</td>
          </tr>
          <tr>
            <td><b>Langkah 2</b></td>
            <td>Murid dibahagikan kepada kumpulan. Setiap kumpulan memilih satu penyakit dan membentangkan punca, cara merebak dan gejalanya.</td>
            <td>10 minit</td>
            <td>Pembelajaran koperatif (Think-Pair-Share)</td>
          </tr>
          <tr>
            <td><b>Langkah 3</b></td>
            <td>Murid bergilir-gilir memancing ikan <b>KUIZ INTERAKTIF</b> dan menjawab soalan secara berkumpulan.</td>
            <td>10 minit</td>
            <td>Pentaksiran formatif berasaskan permainan</td>
          </tr>
          <tr>
            <td><b>Penutup</b></td>
            <td>Guru merumuskan pelajaran. Murid menyatakan satu amalan pencegahan yang akan dilakukan di rumah.</td>
            <td>5 minit</td>
            <td>Nilai: kebersihan &amp; tanggungjawab</td>
          </tr>
        </tbody>
      </table>

      <div className="cl-grid-3">
        <div className="cl-kad"><h4>💎 Nilai Murni</h4><p>Kebersihan, bertanggungjawab, prihatin, kerjasama.</p></div>
        <div className="cl-kad"><h4>🧠 KBAT / EMK</h4><p>Menganalisis cara pencegahan; Kreativiti &amp; Inovasi, TMK.</p></div>
        <div className="cl-kad"><h4>📝 Pentaksiran</h4><p>Pemerhatian, soal jawab dan skor kuiz interaktif.</p></div>
      </div>

      <div className="cl-info">
        ✍️ <b>Refleksi:</b> ____ / 30 murid dapat mencapai objektif pembelajaran. Murid yang belum menguasai akan
        diberi bimbingan dan latihan pengukuhan.
      </div>
    </div>
  )
}
