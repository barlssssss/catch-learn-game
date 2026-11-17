import { useId } from 'react'
import type { IkanDef } from './content'

interface Props {
  ikan: IkanDef
  /** papar nama komponen pada badan ikan */
  tunjukLabel?: boolean
  /** ikan menghadap kiri */
  kiri?: boolean
  className?: string
  misteri?: boolean
}

/** Ikan kartun gaya 3D (SVG dengan gradien, kilauan dan bayang). */
export function FishSvg({ ikan, tunjukLabel, kiri, className, misteri }: Props) {
  const uid = useId().replace(/:/g, '')
  const w = ikan.warna
  const g = (n: string) => `${n}-${uid}`

  const panjang = Math.max(...ikan.label.map((l) => l.length))
  const duaBaris = ikan.label.length > 1

  return (
    <svg
      viewBox="0 0 260 150"
      className={className}
      style={{ overflow: 'visible' }}
      aria-hidden={!tunjukLabel}
      role={tunjukLabel ? 'img' : undefined}
      aria-label={tunjukLabel ? `Ikan ${ikan.nama}` : undefined}
    >
      <defs>
        <radialGradient id={g('badan')} cx="45%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="22%" stopColor={w.badan} />
          <stop offset="100%" stopColor={w.gelap} />
        </radialGradient>
        <linearGradient id={g('sirip')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={w.sirip} />
          <stop offset="100%" stopColor={w.gelap} />
        </linearGradient>
        <radialGradient id={g('perut')} cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor={w.perut} />
        </radialGradient>
        <clipPath id={g('klip')}>
          <ellipse cx="128" cy="75" rx="94" ry="54" />
        </clipPath>
      </defs>

      <g transform={kiri ? 'translate(260 0) scale(-1 1)' : undefined}>
        {/* bayang */}
        <ellipse cx="130" cy="140" rx="80" ry="7" fill="#003a5c" opacity="0.18" />

        {/* ekor */}
        <g className="ikan-ekor" style={{ transformOrigin: '44px 75px' }}>
          <path
            d="M44 75 C 20 40, 6 26, 4 22 C 20 30, 34 50, 44 60 Z M44 75 C 20 110, 6 124, 4 128 C 20 120, 34 100, 44 90 Z"
            fill={`url(#${g('sirip')})`}
          />
          <path
            d="M48 75 C 26 46, 10 20, 2 14 C 36 22, 46 52, 54 70 C 46 98, 36 128, 2 136 C 10 130, 26 104, 48 75Z"
            fill={`url(#${g('sirip')})`}
            stroke={w.gelap}
            strokeWidth="4"
            strokeLinejoin="round"
          />
        </g>

        {/* sirip atas */}
        <path
          d="M80 30 C 100 -4, 150 -6, 176 26 Z"
          fill={`url(#${g('sirip')})`}
          stroke={w.gelap}
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {/* sirip bawah */}
        <path
          d="M100 122 C 112 146, 140 146, 150 124 Z"
          fill={`url(#${g('sirip')})`}
          stroke={w.gelap}
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* badan */}
        <ellipse
          cx="128"
          cy="75"
          rx="94"
          ry="54"
          fill={`url(#${g('badan')})`}
          stroke={w.gelap}
          strokeWidth="5"
        />
        <g clipPath={`url(#${g('klip')})`}>
          <ellipse cx="135" cy="118" rx="90" ry="34" fill={`url(#${g('perut')})`} opacity="0.85" />
          <Corak corak={ikan.corak} warna={w.gelap} />
          {/* kilauan 3D */}
          <ellipse cx="118" cy="38" rx="62" ry="14" fill="#fff" opacity="0.35" />
        </g>

        {/* insang */}
        <path d="M178 46 C 168 66, 168 88, 178 106" fill="none" stroke={w.gelap} strokeWidth="4" strokeLinecap="round" opacity="0.6" />

        {/* sirip sisi */}
        <path
          className="ikan-sirip"
          d="M150 86 C 132 92, 120 110, 126 116 C 140 112, 154 100, 158 90 Z"
          fill={`url(#${g('sirip')})`}
          stroke={w.gelap}
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* mata */}
        <circle cx="196" cy="60" r="18" fill="#fff" stroke={w.gelap} strokeWidth="4" />
        <circle cx="200" cy="61" r="10" fill="#1b1b2f" />
        <circle cx="204" cy="56" r="4" fill="#fff" />
        {/* pipi */}
        <ellipse cx="196" cy="90" rx="10" ry="6" fill="#ff7aa2" opacity="0.6" />
        {/* mulut */}
        <path d="M214 86 C 220 92, 214 98, 208 96" fill="none" stroke={w.gelap} strokeWidth="4" strokeLinecap="round" />
      </g>

      {/* label komponen — tidak dicerminkan */}
      {tunjukLabel && !misteri && (
        <g className="ikan-label" style={{ pointerEvents: 'none' }}>
          {ikan.label.map((baris, i) => {
            const utama = i === 0
            const besar = duaBaris
              ? utama
                ? Math.min(36, 200 / Math.max(ikan.label[0].length, 3))
                : Math.min(19, 215 / baris.length)
              : Math.min(40, 220 / panjang)
            const y = duaBaris ? (utama ? 74 : 100) : 88
            return (
              <text
                key={i}
                x={kiri ? 146 : 114}
                y={y}
                textAnchor="middle"
                fontFamily="'Lilita One', 'Baloo 2', system-ui, sans-serif"
                fontSize={besar}
                fill="#fff"
                stroke="#1b1b2f"
                strokeWidth={utama ? 6 : 4.5}
                paintOrder="stroke"
                strokeLinejoin="round"
                letterSpacing={utama ? 1 : 0.3}
              >
                {baris}
              </text>
            )
          })}
        </g>
      )}
      {misteri && (
        <text
          x={kiri ? 146 : 114}
          y="92"
          textAnchor="middle"
          fontFamily="'Lilita One', system-ui, sans-serif"
          fontSize="46"
          fill="#fff"
          stroke="#1b1b2f"
          strokeWidth="6"
          paintOrder="stroke"
        >
          ?
        </text>
      )}
    </svg>
  )
}

function Corak({ corak, warna }: { corak: IkanDef['corak']; warna: string }) {
  const sifat = { fill: warna, opacity: 0.28 }
  switch (corak) {
    case 'jalur':
      return (
        <g>
          <path d="M92 10 C 80 50, 80 100, 92 140 L 112 140 C 100 100, 100 50, 112 10 Z" fill="#fff" opacity="0.75" />
          <path d="M150 10 C 140 50, 140 100, 150 140 L 166 140 C 156 100, 156 50, 166 10 Z" fill="#fff" opacity="0.75" />
        </g>
      )
    case 'bintik':
      return (
        <g {...sifat}>
          {[
            [80, 50, 8],
            [104, 36, 6],
            [118, 60, 9],
            [150, 40, 7],
            [92, 82, 6],
            [140, 72, 6],
            [66, 72, 5],
          ].map(([x, y, r], i) => (
            <circle key={i} cx={x} cy={y} r={r} />
          ))}
        </g>
      )
    case 'sisik':
      return (
        <g fill="none" stroke={warna} strokeWidth="3" opacity="0.28">
          {[0, 1, 2].map((row) =>
            [0, 1, 2, 3, 4].map((col) => (
              <path
                key={`${row}-${col}`}
                d={`M${60 + col * 24 + (row % 2) * 12} ${40 + row * 22} a 12 12 0 0 0 24 0`}
              />
            )),
          )}
        </g>
      )
    case 'bulatan':
      return (
        <g fill="none" stroke="#fff" strokeWidth="5" opacity="0.45">
          <circle cx="110" cy="70" r="30" />
          <circle cx="110" cy="70" r="16" />
        </g>
      )
    case 'bintang':
      return (
        <g fill="#fff" opacity="0.5">
          {[
            [82, 46],
            [140, 34],
            [114, 96],
            [160, 80],
          ].map(([x, y], i) => (
            <path
              key={i}
              transform={`translate(${x} ${y}) scale(0.9)`}
              d="M0 -10 L3 -3 L10 -3 L4 2 L6 10 L0 5 L-6 10 L-4 2 L-10 -3 L-3 -3 Z"
            />
          ))}
        </g>
      )
  }
}
