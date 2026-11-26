import React, { useMemo, useState } from 'react'
import { useApp, Portal, Icon, Img, Back, SearchHeader, SectionHead, VideoCard, ToolGridCard, Tag } from '../ui.jsx'
import { categories, tools, videos, guides, suggestions, recentSearches, levels, byId } from '../data.js'

function CategoryTile({ c, onClick, h = 120 }) {
  return (
    <button className="card" onClick={onClick} style={{ position: 'relative', textAlign: 'left' }}>
      <Img src={c.img} icon={c.icon} h={h}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(15,22,45,0.72) 100%)' }} />
        <span style={{ position: 'absolute', left: 14, bottom: 12, color: '#fff' }} className="h6">{c.name}</span>
      </Img>
    </button>
  )
}

function CategoryCircle({ c, onClick }) {
  return (
    <button onClick={onClick} style={{ width: 84, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <span style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--surface)', boxShadow: 'var(--shadow)', display: 'grid', placeItems: 'center', color: 'var(--blue)' }}>
        <Icon name={c.icon} size={32} />
      </span>
      <span className="label" style={{ fontSize: 12, textAlign: 'center' }}>{c.name}</span>
    </button>
  )
}

function GuideCard({ g, onClick }) {
  const t = byId(tools, g.tool)
  return (
    <button className="card" style={{ width: 200, textAlign: 'left' }} onClick={onClick}>
      <Img src={t.img} icon={g.icon} h={104} />
      <div style={{ padding: '10px 14px 14px' }}>
        <p className="h6">{g.title}</p>
        <p className="p6 faint" style={{ marginTop: 2 }}>Step-by-step guide</p>
      </div>
    </button>
  )
}

export function Home() {
  const { go, profile } = useApp()
  const homeCats = ['3d-printer', 'laser-cutter', 'sewing', 'board-games', 'projector'].map((id) => byId(categories, id))
  return (
    <div>
      <div className="topbar" style={{ paddingTop: 4 }}>
        <div className="grow" style={{ paddingLeft: 8 }}>
          <p className="label blue">MakeTogether</p>
          <h1 className="h1">Hi, {profile.first}!</h1>
        </div>
      </div>
      <div className="pad">
        <p className="p4 muted" style={{ marginTop: -6 }}>What do you want to make today?</p>
        <button className="searchbar" style={{ width: '100%', marginTop: 14 }} onClick={() => go('search')}><Icon name="search" />Search for tools or guides</button>

        <h2 className="h4" style={{ margin: '26px 0 12px' }}>Tool Categories</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {homeCats.map((c) => <CategoryTile key={c.id} c={c} onClick={() => go(`results?cat=${c.id}`)} />)}
          <button className="card" onClick={() => go('catalog')} style={{ height: 120, display: 'grid', placeItems: 'center', border: 'none', boxShadow: 'none' }}>
            <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }} className="blue">
              <Icon name="apps" size={32} /><span className="h6">More</span>
            </span>
          </button>
        </div>

        <div style={{ marginTop: 28 }}>
          <SectionHead icon="smart_display" title="Continue Learning" onMore={() => go('videos/acoustic-guitar')} />
          <div className="hscroll">{videos.slice(0, 3).map((v) => <VideoCard key={v.id} v={v} onClick={() => go(`video/${v.id}`)} />)}</div>
        </div>
      </div>
      <div className="bottom-space" />
    </div>
  )
}

export function Catalog() {
  const { go, recent } = useApp()
  const [chip, setChip] = useState('All')
  const show = (s) => chip === 'All' || chip === s
  return (
    <div>
      <SearchHeader />
      <div className="pad"><h1 className="h1" style={{ margin: '6px 0 14px' }}>Catalog</h1></div>
      <div className="chips pad" style={{ paddingBottom: 4 }}>
        {['All', 'Guides', 'Tool Categories', 'Recently Viewed'].map((c) => (
          <button key={c} className={`chip ${chip === c ? 'on' : ''}`} onClick={() => setChip(c)}>{c}</button>
        ))}
      </div>
      <div className="pad">
        {show('Guides') && (
          <section style={{ marginTop: 22 }}>
            <SectionHead icon="description" title="Guides" onMore={() => go('results?q=')} />
            <div className="hscroll">{guides.map((g) => <GuideCard key={g.id} g={g} onClick={() => go(`tool/${g.tool}`)} />)}</div>
          </section>
        )}
        {show('Tool Categories') && (
          <section style={{ marginTop: 18 }}>
            <SectionHead icon="category" title="Tool Categories" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', rowGap: 18, justifyItems: 'center' }}>
              {categories.map((c) => <CategoryCircle key={c.id} c={c} onClick={() => go(`results?cat=${c.id}`)} />)}
            </div>
          </section>
        )}
        {show('Recently Viewed') && (
          <section style={{ marginTop: 26 }}>
            <SectionHead icon="history" title="Recently Viewed" onMore={() => go('recent')} />
            <div className="hscroll">
              {recent.map((id) => byId(tools, id)).filter(Boolean).map((t) => (
                <div key={t.id} style={{ width: 170 }}><ToolGridCard t={t} onClick={() => go(`tool/${t.id}`)} /></div>
              ))}
            </div>
          </section>
        )}
      </div>
      <div className="bottom-space" />
    </div>
  )
}

export function Search() {
  const { replace, back } = useApp()
  const [q, setQ] = useState('')
  const pool = useMemo(() => [...new Set([...suggestions, ...tools.map((t) => t.name)])], [])
  const matches = q.trim() ? pool.filter((s) => s.toLowerCase().includes(q.trim().toLowerCase())).slice(0, 6) : []
  const submit = (term) => replace(`results?q=${encodeURIComponent(term)}`)
  return (
    <div>
      <div className="topbar">
        <button className="icon-btn" onClick={back} aria-label="Back"><Icon name="arrow_back" /></button>
        <form className="searchbar" style={{ color: 'var(--ink)' }} onSubmit={(e) => { e.preventDefault(); q.trim() && submit(q.trim()) }}>
          <Icon name="search" className="faint" />
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tools, Guides, and More" />
          {q && <button type="button" onClick={() => setQ('')} aria-label="Clear"><Icon name="cancel" fill className="faint" /></button>}
        </form>
      </div>
      <div className="pad">
        {q.trim() ? (
          <>
            <h2 className="h5" style={{ margin: '14px 0 6px' }}>Suggestions</h2>
            {matches.length === 0 && <p className="p4 faint" style={{ padding: '12px 0' }}>No matches. Press enter to search “{q}”.</p>}
            {matches.map((s) => (
              <button key={s} className="row between" style={{ width: '100%', padding: '14px 0', borderBottom: '1px solid var(--line)' }} onClick={() => submit(s)}>
                <span className="row p4"><Icon name="search" className="faint" />{s}</span><Icon name="north_west" className="faint" />
              </button>
            ))}
          </>
        ) : (
          <>
            <h2 className="h5" style={{ margin: '14px 0 6px' }}>Recent Searches</h2>
            {recentSearches.map((s) => (
              <button key={s} className="row" style={{ width: '100%', padding: '12px 0' }} onClick={() => submit(s)}>
                <Icon name="schedule" className="faint" /><span className="p4">{s}</span>
              </button>
            ))}
            <h2 className="h5" style={{ margin: '18px 0 10px' }}>Try searching</h2>
            <div className="row" style={{ flexWrap: 'wrap' }}>
              {suggestions.map((s) => <button key={s} className="chip" onClick={() => submit(s)}>{s}</button>)}
            </div>
            <h2 className="h5" style={{ margin: '24px 0 14px' }}>Tool Categories</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', rowGap: 18, justifyItems: 'center' }}>
              {categories.slice(0, 4).map((c) => <CategoryCircle key={c.id} c={c} onClick={() => replace(`results?cat=${c.id}`)} />)}
            </div>
          </>
        )}
      </div>
      <div className="bottom-space" />
    </div>
  )
}

function FilterSheet({ init, onApply, onClose }) {
  const [cats, setCats] = useState(new Set(init.cats))
  const [lv, setLv] = useState(new Set(init.lv))
  const [more, setMore] = useState(false)
  const flip = (set, setter, v) => { const n = new Set(set); n.has(v) ? n.delete(v) : n.add(v); setter(n) }
  return (
    <Portal>
      <div className="scrim" onClick={onClose} />
      <div className="sheet">
        <div className="grabber" />
        <div className="row between pad" style={{ padding: '6px 20px 10px' }}>
          <h2 className="h3 row"><Icon name="tune" className="blue" />Filter</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close"><Icon name="close" /></button>
        </div>
        <div style={{ overflowY: 'auto', padding: '0 20px' }}>
          <h3 className="h6" style={{ margin: '6px 0 12px' }}>Category</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {(more ? categories : categories.slice(0, 4)).map((c) => {
              const on = cats.has(c.id)
              return (
                <button key={c.id} onClick={() => flip(cats, setCats, c.id)} style={{
                  height: 84, borderRadius: 16, border: `1.5px solid ${on ? 'var(--blue)' : 'var(--line)'}`,
                  background: on ? 'var(--blue-tint)' : 'var(--surface)', color: on ? 'var(--blue)' : 'var(--ink)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
                }}>
                  <Icon name={c.icon} size={28} /><span className="label" style={{ fontSize: 11 }}>{c.name}</span>
                </button>
              )
            })}
          </div>
          <button className="see-all" style={{ marginTop: 10 }} onClick={() => setMore(!more)}>{more ? 'See less' : 'See more'}<Icon name={more ? 'expand_less' : 'expand_more'} /></button>
          <h3 className="h6" style={{ margin: '20px 0 6px' }}>Experience Level</h3>
          {levels.map((l) => (
            <button key={l} className="row" style={{ padding: '10px 0', width: '100%', gap: 12 }} onClick={() => flip(lv, setLv, l)}>
              <span className={`checkbox ${lv.has(l) ? 'on' : ''}`}>{lv.has(l) && <Icon name="check" />}</span><span className="p4">{l}</span>
            </button>
          ))}
        </div>
        <div className="row" style={{ padding: '16px 20px 34px', gap: 12 }}>
          <button className="btn btn-outline btn-sm" style={{ width: 120 }} onClick={() => { setCats(new Set()); setLv(new Set()) }}>Clear</button>
          <button className="btn btn-primary btn-sm grow" onClick={() => onApply([...cats], [...lv])}>Apply</button>
        </div>
      </div>
    </Portal>
  )
}

const LEVEL_ORDER = Object.fromEntries(levels.map((l, i) => [l, i]))

export function Results({ query }) {
  const { go, replace } = useApp()
  const q = query.q || ''
  const cats = query.cat ? query.cat.split(',') : []
  const lv = query.lv ? query.lv.split(',') : []
  const [sheet, setSheet] = useState(false)
  const [sort, setSort] = useState('Relevance')

  let list = tools.filter((t) => {
    const words = q.toLowerCase().split(/\s+/).filter((w) => w && w !== 'machine')
    const hay = `${t.name} ${t.brand} ${t.category}`.toLowerCase()
    return (!words.length || words.some((w) => hay.includes(w))) && (!cats.length || cats.includes(t.category)) && (!lv.length || lv.includes(t.level))
  })
  if (sort === 'A–Z') list = [...list].sort((a, b) => a.name.localeCompare(b.name))
  if (sort === 'Level') list = [...list].sort((a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level])

  const nFilters = cats.length + lv.length
  const apply = (c, l) => {
    const p = new URLSearchParams()
    if (q) p.set('q', q)
    if (c.length) p.set('cat', c.join(','))
    if (l.length) p.set('lv', l.join(','))
    setSheet(false)
    replace(`results?${p}`)
  }
  const title = q ? `“${q}”` : cats.length === 1 ? byId(categories, cats[0]).name : 'Results'

  return (
    <div>
      <SearchHeader back />
      <div className="pad">
        <div className="row" style={{ marginTop: 4 }}>
          <button className="chip" style={nFilters ? { background: 'var(--blue)', color: '#fff' } : undefined} onClick={() => setSheet(true)}>
            <Icon name="tune" size={20} />Filter
            {nFilters > 0 && <span style={{ background: '#fff', color: 'var(--blue)', borderRadius: 10, minWidth: 20, height: 20, display: 'grid', placeItems: 'center', fontSize: 12 }}>{nFilters}</span>}
          </button>
          {lv.map((l) => <Tag key={l} level>{l}</Tag>)}
        </div>
        <div className="row between" style={{ margin: '18px 0 14px' }}>
          <h1 className="h2">{title} <span className="p4 faint">({list.length})</span></h1>
          <label className="chip" style={{ position: 'relative' }}>
            Sort by<Icon name="expand_more" size={20} />
            <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ position: 'absolute', inset: 0, opacity: 0 }} aria-label="Sort by">
              {['Relevance', 'A–Z', 'Level'].map((s) => <option key={s}>{s}</option>)}
            </select>
          </label>
        </div>
        {list.length ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {list.map((t) => <ToolGridCard key={t.id} t={t} onClick={() => go(`tool/${t.id}`)} />)}
          </div>
        ) : (
          <div className="center" style={{ padding: '48px 12px' }}>
            <Icon name="search_off" size={48} className="faint" />
            <p className="h5" style={{ marginTop: 12 }}>No tools found</p>
            <p className="p5 faint" style={{ marginTop: 4 }}>Try another keyword or clear your filters.</p>
            <button className="btn btn-outline btn-sm" style={{ width: 180, marginTop: 18 }} onClick={() => apply([], [])}>Clear filters</button>
          </div>
        )}
      </div>
      <div className="bottom-space" />
      {sheet && <FilterSheet init={{ cats, lv }} onApply={apply} onClose={() => setSheet(false)} />}
    </div>
  )
}
