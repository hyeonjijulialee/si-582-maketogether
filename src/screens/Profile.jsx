import React, { useState } from 'react'
import { useApp, Icon, Img, Back, BorrowButton, Dots, Tag, countLabel, TypeBadge, TypeCounts, TYPES, KINDS } from '../ui.jsx'
import { user, tools, videos, articles, libraries, byId } from '../data.js'

export function Profile() {
  const { go, library, toast } = useApp()
  const lib = byId(libraries, library)
  const rows = [
    ['local_library', 'My Library Location', lib ? lib.name : 'Not selected', () => go('library')],
    ['history', 'Recently Viewed', null, () => go('recent')],
    ['folder', 'Saved Folders', 'Tools, videos and articles', () => go('saved')],
    ['settings', 'Settings', null, () => toast('Settings are out of scope for this prototype')],
  ]
  return (
    <div className="pad">
      <h1 className="h1" style={{ marginTop: 10 }}>My Profile</h1>
      <div className="center" style={{ margin: '22px 0 26px' }}>
        <div className="avatar" style={{ width: 104, height: 104, fontSize: 38, margin: '0 auto' }}>{user.initials}</div>
        <p className="h3" style={{ marginTop: 14 }}>{user.name}</p>
        <p className="p4 faint">{user.email}</p>
      </div>
      <div className="list">
        {rows.map(([icon, label, sub, fn]) => (
          <button key={label} className="list-row" onClick={fn}>
            <Icon name={icon} className="blue" />
            <span className="grow"><span className="p4" style={{ display: 'block' }}>{label}</span>{sub && <span className="p6 faint">{sub}</span>}</span>
            <Icon name="chevron_right" />
          </button>
        ))}
      </div>
      <div className="list" style={{ marginTop: 16 }}>
        <button className="list-row" onClick={() => go('landing')}><Icon name="logout" className="blue" /><span className="p4 grow">Sign Out</span><Icon name="chevron_right" /></button>
      </div>
      <p className="p6 faint center" style={{ marginTop: 26 }}>MakeTogether · Student prototype</p>
      <div className="bottom-space" />
    </div>
  )
}

export function LibraryLocation({ query }) {
  const { library, setLibrary, replace } = useApp()
  const onboarding = !!query.onboarding
  const [zip, setZip] = useState('48104')
  const [shown, setShown] = useState(true)
  return (
    <div className="pad">
      {!onboarding && <Back label="Profile" />}
      <h1 className="h1" style={{ marginTop: onboarding ? 12 : 4 }}>Set Library Location</h1>
      <p className="p4 muted" style={{ marginTop: 4 }}>Enter your ZIP code to explore AADL branches.</p>
      <form className="row" style={{ marginTop: 18, gap: 10 }} onSubmit={(e) => { e.preventDefault(); setShown(zip.trim().length > 0) }}>
        <div className="input grow">
          <Icon name="location_on" />
          <input value={zip} onChange={(e) => setZip(e.target.value)} inputMode="numeric" placeholder="ZIP code" aria-label="ZIP code" />
          {zip && <button type="button" onClick={() => { setZip(''); setShown(false) }} aria-label="Clear"><Icon name="cancel" fill /></button>}
        </div>
        <button className="btn btn-primary" style={{ width: 104 }}>Search</button>
      </form>

      {shown && (
        <div className="stack" style={{ marginTop: 18, '--gap': '14px' }}>
          {libraries.map((l) => {
            const on = library === l.id
            return (
              <div key={l.id} className="card" style={{ padding: 12, outline: on ? '2px solid var(--blue)' : 'none', background: on ? 'var(--blue-tint)' : 'var(--surface)' }}>
                <Img src={l.img} icon="local_library" h={130} r={14} />
                <p className="h5" style={{ marginTop: 12 }}>{l.name}</p>
                <p className="p5 muted">{l.addr}</p>
                {on ? (
                  <div className="btn btn-sm" style={{ marginTop: 12, background: 'var(--surface)', color: 'var(--blue)' }}><Icon name="check_circle" fill />Selected</div>
                ) : (
                  <button className="btn btn-outline btn-sm" style={{ marginTop: 12 }} onClick={() => setLibrary(l.id)}>Select This Library</button>
                )}
              </div>
            )
          })}
        </div>
      )}
      <p className="p6 faint row" style={{ marginTop: 14, justifyContent: 'center' }}><Icon name="info" size={18} />Your preference does not confirm tool availability.</p>

      {onboarding ? (
        <div style={{ padding: '22px 0 40px' }}>
          <Dots at={2} />
          <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => replace('home')}>Continue</button>
          <p className="center" style={{ marginTop: 14 }}><button className="link" onClick={() => replace('home')}>Skip for now</button></p>
        </div>
      ) : <div className="bottom-space" />}
    </div>
  )
}

function RemoveBtn({ onClick }) {
  return <button className="icon-btn" style={{ width: 34, height: 34 }} onClick={onClick} aria-label="Remove from folder"><Icon name="bookmark_remove" size={22} className="faint" /></button>
}

const corner = { position: 'absolute', top: 8, left: 8 }

function ToolRow({ t, onRemove }) {
  const { go } = useApp()
  return (
    <div className="card row" style={{ padding: 12, gap: 14, alignItems: 'stretch' }}>
      <Img src={t.img} icon={t.icon} w={122} r={14} style={{ flex: 'none', minHeight: 150 }}><TypeBadge kind="tool" style={corner} /></Img>
      <div className="grow">
        <div className="row between" style={{ alignItems: 'flex-start' }}>
          <p className="h6">{t.name}</p>
          <RemoveBtn onClick={onRemove} />
        </div>
        <p className="p6 muted" style={{ marginTop: 2 }}>{t.short}</p>
        <div className="stack" style={{ '--gap': '8px', marginTop: 10 }}>
          <button className="btn btn-outline btn-xs" onClick={() => go(`tool/${t.id}`)}>View tool</button>
          <BorrowButton size="btn-xs" />
        </div>
      </div>
    </div>
  )
}

function MediaRow({ kind, img, icon, title, meta, onOpen, onRemove, children }) {
  return (
    <div className="card row" style={{ padding: 10, gap: 14 }}>
      <button onClick={onOpen} style={{ flex: 'none' }}>
        <Img src={img} icon={icon} w={120} h={84} r={12}>{children}<TypeBadge kind={kind} style={corner} /></Img>
      </button>
      <button className="grow" style={{ textAlign: 'left' }} onClick={onOpen}>
        <p className="h6">{title}</p>
        <p className="p6 faint">{meta}</p>
      </button>
      <RemoveBtn onClick={onRemove} />
    </div>
  )
}

function NewFolderForm({ onDone }) {
  const { createFolder, toast } = useApp()
  const [name, setName] = useState('')
  const submit = (e) => { e.preventDefault(); const n = name.trim(); if (!n) return; createFolder(n); toast(`Folder “${n}” created`); onDone() }
  return (
    <form className="row" style={{ gap: 10, marginTop: 14 }} onSubmit={submit}>
      <div className="input grow"><Icon name="create_new_folder" /><input autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="Folder name" aria-label="Folder name" /></div>
      <button className="btn btn-primary btn-sm" style={{ width: 96 }} disabled={!name.trim()}>Create</button>
    </form>
  )
}

const LOOKUP = { tool: tools, video: videos, article: articles }

// Saved: playlist-style folders that hold tools, videos and articles.
export function Folders() {
  const { folders, go } = useApp()
  const [creating, setCreating] = useState(false)
  const cover = (f) => KINDS.map((k) => f[k][0] && byId(LOOKUP[k], f[k][0])?.img).find(Boolean)
  return (
    <div className="pad">
      <Back label="Profile" />
      <div className="row between" style={{ marginTop: 4 }}>
        <h1 className="h1">Saved</h1>
        <button className="chip" style={{ background: 'var(--blue-30)' }} onClick={() => setCreating(!creating)}><Icon name={creating ? 'close' : 'add'} size={20} />{creating ? 'Cancel' : 'New folder'}</button>
      </div>
      <p className="p4 faint">{folders.length} folders</p>
      {creating && <NewFolderForm onDone={() => setCreating(false)} />}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16 }}>
        {folders.map((f) => (
          <button key={f.id} className="card" style={{ textAlign: 'left' }} onClick={() => go(`folder/${f.id}`)}>
            <Img src={cover(f)} icon="folder" h={112} />
            <div style={{ padding: '10px 12px 14px' }}>
              <p className="h6" style={{ marginBottom: 6 }}>{f.name}</p>
              <TypeCounts f={f} />
            </div>
          </button>
        ))}
      </div>
      <div className="bottom-space" />
    </div>
  )
}

export function FolderDetail({ arg }) {
  const { folders, toggleInFolder, deleteFolder, toast, go, back } = useApp()
  const f = folders.find((x) => x.id === arg)
  const [chip, setChip] = useState('all')
  if (!f) return <div className="pad"><Back /><p className="p4 faint" style={{ marginTop: 20 }}>This folder was deleted.</p></div>
  const remove = (kind, id, label) => { toggleInFolder(f.id, kind, id); toast(`Removed ${label} from “${f.name}”`) }
  const del = () => { if (confirm(`Delete “${f.name}”? Saved items stay in other folders.`)) { deleteFolder(f.id); back() } }
  const empty = KINDS.every((k) => !f[k].length)
  const shown = KINDS.filter((k) => f[k].length && (chip === 'all' || chip === k))
  const soon = () => toast('Full article view is out of scope for this prototype')

  const render = {
    tool: (id) => { const t = byId(tools, id); return <ToolRow key={id} t={t} onRemove={() => remove('tool', id, t.name)} /> },
    video: (id) => {
      const v = byId(videos, id)
      return (
        <MediaRow key={id} kind="video" img={v.img} icon="play_circle" title={v.title} meta={`${v.min} min · ${v.level}`}
          onOpen={() => go(`video/${id}`)} onRemove={() => remove('video', id, v.title)}>
          <span className="play" style={{ width: 32, height: 32 }}><Icon name="play_arrow" fill size={20} /></span>
          <span className="duration">{v.length}</span>
        </MediaRow>
      )
    },
    article: (id) => {
      const a = byId(articles, id)
      return <MediaRow key={id} kind="article" img={a.img} icon="article" title={a.title} meta={a.meta} onOpen={soon} onRemove={() => remove('article', id, a.title)} />
    },
  }

  return (
    <div className="pad">
      <Back label="Saved" />
      <div className="row" style={{ marginTop: 4, gap: 12 }}>
        <span className="section-icon" style={{ width: 52, height: 52, borderRadius: 14 }}><Icon name="folder" fill size={28} /></span>
        <div className="grow"><h1 className="h2">{f.name}</h1><p className="p5 faint">{countLabel(f)}</p></div>
        <button className="icon-btn" onClick={del} aria-label="Delete folder"><Icon name="delete" className="faint" /></button>
      </div>
      {!empty && (
        <div className="chips" style={{ marginTop: 16 }}>
          <button className={`chip ${chip === 'all' ? 'on' : ''}`} onClick={() => setChip('all')}>All</button>
          {KINDS.filter((k) => f[k].length).map((k) => (
            <button key={k} className={`chip ${chip === k ? 'on' : ''}`} onClick={() => setChip(k)}><Icon name={TYPES[k].icon} size={18} />{TYPES[k].plural} {f[k].length}</button>
          ))}
        </div>
      )}
      {shown.map((k) => (
        <section key={k} style={{ marginTop: 20 }}>
          <h2 className="h5 row" style={{ marginBottom: 10, gap: 8 }}><Icon name={TYPES[k].icon} className={`type-ink-${k}`} />{TYPES[k].plural}</h2>
          <div className="stack" style={{ '--gap': '10px' }}>{f[k].map(render[k])}</div>
        </section>
      ))}
      {empty && (
        <div className="center" style={{ padding: '48px 0' }}>
          <Icon name="folder_open" size={48} className="faint" />
          <p className="h5" style={{ marginTop: 10 }}>This folder is empty</p>
          <p className="p5 faint">Save tools (heart), videos and articles (bookmark) to add them here.</p>
          <button className="btn btn-primary btn-sm" style={{ width: 180, marginTop: 18 }} onClick={() => go('catalog')}>Browse Catalog</button>
        </div>
      )}
      <div className="bottom-space" />
    </div>
  )
}

export function RecentlyViewed() {
  const { recent, go } = useApp()
  const list = recent.map((id) => byId(tools, id)).filter(Boolean)
  return (
    <div className="pad">
      <Back />
      <h1 className="h1" style={{ marginTop: 4 }}>Recently Viewed</h1>
      <div className="stack" style={{ marginTop: 16, '--gap': '10px' }}>
        {list.map((t) => (
          <button key={t.id} className="card row" style={{ width: '100%', padding: 10, gap: 14, textAlign: 'left' }} onClick={() => go(`tool/${t.id}`)}>
            <Img src={t.img} icon={t.icon} w={84} h={84} r={12} style={{ flex: 'none' }} />
            <div className="grow"><p className="h6">{t.name}</p><p className="p6 faint">{t.brand}</p><div style={{ marginTop: 6 }}><Tag level>{t.level}</Tag></div></div>
            <Icon name="chevron_right" className="faint" />
          </button>
        ))}
      </div>
      <div className="bottom-space" />
    </div>
  )
}
