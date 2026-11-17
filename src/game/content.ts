/**
 * Kandungan Kit Media Pendidikan Kesihatan Tingkatan 1: Penyakit.
 * Lima ikan istimewa — setiap satu membawa satu komponen kit media.
 */

export type KomponenId = 'nota' | 'rph' | 'pengguna' | 'permainan' | 'kuiz'

export interface IkanDef {
  id: KomponenId
  no: number
  nama: string // nama penuh komponen
  label: string[] // teks pada badan ikan
  ikon: string
  warna: { badan: string; gelap: string; perut: string; sirip: string }
  corak: 'jalur' | 'bintik' | 'sisik' | 'bulatan' | 'bintang'
  saiz: number // skala relatif
}

export const IKAN: IkanDef[] = [
  {
    id: 'nota',
    no: 1,
    nama: 'NOTA',
    label: ['NOTA'],
    ikon: '📘',
    warna: { badan: '#ff8a1f', gelap: '#c94f00', perut: '#ffe2a8', sirip: '#ff5a36' },
    corak: 'jalur',
    saiz: 1,
  },
  {
    id: 'rph',
    no: 2,
    nama: 'RANCANGAN PENGAJARAN HARIAN (RPH)',
    label: ['RPH', 'Rancangan Pengajaran Harian'],
    ikon: '🗓️',
    warna: { badan: '#2f8cff', gelap: '#0f4fb8', perut: '#c8e6ff', sirip: '#ffd43b' },
    corak: 'sisik',
    saiz: 1.05,
  },
  {
    id: 'pengguna',
    no: 3,
    nama: 'MANUAL PENGGUNA',
    label: ['MANUAL', 'PENGGUNA'],
    ikon: '📗',
    warna: { badan: '#2ecc71', gelap: '#138a46', perut: '#d6ffd9', sirip: '#13b5a6' },
    corak: 'bintik',
    saiz: 1,
  },
  {
    id: 'permainan',
    no: 4,
    nama: 'MANUAL PERMAINAN',
    label: ['MANUAL', 'PERMAINAN'],
    ikon: '🎮',
    warna: { badan: '#b05cff', gelap: '#6a1fc4', perut: '#f1dcff', sirip: '#ff66c4' },
    corak: 'bulatan',
    saiz: 1.02,
  },
  {
    id: 'kuiz',
    no: 5,
    nama: 'KUIZ INTERAKTIF',
    label: ['KUIZ', 'INTERAKTIF'],
    ikon: '❓',
    warna: { badan: '#ff4d6d', gelap: '#b3123a', perut: '#ffe0e6', sirip: '#ffc21a' },
    corak: 'bintang',
    saiz: 1.08,
  },
]

export const ikanById = (id: KomponenId) => IKAN.find((i) => i.id === id)!

export const MAKLUMAT = {
  tajuk: 'CATCH & LEARN',
  subtajuk: 'JOM MEMANCING SAMBIL BELAJAR!',
  tugasan: 'KIT MEDIA PENDIDIKAN KESIHATAN TINGKATAN 1: PENYAKIT',
  nama: 'MUHAMMAD IRFAN IQBAL BIN ZAINUDDIN',
  matrik: 'D20241114109',
}

// ---------------------------------------------------------------------------
// KUIZ
// ---------------------------------------------------------------------------

export interface Soalan {
  soalan: string
  pilihan: string[]
  jawapan: number
  penerangan: string
}

export const SOALAN_KUIZ: Soalan[] = [
  {
    soalan: 'Apakah yang dimaksudkan dengan penyakit berjangkit?',
    pilihan: [
      'Penyakit yang diwarisi daripada ibu bapa',
      'Penyakit yang boleh merebak daripada seseorang kepada orang lain',
      'Penyakit yang hanya berlaku kepada warga emas',
      'Penyakit yang disebabkan oleh kemalangan',
    ],
    jawapan: 1,
    penerangan:
      'Penyakit berjangkit disebabkan oleh patogen seperti bakteria dan virus, dan boleh merebak kepada orang lain.',
  },
  {
    soalan: 'Antara berikut, yang manakah penyakit TIDAK berjangkit?',
    pilihan: ['Influenza', 'Denggi', 'Diabetes', 'Tuberkulosis'],
    jawapan: 2,
    penerangan:
      'Diabetes ialah penyakit tidak berjangkit yang berkait rapat dengan gaya hidup dan genetik.',
  },
  {
    soalan: 'Nyamuk Aedes ialah vektor yang menyebarkan penyakit…',
    pilihan: ['Kolera', 'Denggi', 'Tibi', 'Asma'],
    jawapan: 1,
    penerangan:
      'Virus denggi dipindahkan kepada manusia melalui gigitan nyamuk Aedes yang dijangkiti.',
  },
  {
    soalan: 'Tuberkulosis (Tibi) disebabkan oleh…',
    pilihan: ['Virus', 'Kulat', 'Bakteria', 'Cacing'],
    jawapan: 2,
    penerangan:
      'Tibi disebabkan oleh bakteria Mycobacterium tuberculosis dan merebak melalui udara.',
  },
  {
    soalan: 'Penyakit kolera biasanya merebak melalui…',
    pilihan: [
      'Gigitan nyamuk',
      'Makanan dan air minuman yang tercemar',
      'Bersalaman',
      'Cahaya matahari',
    ],
    jawapan: 1,
    penerangan:
      'Kolera merebak melalui makanan dan air yang tercemar dengan bakteria Vibrio cholerae.',
  },
  {
    soalan: 'Penyakit Tangan, Kaki dan Mulut (HFMD) disebabkan oleh…',
    pilihan: ['Virus', 'Bakteria', 'Protozoa', 'Kekurangan vitamin'],
    jawapan: 0,
    penerangan:
      'HFMD disebabkan oleh virus seperti Coxsackievirus dan Enterovirus 71, terutamanya dalam kalangan kanak-kanak.',
  },
  {
    soalan: 'Langkah terbaik untuk mencegah denggi ialah…',
    pilihan: [
      'Minum air sejuk',
      'Memusnahkan tempat pembiakan nyamuk',
      'Tidur lewat malam',
      'Memakai baju berwarna gelap',
    ],
    jawapan: 1,
    penerangan:
      'Amalkan aktiviti “Cari dan Musnah” tempat air bertakung yang menjadi tempat pembiakan nyamuk Aedes.',
  },
  {
    soalan: 'Apakah cara paling mudah untuk mengelakkan jangkitan kuman melalui tangan?',
    pilihan: [
      'Mencuci tangan dengan sabun dan air bersih',
      'Mengelap tangan pada baju',
      'Meniup tangan',
      'Memakai cincin',
    ],
    jawapan: 0,
    penerangan:
      'Mencuci tangan dengan sabun sekurang-kurangnya 20 saat dapat membunuh dan menyingkirkan kuman.',
  },
  {
    soalan: 'Apakah fungsi imunisasi (vaksin)?',
    pilihan: [
      'Menambah berat badan',
      'Membina daya tahan badan terhadap penyakit tertentu',
      'Menyembuhkan semua penyakit serta-merta',
      'Menggantikan makanan seimbang',
    ],
    jawapan: 1,
    penerangan:
      'Vaksin merangsang badan menghasilkan antibodi supaya kita terlindung daripada penyakit tertentu.',
  },
  {
    soalan: 'Apakah tindakan yang betul ketika batuk atau bersin?',
    pilihan: [
      'Batuk ke arah rakan',
      'Menutup mulut dan hidung dengan tisu atau lengan',
      'Menutup mulut dengan tapak tangan lalu bersalam',
      'Tidak perlu berbuat apa-apa',
    ],
    jawapan: 1,
    penerangan:
      'Etika batuk dan bersin mengurangkan penyebaran titisan yang mengandungi kuman ke udara.',
  },
]
