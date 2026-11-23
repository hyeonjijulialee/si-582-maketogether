import React, { useEffect, useState } from 'react'
import { useApp, Icon, Img, Heart, Tag, BorrowButton, SectionHead, VideoCard, SearchHeader } from '../ui.jsx'
import { tools, categories, videos, articles, steps, toolTabs, videoSections, transcript, byId } from '../data.js'

const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
const toSec = (t) => { const [m, s] = t.split(':').map(Number); return m * 60 + s }

function ArticleCard({ a, onClick }) {
  // div (not button): it contains the save button
  return (
    <div className="card row" role="button" tabIndex={0} style={{ width: 300, padding: 10, gap: 12, textAlign: 'left', alignItems: 'stretch', cursor: 'pointer' }}
      onClick={onClick} onKeyDown={(e) => e.key === 'Enter' && onClick()}>
      <Img src={a.img} icon="article" w={96} h={96} r={14} style={{ flex: 'none' }} />
      <div className="grow" style={{ padding: '4px 0' }}>
        <div className="row between" style={{ alignItems: 'flex-start' }}>
          <p className="h6">{a.title}</p>
          <Heart id={a.id} kind="article" className="static-heart sm" />
        </div>
        <p className="p6 muted" style={{ marginTop: 4 }}>{a.desc}</p>
        <p className="p6 faint" style={{ marginTop: 6 }}>{a.meta}</p>
      </div>
    </div>
  )
}

function StepTile({ s, onClick }) {
  return (
    <button className="card" style={{ width: 132, padding: '18px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }} onClick={onClick}>
      <span className="section-icon" style={{ width: 48, height: 48 }}><Icon name={s.icon} size={26} /></span>
      <span className="label center" style={{ fontSize: 13, lineHeight: '18px' }}>{s.title}</span>
    </button>
  )
}

export function ToolDetail({ arg }) {
  const { go, back, view, toast } = useApp()
  const t = byId(tools, arg) || tools[0]
  const cat = byId(categories, t.category)
  const [tab, setTab] = useState('Getting Started')
  const [chip, setChip] = useState('All')
  useEffect(() => view(t.id), [t.id])
  const res = toolTabs[tab]
  const show = (k) => chip === 'All' || chip === k
  const soon = () => toast('Full article view is out of scope for this prototype')

  return (
    <div>
      <Img src={t.img} icon={t.icon} h={300}>
        <button className="icon-btn glass" style={{ position: 'absolute', top: 12, left: 16 }} onClick={back} aria-label="Back"><Icon name="arrow_back" /></button>
        <Heart id={t.id} className="" />
      </Img>
      <div className="pad" style={{ paddingTop: 20 }}>
        <p className="label blue">{cat.name}</p>
        <h1 className="h1">{t.name}</h1>
        <p className="p4 muted">{t.brand}</p>
        <div className="row" style={{ marginTop: 12, flexWrap: 'wrap' }}>
          <Tag level icon="signal_cellular_alt">{t.level}</Tag><Tag icon={cat.icon}>{cat.name}</Tag>
        </div>
        <p className="p4" style={{ marginTop: 14 }}>{t.desc}</p>
        <div className="row between" style={{ marginTop: 14, flexWrap: 'wrap', gap: 10 }}>
          <span className="tag" style={{ background: 'var(--surface)', border: '1px solid var(--line)', height: 32 }}><Icon name={t.note.icon} />{t.note.text}</span>
          <button className="see-all" onClick={() => go(`results?cat=${t.category}`)}>View suggested tools<Icon name="chevron_right" /></button>
        </div>
        <div style={{ marginTop: 20 }}><BorrowButton note="Opens aadl.org to check availability and borrowing requirements." /></div>
      </div>

      <div style={{ marginTop: 24, background: 'var(--surface)', borderTop: '1px solid var(--line)' }}>
        <div className="tabs">{Object.keys(toolTabs).map((k) => <button key={k} className={`tab ${tab === k ? 'on' : ''}`} onClick={() => setTab(k)}>{k}</button>)}</div>
      </div>
      <div className="chips pad" style={{ padding: '16px 24px 4px' }}>
        {['All', 'Videos', 'Step-by-Step', 'Articles'].map((c) => <button key={c} className={`chip ${chip === c ? 'on' : ''}`} onClick={() => setChip(c)}>{c}</button>)}
      </div>
      <div className="pad">
        {show('Videos') && (
          <section style={{ marginTop: 18 }}>
            <SectionHead icon="smart_display" title="Videos" onMore={() => go(`videos/${t.id}`)} />
            <div className="hscroll">{res.videos.map((id) => byId(videos, id)).map((v) => <VideoCard key={v.id} v={v} w={220} onClick={() => go(`video/${v.id}`)} />)}</div>
          </section>
        )}
        {show('Articles') && (
          <section style={{ marginTop: 10 }}>
            <SectionHead icon="article" title="Articles" onMore={soon} />
            <div className="hscroll">{res.articles.map((id) => byId(articles, id)).map((a) => <ArticleCard key={a.id} a={a} onClick={soon} />)}</div>
          </section>
        )}
        {show('Step-by-Step') && (
          <section style={{ marginTop: 10 }}>
            <SectionHead icon="menu_book" title="Step-by-Step" onMore={soon} />
            <div className="hscroll">{res.steps.map((id) => byId(steps, id)).map((s) => <StepTile key={s.id} s={s} onClick={soon} />)}</div>
          </section>
        )}
      </div>
      <div className="bottom-space" />
    </div>
  )
}

export function VideoList({ arg }) {
  const { go } = useApp()
  const t = byId(tools, arg) || tools[0]
  const [sort, setSort] = useState('Recommended')
  let list = videos.filter((v) => v.tool === t.id)
  if (sort === 'Shortest') list = [...list].sort((a, b) => a.min - b.min)
  return (
    <div>
      <SearchHeader back />
      <div className="pad">
        <div className="row between" style={{ margin: '6px 0 16px' }}>
          <h1 className="h2 row"><Icon name="smart_display" className="blue" />Videos <span className="p4 faint">({list.length})</span></h1>
          <label className="chip" style={{ position: 'relative' }}>
            Sort by<Icon name="expand_more" size={20} />
            <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ position: 'absolute', inset: 0, opacity: 0 }} aria-label="Sort by">
              {['Recommended', 'Shortest'].map((s) => <option key={s}>{s}</option>)}
            </select>
          </label>
        </div>
        <div className="stack" style={{ '--gap': '12px' }}>
          {list.map((v) => (
            <button key={v.id} className="card row" style={{ width: '100%', padding: 10, gap: 14, textAlign: 'left', alignItems: 'stretch' }} onClick={() => go(`video/${v.id}`)}>
              <Img src={v.img} icon="play_circle" w={132} h={100} r={14} style={{ flex: 'none' }}>
                <span className="play" style={{ width: 38, height: 38 }}><Icon name="play_arrow" fill size={24} /></span>
                <span className="duration">{v.min} min</span>
              </Img>
              <div className="grow" style={{ padding: '2px 0' }}>
                <p className="h6">{v.title}</p>
                <p className="p6 muted" style={{ marginTop: 4 }}>{v.desc}</p>
                <div className="row" style={{ marginTop: 8, gap: 6 }}><Tag level>{v.level}</Tag><Tag>{v.tag}</Tag></div>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="bottom-space" />
    </div>
  )
}

export function VideoPlayer({ arg }) {
  const v = byId(videos, arg) || videos[0]
  const total = toSec(v.length)
  const [pos, setPos] = useState(68) // 1:08 like the wireframe
  const [playing, setPlaying] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => setPos((p) => (p + 1 >= total ? (setPlaying(false), total) : p + 1)), 1000)
    return () => clearInterval(id)
  }, [playing, total])

  const current = [...transcript].reverse().find((l) => toSec(l.at) <= pos) || transcript[0]
  const seek = (e) => { const r = e.currentTarget.getBoundingClientRect(); setPos(Math.round(((e.clientX - r.left) / r.width) * total)) }

  return (
    <div>
      <SearchHeader back />
      <div className="pad">
        <Img src={v.img} icon="play_circle" h={210} r={20} style={{ marginTop: 6, background: '#1c2033' }}>
          <button className="play" onClick={() => setPlaying(!playing)} aria-label={playing ? 'Pause' : 'Play'}><Icon name={playing ? 'pause' : 'play_arrow'} fill /></button>
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '22px 14px 10px', background: 'linear-gradient(transparent, rgba(0,0,0,0.6))', color: '#fff' }}>
            <div className="row" style={{ gap: 10 }}>
              <span style={{ font: '600 13px var(--font-head)' }}>{fmt(pos)} / {v.length}</span>
              <div className="grow" onClick={seek} style={{ height: 18, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.35)', width: '100%', position: 'relative' }}>
                  <div style={{ height: '100%', borderRadius: 2, background: '#fff', width: `${(pos / total) * 100}%` }} />
                  <div style={{ position: 'absolute', top: -5, left: `calc(${(pos / total) * 100}% - 7px)`, width: 14, height: 14, borderRadius: '50%', background: '#fff' }} />
                </div>
              </div>
              <Icon name="volume_up" size={20} /><Icon name="fullscreen" size={20} />
            </div>
          </div>
        </Img>

        <div className="row between" style={{ marginTop: 18, alignItems: 'flex-start' }}>
          <div className="grow">
            <h1 className="h2">{v.title}</h1>
            <div className="row" style={{ marginTop: 8, gap: 6 }}><Tag level>{v.level}</Tag><Tag icon="schedule">{v.min} min</Tag></div>
          </div>
          <Heart id={v.id} kind="video" className="static-heart" />
        </div>

        <h2 className="h5" style={{ margin: '22px 0 10px' }}>Transcript</h2>
        <div className="card" style={{ padding: '6px 16px' }}>
          {(expanded ? transcript : [current]).map((l) => (
            <button key={l.at} className="row" style={{ alignItems: 'flex-start', gap: 14, padding: '10px 0', width: '100%', textAlign: 'left', opacity: expanded && l !== current ? 0.6 : 1 }} onClick={() => setPos(toSec(l.at))}>
              <span className="label blue" style={{ minWidth: 34 }}>{l.at}</span><span className="p5">{l.text}</span>
            </button>
          ))}
        </div>
        <button className="see-all" style={{ marginTop: 8 }} onClick={() => setExpanded(!expanded)}>{expanded ? 'Collapse Transcript' : 'Extend Transcript'}<Icon name={expanded ? 'expand_less' : 'expand_more'} /></button>

        <h2 className="h5" style={{ margin: '20px 0 10px' }}>Sections</h2>
        <div className="stack" style={{ '--gap': '10px' }}>
          {videoSections.map((s, i) => {
            const on = pos >= toSec(s.at) && (i === videoSections.length - 1 || pos < toSec(videoSections[i + 1].at))
            return (
              <button key={s.title} className="card row" style={{ width: '100%', padding: 10, gap: 14, textAlign: 'left', outline: on ? '2px solid var(--blue)' : 'none' }} onClick={() => setPos(toSec(s.at))}>
                <Img src={v.img} icon="movie" w={96} h={64} r={10} style={{ flex: 'none' }} />
                <div className="grow"><p className="h6">{s.title}</p><p className="p6 faint">{s.desc}</p></div>
                <span className="label faint">{s.at}</span>
              </button>
            )
          })}
        </div>
      </div>
      <div className="bottom-space" />
    </div>
  )
}
