import { useCallback, useEffect, useRef, useState, type PointerEvent as RPointerEvent } from 'react'
import { audio } from '../audio'
import { IKAN, type IkanDef } from '../content'
import { FishSvg } from '../FishSvg'
import { useGame } from '../Game'
import { GameButton, LakeBackground } from '../ui'
import { TangkapanPopup } from './TangkapanPopup'

/*
 * Semua kedudukan dalam unit pentas 1600 x 900 (16:9).
 * Elemen DOM dikemas kini terus dalam gelung rAF untuk animasi yang lancar.
 */

type Fasa = 'sedia' | 'melempar' | 'menunggu' | 'umpan' | 'menarik' | 'gulung'

interface IkanHidup {
  key: string
  def: IkanDef | null // null = ikan biasa (hiasan)
  x: number
  y: number
  baseY: number
  dir: 1 | -1
  laju: number
  fasa: number
  w: number
  keadaan: 'renang' | 'tertarik' | 'gigit' | 'lari' | 'naik' | 'hilang'
  pemasa: number
  rehat: number
  rot: number
}

const ZON = { x0: 720, x1: 1320, y0: 600, y1: 830 }
const PANGKAL = { x: 600, y: 650 } // pangkal joran di jeti
const HUJUNG_REHAT = { x: 860, y: 300 }
const PANJANG_JORAN = Math.hypot(HUJUNG_REHAT.x - PANGKAL.x, HUJUNG_REHAT.y - PANGKAL.y)
const SUDUT_REHAT = Math.atan2(HUJUNG_REHAT.y - PANGKAL.y, HUJUNG_REHAT.x - PANGKAL.x)
const ANGKAT = { x: 900, y: 360 }

const rawak = (a: number, b: number) => a + Math.random() * (b - a)
const ease = (t: number) => 1 - Math.pow(1 - t, 3)

function airSah(x: number, y: number) {
  if (y < 520) return false
  if (x < 710 && y > 570) return false // jeti & tebing kiri
  if (x > 1330 && y > 700) return false // tumbuhan kanan bawah
  if (x > 1420) return false
  return true
}

function ciptaIkan(ditangkap: string[]): IkanHidup[] {
  const istimewa = IKAN.filter((i) => !ditangkap.includes(i.id)).map((def, i) => {
    const y = rawak(ZON.y0 + 20, ZON.y1 - 20)
    return {
      key: def.id,
      def,
      x: ZON.x0 + ((i + 0.5) / 5) * (ZON.x1 - ZON.x0) + rawak(-30, 30),
      y,
      baseY: y,
      dir: (Math.random() > 0.5 ? 1 : -1) as 1 | -1,
      laju: rawak(45, 75),
      fasa: rawak(0, 6),
      w: 175 * def.saiz,
      keadaan: 'renang' as const,
      pemasa: 0,
      rehat: 0,
      rot: 0,
    }
  })
  const biasa = Array.from({ length: 4 }).map((_, i) => {
    const y = rawak(ZON.y0, ZON.y1 + 20)
    return {
      key: `biasa-${i}`,
      def: null,
      x: rawak(ZON.x0, ZON.x1),
      y,
      baseY: y,
      dir: (i % 2 ? 1 : -1) as 1 | -1,
      laju: rawak(30, 60),
      fasa: rawak(0, 6),
      w: rawak(80, 120),
      keadaan: 'renang' as const,
      pemasa: 0,
      rehat: 0,
      rot: 0,
    }
  })
  return [...biasa, ...istimewa]
}

export function PlayScreen({ jeda }: { jeda: boolean }) {
  const { pergi, ditangkap, setDitangkap, bukaBahan, skor, setSkor } = useGame()

  const [fasa, setFasaState] = useState<Fasa>('sedia')
  const [popup, setPopup] = useState<{ ikan: IkanDef; mata: number; sempurna: boolean } | null>(null)
  const [notis, setNotis] = useState<{ teks: string; jenis: 'baik' | 'buruk' | 'info'; id: number } | null>(null)
  const [percikan, setPercikan] = useState<{ id: number; x: number; y: number; besar?: boolean }[]>([])
  const [senaraiIkan] = useState(() => ciptaIkan(ditangkap))

  const ikanRef = useRef<IkanHidup[]>(senaraiIkan)
  const domIkan = useRef(new Map<string, HTMLDivElement>())
  const taliRef = useRef<SVGPathElement>(null)
  const joranRef = useRef<SVGGElement>(null)
  const pelampungRef = useRef<HTMLDivElement>(null)
  const jarumRef = useRef<HTMLDivElement>(null)
  const masaRef = useRef<HTMLDivElement>(null)
  const jedaRef = useRef(jeda)
  jedaRef.current = jeda || !!popup

  const kail = useRef({
    fasa: 'sedia' as Fasa,
    t: 0,
    dari: { x: 0, y: 0 },
    ke: { x: 0, y: 0 },
    x: HUJUNG_REHAT.x,
    y: HUJUNG_REHAT.y + 110,
    tunggu: 0,
    pemangsa: null as IkanHidup | null,
    sudut: SUDUT_REHAT,
    sempurna: false,
  })
  const mini = useRef({ masa: 0, zon0: 0.4, zonW: 0.26, laju: 1.1, had: 5 })
  const ditangkapRef = useRef(ditangkap)
  ditangkapRef.current = ditangkap

  const setFasa = useCallback((f: Fasa) => {
    kail.current.fasa = f
    setFasaState(f)
  }, [])

  const tunjukNotis = useCallback((teks: string, jenis: 'baik' | 'buruk' | 'info' = 'info') => {
    setNotis({ teks, jenis, id: Date.now() })
  }, [])
  useEffect(() => {
    if (!notis) return
    const t = setTimeout(() => setNotis(null), 1900)
    return () => clearTimeout(t)
  }, [notis])

  const tambahPercikan = useCallback((x: number, y: number, besar = false) => {
    const id = Math.random()
    setPercikan((p) => [...p, { id, x, y, besar }])
    setTimeout(() => setPercikan((p) => p.filter((s) => s.id !== id)), 1000)
  }, [])

  const hujungJoran = () => {
    const a = kail.current.sudut
    return { x: PANGKAL.x + Math.cos(a) * PANJANG_JORAN, y: PANGKAL.y + Math.sin(a) * PANJANG_JORAN }
  }

  // ----------------------------------------------------------- tindakan
  const lempar = useCallback(
    (x: number, y: number) => {
      const k = kail.current
      k.dari = { x: k.x, y: k.y }
      k.ke = { x, y }
      k.t = 0
      k.tunggu = 0
      audio.sfx('lempar')
      setFasa('melempar')
    },
    [setFasa],
  )

  const gagal = useCallback(
    (sebab: string) => {
      const k = kail.current
      const ikan = k.pemangsa
      if (ikan) {
        ikan.keadaan = 'lari'
        ikan.dir = ikan.x > k.x ? 1 : -1
        ikan.pemasa = 1.1
        ikan.rehat = 3
        ikan.rot = 0
      }
      k.pemangsa = null
      audio.sfx('terlepas')
      tambahPercikan(k.x, k.y)
      tunjukNotis(sebab, 'buruk')
      k.dari = { x: k.x, y: k.y }
      k.t = 0
      setFasa('gulung')
    },
    [setFasa, tambahPercikan, tunjukNotis],
  )

  const tarik = useCallback(() => {
    const k = kail.current
    if (k.fasa !== 'umpan' || !k.pemangsa) return
    const m = mini.current
    const pos = kedudukanJarum(m.masa, m.laju)
    const tengah = m.zon0 + m.zonW / 2
    if (pos >= m.zon0 && pos <= m.zon0 + m.zonW) {
      const sempurna = Math.abs(pos - tengah) < m.zonW / 6
      k.pemangsa.keadaan = 'naik'
      k.dari = { x: k.x, y: k.y }
      k.t = 0
      audio.sfx('gulung')
      audio.sfx('percikan')
      tambahPercikan(k.x, k.y, true)
      tunjukNotis(sempurna ? '🌟 TARIKAN SEMPURNA!' : '💪 BAGUS! Tarik!', 'baik')
      k.sempurna = sempurna
      setFasa('menarik')
    } else {
      gagal('Alamak! Terlalu awal atau lewat — ikan terlepas!')
    }
  }, [gagal, setFasa, tambahPercikan, tunjukNotis])

  const klikTasik = (e: RPointerEvent<HTMLDivElement>) => {
    if (popup || jeda) return
    const r = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width) * 1600
    const y = ((e.clientY - r.top) / r.height) * 900
    const k = kail.current
    if (k.fasa === 'umpan') return tarik()
    if (k.fasa === 'melempar' || k.fasa === 'menarik') return
    if (!airSah(x, y)) {
      tunjukNotis('💧 Lempar mata kail ke dalam air tasik!', 'info')
      return
    }
    if (k.fasa === 'menunggu' || k.fasa === 'gulung') {
      audio.sfx('gulung')
      for (const i of ikanRef.current) if (i.keadaan === 'tertarik') i.keadaan = 'renang'
    }
    lempar(x, y)
  }

  // kekunci papan kekunci
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        if (kail.current.fasa === 'umpan') {
          e.preventDefault()
          tarik()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [tarik])

  // ----------------------------------------------------------- gelung permainan
  const selesaiTangkap = useRef<(ikan: IkanHidup) => void>(() => {})
  selesaiTangkap.current = (ikan: IkanHidup) => {
    if (!ikan.def) return
    const sempurna = kail.current.sempurna
    const mata = sempurna ? 150 : 100
    ikan.keadaan = 'hilang'
    audio.sfx('tangkap')
    setTimeout(() => audio.sfx('berjaya'), 350)
    setSkor(skor + mata)
    setDitangkap([...ditangkapRef.current, ikan.def.id])
    setPopup({ ikan: ikan.def, mata, sempurna })
  }

  const gagalRef = useRef(gagal)
  gagalRef.current = gagal
  const tambahPercikanRef = useRef(tambahPercikan)
  tambahPercikanRef.current = tambahPercikan

  useEffect(() => {
    let raf = 0
    let last = performance.now()
    let masa = 0

    const kemaskini = (dt: number) => {
      masa += dt
      const k = kail.current
      const senarai = ikanRef.current

      // ---- joran & kail
      let sasaranSudut = SUDUT_REHAT
      if (k.fasa === 'melempar') {
        k.t = Math.min(1, k.t + dt / 0.6)
        sasaranSudut = SUDUT_REHAT - 0.35 * Math.sin(Math.PI * Math.min(1, k.t * 1.6)) + 0.12 * k.t
        const e = ease(k.t)
        k.x = k.dari.x + (k.ke.x - k.dari.x) * e
        k.y = k.dari.y + (k.ke.y - k.dari.y) * e - Math.sin(Math.PI * k.t) * 180
        if (k.t >= 1) {
          k.x = k.ke.x
          k.y = k.ke.y
          audio.sfx('percikan')
          tambahPercikanRef.current(k.x, k.y)
          k.fasa = 'menunggu'
          setFasaState('menunggu')
        }
      } else if (k.fasa === 'menunggu') {
        sasaranSudut = SUDUT_REHAT + 0.12
        k.tunggu += dt
        k.y = k.ke.y + Math.sin(masa * 2.4) * 3
      } else if (k.fasa === 'umpan') {
        sasaranSudut = SUDUT_REHAT + 0.2 + Math.sin(masa * 22) * 0.025
        k.y = k.ke.y + 10 + Math.sin(masa * 18) * 6
        mini.current.masa += dt
        if (mini.current.masa > mini.current.had) {
          gagalRef.current('Ikan bosan menunggu dan terlepas! Tekan lebih cepat.')
        }
      } else if (k.fasa === 'menarik') {
        k.t = Math.min(1, k.t + dt / 1.0)
        sasaranSudut = SUDUT_REHAT - 0.25 * ease(k.t)
        const e = ease(k.t)
        k.x = k.dari.x + (ANGKAT.x - k.dari.x) * e
        k.y = k.dari.y + (ANGKAT.y - k.dari.y) * e - Math.sin(Math.PI * k.t) * 120
        const ikan = k.pemangsa
        if (ikan) {
          ikan.x = k.x
          ikan.y = k.y + ikan.w * 0.36
          ikan.rot = -90 * ikan.dir + Math.sin(masa * 20) * 14
        }
        if (k.t >= 1) {
          k.pemangsa = null
          k.dari = { x: k.x, y: k.y }
          k.t = 1
          k.fasa = 'sedia'
          setFasaState('sedia')
          if (ikan) selesaiTangkap.current(ikan)
        }
      } else if (k.fasa === 'gulung') {
        k.t = Math.min(1, k.t + dt / 0.5)
        const h = hujungJoran()
        const e = ease(k.t)
        k.x = k.dari.x + (h.x - k.dari.x) * e
        k.y = k.dari.y + (h.y + 110 - k.dari.y) * e
        if (k.t >= 1) {
          k.fasa = 'sedia'
          setFasaState('sedia')
        }
      } else {
        // sedia: bergantung di hujung joran
        const h = hujungJoran()
        k.x += (h.x + Math.sin(masa * 1.6) * 10 - k.x) * Math.min(1, dt * 6)
        k.y += (h.y + 110 - k.y) * Math.min(1, dt * 6)
      }
      k.sudut += (sasaranSudut - k.sudut) * Math.min(1, dt * 10)

      // ---- tarikan ikan istimewa ke umpan
      if (k.fasa === 'menunggu' && !senarai.some((i) => i.keadaan === 'tertarik')) {
        let terbaik: IkanHidup | null = null
        let jarakTerbaik = Infinity
        for (const i of senarai) {
          if (!i.def || i.keadaan !== 'renang' || i.rehat > 0) continue
          const d = Math.hypot(i.x - k.x, i.y - k.y)
          if (d < jarakTerbaik) {
            jarakTerbaik = d
            terbaik = i
          }
        }
        if (terbaik && (jarakTerbaik < 330 || k.tunggu > 3.2)) terbaik.keadaan = 'tertarik'
      }

      // ---- pergerakan ikan
      for (const i of senarai) {
        i.fasa += dt * 2
        if (i.rehat > 0) i.rehat -= dt
        if (i.keadaan === 'renang' || i.keadaan === 'lari') {
          const laju = i.keadaan === 'lari' ? 300 : i.laju
          i.x += i.dir * laju * dt
          i.baseY += (Math.random() - 0.5) * 20 * dt
          i.baseY = Math.max(ZON.y0, Math.min(ZON.y1, i.baseY))
          i.y = i.baseY + Math.sin(i.fasa) * 10
          i.rot = Math.sin(i.fasa * 0.7) * 4
          if (i.x < ZON.x0) i.dir = 1
          if (i.x > ZON.x1) i.dir = -1
          if (i.keadaan === 'renang' && Math.random() < 0.12 * dt) i.dir = (i.dir * -1) as 1 | -1
          if (i.keadaan === 'lari') {
            i.pemasa -= dt
            if (i.pemasa <= 0) i.keadaan = 'renang'
          }
        } else if (i.keadaan === 'tertarik') {
          if (k.fasa !== 'menunggu') {
            i.keadaan = 'renang'
            continue
          }
          i.dir = k.x >= i.x ? 1 : -1
          const sx = k.x - i.dir * i.w * 0.32
          const sy = k.y + 18
          const dx = sx - i.x
          const dy = sy - i.y
          const d = Math.hypot(dx, dy)
          const laju = 170
          if (d < 6) {
            // menyambar umpan!
            i.keadaan = 'gigit'
            k.pemangsa = i
            const bil = ditangkapRef.current.length
            const zonW = Math.max(0.16, 0.3 - bil * 0.03)
            mini.current = {
              masa: 0,
              zon0: rawak(0.15, 0.85 - zonW),
              zonW,
              laju: 0.85 + bil * 0.12,
              had: 5,
            }
            audio.sfx('umpan')
            tambahPercikanRef.current(k.x, k.y)
            k.fasa = 'umpan'
            setFasaState('umpan')
          } else {
            i.x += (dx / d) * Math.min(d, laju * dt)
            i.y += (dy / d) * Math.min(d, laju * dt)
            i.rot = Math.sin(i.fasa * 3) * 6
          }
        } else if (i.keadaan === 'gigit') {
          i.rot = Math.sin(masa * 30) * 8
          i.x += Math.sin(masa * 25) * 0.8
        }
      }
    }

    const lukis = () => {
      const k = kail.current
      const h = hujungJoran()
      // joran
      if (joranRef.current) {
        const darjah = ((k.sudut - SUDUT_REHAT) * 180) / Math.PI
        joranRef.current.setAttribute('transform', `rotate(${darjah} ${PANGKAL.x} ${PANGKAL.y})`)
      }
      // tali pancing
      if (taliRef.current) {
        const tegang = k.fasa === 'umpan' || k.fasa === 'menarik'
        const kendur = tegang ? 10 : k.fasa === 'menunggu' ? 80 : 30
        const cx = (h.x + k.x) / 2
        const cy = Math.max(h.y, k.y) - Math.abs(k.y - h.y) * 0.1 + kendur
        taliRef.current.setAttribute('d', `M ${h.x} ${h.y} Q ${cx} ${cy} ${k.x} ${k.y}`)
      }
      if (pelampungRef.current) {
        const el = pelampungRef.current
        el.style.left = `${k.x / 16}%`
        el.style.top = `${k.y / 9}%`
        el.dataset.fasa = k.fasa
      }
      // ikan
      for (const i of ikanRef.current) {
        const el = domIkan.current.get(i.key)
        if (!el) continue
        if (i.keadaan === 'hilang') {
          el.style.display = 'none'
          continue
        }
        el.style.left = `${i.x / 16}%`
        el.style.top = `${i.y / 9}%`
        el.style.setProperty('--dir', String(i.dir))
        el.style.setProperty('--rot', `${i.rot}deg`)
        el.dataset.keadaan = i.keadaan
      }
      // jarum permainan masa
      if (jarumRef.current && k.fasa === 'umpan') {
        const m = mini.current
        jarumRef.current.style.left = `${kedudukanJarum(m.masa, m.laju) * 100}%`
        if (masaRef.current)
          masaRef.current.style.width = `${Math.max(0, 1 - m.masa / m.had) * 100}%`
      }
    }

    const gelung = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      if (!jedaRef.current) kemaskini(dt)
      lukis()
      raf = requestAnimationFrame(gelung)
    }
    raf = requestAnimationFrame(gelung)
    return () => cancelAnimationFrame(raf)
  }, [])

  const semuaDitangkap = ditangkap.length >= IKAN.length

  return (
    <div className="cl-screen cl-main">
      <LakeBackground fail="tasik.png" />

      {/* kawasan tasik boleh diklik */}
      <div className="cl-main__tasik" onPointerDown={klikTasik} data-fasa={fasa}>
        {percikan.map((p) => (
          <div
            key={p.id}
            className={`cl-percikan ${p.besar ? 'is-besar' : ''}`}
            style={{ left: `${p.x / 16}%`, top: `${p.y / 9}%` }}
          >
            <i />
            <i />
            <i />
            <b />
            <b />
            <b />
            <b />
          </div>
        ))}

        {senaraiIkan.map((i) => (
          <div
            key={i.key}
            ref={(el) => {
              if (el) domIkan.current.set(i.key, el)
              else domIkan.current.delete(i.key)
            }}
            className={`cl-ikan ${i.def ? 'is-istimewa' : 'is-biasa'}`}
            style={{ width: `${i.w / 16}%` }}
          >
            {i.def ? (
              <>
                <div className="cl-ikan__aura" />
                <FishSvg ikan={i.def} className="cl-ikan__svg" />
                <div className="cl-ikan__tanya">?</div>
              </>
            ) : (
              <IkanBayang />
            )}
          </div>
        ))}

        {/* joran & tali */}
        <svg className="cl-main__joran" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden>
          <defs>
            <linearGradient id="joran-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6b3b12" />
              <stop offset="50%" stopColor="#c27a2c" />
              <stop offset="100%" stopColor="#7a4415" />
            </linearGradient>
          </defs>
          <path ref={taliRef} d="" fill="none" stroke="#fff" strokeWidth="2.5" opacity="0.9" />
          <g ref={joranRef}>
            <line
              x1={PANGKAL.x}
              y1={PANGKAL.y}
              x2={HUJUNG_REHAT.x}
              y2={HUJUNG_REHAT.y}
              stroke="#3b1d06"
              strokeWidth="20"
              strokeLinecap="round"
            />
            <line
              x1={PANGKAL.x}
              y1={PANGKAL.y}
              x2={HUJUNG_REHAT.x}
              y2={HUJUNG_REHAT.y}
              stroke="url(#joran-grad)"
              strokeWidth="13"
              strokeLinecap="round"
            />
            <line
              x1={PANGKAL.x + 30}
              y1={PANGKAL.y - 40}
              x2={HUJUNG_REHAT.x - 10}
              y2={HUJUNG_REHAT.y + 14}
              stroke="#ffd27a"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.7"
            />
            {/* gelendong (reel) */}
            <g transform={`translate(${PANGKAL.x + 42} ${PANGKAL.y - 48})`}>
              <circle r="30" fill="#2b2d42" />
              <circle r="24" fill="#ef233c" />
              <circle r="10" fill="#edf2f4" />
              <rect x="-4" y="-40" width="8" height="18" fill="#2b2d42" rx="3" />
            </g>
            {/* gelang-gelang */}
            {[0.45, 0.7, 0.92].map((t) => (
              <circle
                key={t}
                cx={PANGKAL.x + (HUJUNG_REHAT.x - PANGKAL.x) * t}
                cy={PANGKAL.y + (HUJUNG_REHAT.y - PANGKAL.y) * t}
                r="6"
                fill="none"
                stroke="#c9d6df"
                strokeWidth="3"
              />
            ))}
          </g>
        </svg>

        {/* kotak pancing di jeti */}
        <div className="cl-kotak-pancing" aria-hidden>
          <div className="cl-kotak-pancing__penutup" />
          <div className="cl-kotak-pancing__badan">🎣</div>
        </div>

        <div ref={pelampungRef} className="cl-pelampung" aria-hidden>
          <span className="cl-pelampung__atas" />
          <span className="cl-pelampung__bawah" />
          <span className="cl-pelampung__riak" />
          {fasa === 'umpan' && <span className="cl-pelampung__seru">!</span>}
        </div>
      </div>

      {/* HUD */}
      <div className="cl-hud">
        <GameButton
          warna="biru"
          kecil
          className="cl-hud__menu"
          ikon="⏸"
          onClick={() => pergi('menu')}
        >
          MENU
        </GameButton>

        <div className="cl-koleksi">
          <div className="cl-koleksi__tajuk">
            KOLEKSI KIT MEDIA <b>{ditangkap.length}/5</b>
          </div>
          <div className="cl-koleksi__slot">
            {IKAN.map((ikan) => {
              const ada = ditangkap.includes(ikan.id)
              return (
                <button
                  key={ikan.id}
                  type="button"
                  className={`cl-slot ${ada ? 'is-ada' : ''}`}
                  disabled={!ada}
                  onClick={() => bukaBahan(ikan.id)}
                  title={ada ? `Buka ${ikan.nama}` : 'Belum ditangkap'}
                  aria-label={ada ? `Buka ${ikan.nama}` : `Ikan ${ikan.no} belum ditangkap`}
                >
                  {ada ? (
                    <FishSvg ikan={ikan} tunjukLabel />
                  ) : (
                    <span className="cl-slot__kosong">{ikan.no}</span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        <div className="cl-skor">
          <span>SKOR</span>
          <b>{skor}</b>
        </div>
      </div>

      {/* petunjuk / permainan masa */}
      {fasa === 'umpan' ? (
        <div className="cl-tarik">
          <div className="cl-tarik__tajuk">⚡ IKAN MENYAMBAR! Tekan TARIK ketika penunjuk di zon hijau!</div>
          <div className="cl-tarik__bar">
            <div
              className="cl-tarik__zon"
              style={{ left: `${mini.current.zon0 * 100}%`, width: `${mini.current.zonW * 100}%` }}
            >
              <i />
            </div>
            <div ref={jarumRef} className="cl-tarik__jarum" />
          </div>
          <div className="cl-tarik__masa">
            <div ref={masaRef} />
          </div>
          <button
            type="button"
            className="cl-tarik__butang"
            onPointerDown={(e) => {
              e.stopPropagation()
              tarik()
            }}
          >
            TARIK! 🎣
          </button>
        </div>
      ) : (
        <div className="cl-petunjuk" key={fasa}>
          {fasa === 'sedia' &&
            (semuaDitangkap
              ? '🏆 Semua ikan telah ditangkap!'
              : '👆 Klik pada air tasik untuk melempar mata kail!')}
          {fasa === 'melempar' && '🎣 Wusshh! Mata kail dilempar…'}
          {fasa === 'menunggu' && '⏳ Tunggu ikan istimewa menyambar umpan… (klik tempat lain untuk lempar semula)'}
          {fasa === 'menarik' && '💪 Sedang menarik ikan keluar dari air…'}
          {fasa === 'gulung' && '🔄 Menggulung tali pancing…'}
        </div>
      )}

      {notis && (
        <div key={notis.id} className={`cl-notis cl-notis--${notis.jenis}`} role="status">
          {notis.teks}
        </div>
      )}

      {semuaDitangkap && !popup && (
        <div className="cl-main__tamat">
          <GameButton warna="kuning" ikon="🏆" onClick={() => pergi('menang')}>
            LIHAT KEPUTUSAN
          </GameButton>
        </div>
      )}

      {popup && (
        <TangkapanPopup
          ikan={popup.ikan}
          mata={popup.mata}
          sempurna={popup.sempurna}
          akhir={semuaDitangkap}
          bilangan={ditangkap.length}
          onBuka={() => {
            bukaBahan(popup.ikan.id)
            setPopup(null)
          }}
          onTerus={() => {
            setPopup(null)
            if (semuaDitangkap) pergi('menang')
          }}
        />
      )}
    </div>
  )
}

/** Kedudukan jarum 0..1 (gelombang segi tiga) */
function kedudukanJarum(masa: number, laju: number) {
  const p = (masa * laju) % 2
  return p < 1 ? p : 2 - p
}

function IkanBayang() {
  return (
    <svg viewBox="0 0 120 60" className="cl-ikan__bayang">
      <path
        d="M10 30 L0 10 L4 30 L0 50 Z M14 30 C 30 6, 80 4, 110 26 C 116 30, 116 32, 110 36 C 80 56, 30 54, 14 30 Z"
        fill="#0b4f6c"
      />
    </svg>
  )
}
