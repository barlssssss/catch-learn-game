import { Tab } from './Tab'

export function Nota() {
  return (
    <Tab
      tab={[
        {
          tajuk: '1. Pengenalan',
          isi: (
            <div className="cl-dok">
              <h3>Apakah itu Penyakit?</h3>
              <p>
                <b>Penyakit</b> ialah keadaan apabila fungsi tubuh badan atau minda terganggu sehingga
                menyebabkan seseorang berasa tidak sihat. Penyakit boleh dibahagikan kepada dua jenis utama:
              </p>
              <div className="cl-grid-2">
                <div className="cl-kad cl-kad--merah">
                  <h4>🦠 Penyakit Berjangkit</h4>
                  <p>
                    Disebabkan oleh <b>patogen</b> (bakteria, virus, kulat, protozoa) dan boleh merebak
                    daripada seorang individu kepada individu lain.
                  </p>
                  <p className="cl-kecil">Contoh: influenza, denggi, tibi, kolera, HFMD.</p>
                </div>
                <div className="cl-kad cl-kad--biru">
                  <h4>❤️ Penyakit Tidak Berjangkit</h4>
                  <p>
                    Tidak merebak kepada orang lain. Biasanya berkait dengan <b>gaya hidup</b>, faktor
                    baka (genetik) dan persekitaran.
                  </p>
                  <p className="cl-kecil">Contoh: diabetes, darah tinggi, asma, obesiti.</p>
                </div>
              </div>
              <div className="cl-info">
                💡 <b>Tahukah anda?</b> Patogen ialah mikroorganisma yang menyebabkan penyakit. Ia terlalu kecil
                untuk dilihat dengan mata kasar!
              </div>
            </div>
          ),
        },
        {
          tajuk: '2. Penyakit Berjangkit',
          isi: (
            <div className="cl-dok">
              <h3>Contoh Penyakit Berjangkit</h3>
              <table className="cl-jadual">
                <thead>
                  <tr>
                    <th>Penyakit</th>
                    <th>Punca</th>
                    <th>Cara Merebak</th>
                    <th>Tanda &amp; Gejala</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>Denggi</b></td>
                    <td>Virus denggi</td>
                    <td>Gigitan nyamuk <i>Aedes</i></td>
                    <td>Demam panas, sakit sendi, ruam, sakit belakang mata</td>
                  </tr>
                  <tr>
                    <td><b>Influenza</b></td>
                    <td>Virus influenza</td>
                    <td>Titisan udara ketika batuk / bersin</td>
                    <td>Demam, selsema, batuk, sakit tekak</td>
                  </tr>
                  <tr>
                    <td><b>Tuberkulosis (Tibi)</b></td>
                    <td>Bakteria</td>
                    <td>Udara daripada batuk pesakit</td>
                    <td>Batuk lebih 2 minggu, berpeluh malam, susut berat badan</td>
                  </tr>
                  <tr>
                    <td><b>Kolera</b></td>
                    <td>Bakteria</td>
                    <td>Makanan &amp; air tercemar</td>
                    <td>Cirit-birit teruk, muntah, dehidrasi</td>
                  </tr>
                  <tr>
                    <td><b>HFMD</b> (Tangan, Kaki &amp; Mulut)</td>
                    <td>Virus</td>
                    <td>Sentuhan, air liur, najis</td>
                    <td>Demam, ulser mulut, ruam di tapak tangan &amp; kaki</td>
                  </tr>
                </tbody>
              </table>
              <h3>Cara Penyakit Berjangkit Merebak</h3>
              <ul className="cl-senarai-ikon">
                <li>💨 <b>Udara</b> – titisan batuk dan bersin</li>
                <li>🤝 <b>Sentuhan</b> – bersentuhan dengan pesakit atau objek tercemar</li>
                <li>🍲 <b>Makanan &amp; minuman</b> – yang tercemar dengan kuman</li>
                <li>🦟 <b>Vektor</b> – haiwan pembawa seperti nyamuk, lalat dan tikus</li>
              </ul>
            </div>
          ),
        },
        {
          tajuk: '3. Tidak Berjangkit',
          isi: (
            <div className="cl-dok">
              <h3>Penyakit Tidak Berjangkit</h3>
              <div className="cl-grid-2">
                <div className="cl-kad">
                  <h4>🍬 Diabetes</h4>
                  <p>Paras gula dalam darah terlalu tinggi. Dikaitkan dengan pemakanan tinggi gula dan kurang bersenam.</p>
                </div>
                <div className="cl-kad">
                  <h4>🩺 Darah Tinggi (Hipertensi)</h4>
                  <p>Tekanan darah melebihi paras normal. Faktor risiko: makanan masin, tekanan, kurang aktif.</p>
                </div>
                <div className="cl-kad">
                  <h4>🌬️ Asma</h4>
                  <p>Saluran pernafasan menjadi sempit. Dicetuskan oleh debu, asap, bulu haiwan atau cuaca sejuk.</p>
                </div>
                <div className="cl-kad">
                  <h4>⚖️ Obesiti</h4>
                  <p>Berat badan berlebihan akibat pengambilan kalori melebihi keperluan tubuh.</p>
                </div>
              </div>
              <div className="cl-info">
                🥗 Amalkan <b>gaya hidup sihat</b>: makan makanan seimbang, bersenam sekurang-kurangnya 60 minit
                sehari untuk remaja, tidur yang cukup dan jauhi rokok serta vape.
              </div>
            </div>
          ),
        },
        {
          tajuk: '4. Pencegahan',
          isi: (
            <div className="cl-dok">
              <h3>Langkah Mencegah Penyakit</h3>
              <div className="cl-grid-3">
                {[
                  ['🧼', 'Cuci Tangan', 'Gunakan sabun dan air bersih sekurang-kurangnya 20 saat.'],
                  ['😷', 'Etika Batuk', 'Tutup mulut dan hidung dengan tisu atau lengan.'],
                  ['💉', 'Imunisasi', 'Dapatkan suntikan vaksin mengikut jadual.'],
                  ['🗑️', 'Cari & Musnah', 'Hapuskan tempat air bertakung untuk mencegah pembiakan nyamuk Aedes.'],
                  ['🍎', 'Makanan Bersih', 'Masak makanan dengan sempurna dan minum air yang dimasak.'],
                  ['🏃', 'Gaya Hidup Aktif', 'Bersenam, rehat cukup dan makan makanan seimbang.'],
                ].map(([ikon, tajuk, teks]) => (
                  <div key={tajuk} className="cl-kad cl-kad--tengah">
                    <div className="cl-kad__ikon">{ikon}</div>
                    <h4>{tajuk}</h4>
                    <p>{teks}</p>
                  </div>
                ))}
              </div>
              <div className="cl-info cl-info--hijau">
                ✅ <b>Ingat!</b> Mencegah lebih baik daripada mengubati. Dapatkan rawatan di klinik jika anda
                mengalami tanda-tanda penyakit.
              </div>
            </div>
          ),
        },
      ]}
    />
  )
}
