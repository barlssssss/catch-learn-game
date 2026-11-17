import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { audio } from './audio'
import { useGame } from './Game'

export const gambar = (fail: string, w = 1920) =>
  `/.netlify/images?url=/img/${fail}&w=${w}&fm=webp&q=80`

/** Tajuk gaya 3D kartun berlapis */
export function Title3D({
  teks,
  saiz = 'besar',
  className = '',
}: {
  teks: string
  saiz?: 'besar' | 'sederhana' | 'kecil'
  className?: string
}) {
  return (
    <h1 className={`cl-title3d cl-title3d--${saiz} ${className}`} aria-label={teks}>
      {teks.split('').map((h, i) => (
        <span
          key={i}
          className="cl-title3d__huruf"
          data-h={h}
          style={{ animationDelay: `${i * 0.07}s` }}
          aria-hidden
        >
          {h === ' ' ? ' ' : h}
        </span>
      ))}
    </h1>
  )
}

type Warna = 'oren' | 'hijau' | 'biru' | 'ungu' | 'merah' | 'kuning'

export function GameButton({
  warna = 'oren',
  ikon,
  children,
  className = '',
  onClick,
  kecil,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  warna?: Warna
  ikon?: ReactNode
  kecil?: boolean
}) {
  return (
    <button
      type="button"
      className={`cl-btn cl-btn--${warna} ${kecil ? 'cl-btn--kecil' : ''} ${className}`}
      onClick={(e) => {
        audio.unlock()
        audio.sfx('klik')
        onClick?.(e)
      }}
      {...rest}
    >
      {ikon && <span className="cl-btn__ikon">{ikon}</span>}
      <span>{children}</span>
    </button>
  )
}

export function MusicToggle() {
  const { tetapan, ubahTetapan } = useGame()
  return (
    <button
      type="button"
      className={`cl-muzik-toggle ${tetapan.muzik ? 'is-on' : 'is-off'}`}
      onClick={() => {
        audio.unlock()
        audio.sfx('klik')
        ubahTetapan({ muzik: !tetapan.muzik })
      }}
      aria-pressed={tetapan.muzik}
      aria-label={tetapan.muzik ? 'Matikan muzik' : 'Hidupkan muzik'}
      title={tetapan.muzik ? 'Muzik: ON' : 'Muzik: OFF'}
    >
      <span className="cl-muzik-toggle__ikon">{tetapan.muzik ? '🎵' : '🔇'}</span>
      <span>MUZIK {tetapan.muzik ? 'ON' : 'OFF'}</span>
    </button>
  )
}

export function BackButton({ onClick, label = 'KEMBALI' }: { onClick: () => void; label?: string }) {
  return (
    <GameButton warna="biru" kecil className="cl-back" ikon="⬅" onClick={onClick}>
      {label}
    </GameButton>
  )
}

/** Latar belakang tasik + kesan air beranimasi */
export function LakeBackground({
  fail,
  gelap = 0,
  air = true,
}: {
  fail: string
  gelap?: number
  air?: boolean
}) {
  return (
    <div className="cl-bg" aria-hidden>
      <div
        className="cl-bg__img"
        style={{ backgroundImage: `url(${gambar(fail)})` }}
      />
      {air && (
        <>
          <div className="cl-bg__kilau" />
          <div className="cl-bg__kilau cl-bg__kilau--2" />
          <div className="cl-bg__sparkles">
            {Array.from({ length: 14 }).map((_, i) => (
              <i
                key={i}
                style={{
                  left: `${(i * 37) % 100}%`,
                  top: `${60 + ((i * 23) % 36)}%`,
                  animationDelay: `${(i * 0.37) % 3}s`,
                }}
              />
            ))}
          </div>
        </>
      )}
      {gelap > 0 && <div className="cl-bg__gelap" style={{ opacity: gelap }} />}
    </div>
  )
}

export function Bubbles({ bil = 12 }: { bil?: number }) {
  return (
    <div className="cl-bubbles" aria-hidden>
      {Array.from({ length: bil }).map((_, i) => (
        <i
          key={i}
          style={{
            left: `${(i * 53) % 100}%`,
            width: `${0.6 + (i % 4) * 0.35}cqw`,
            animationDuration: `${6 + (i % 5) * 1.7}s`,
            animationDelay: `${(i * 0.9) % 7}s`,
          }}
        />
      ))}
    </div>
  )
}

export function Panel({
  children,
  className = '',
  tajuk,
}: {
  children: ReactNode
  className?: string
  tajuk?: string
}) {
  return (
    <div className={`cl-panel ${className}`}>
      {tajuk && <div className="cl-panel__reben">{tajuk}</div>}
      {children}
    </div>
  )
}
