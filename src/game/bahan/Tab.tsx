import { useState, type ReactNode } from 'react'
import { audio } from '../audio'

export function Tab({ tab }: { tab: { tajuk: string; isi: ReactNode }[] }) {
  const [aktif, setAktif] = useState(0)
  return (
    <div className="cl-tab">
      <div className="cl-tab__senarai" role="tablist">
        {tab.map((t, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={aktif === i}
            className={aktif === i ? 'is-aktif' : ''}
            onClick={() => {
              audio.sfx('klik')
              setAktif(i)
            }}
          >
            {t.tajuk}
          </button>
        ))}
      </div>
      <div className="cl-tab__isi" role="tabpanel" key={aktif}>
        {tab[aktif].isi}
      </div>
    </div>
  )
}
