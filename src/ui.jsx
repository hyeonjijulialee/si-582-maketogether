import React, { createContext, useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import { AADL_URL } from './data.js'

export const Ctx = createContext(null)
export const useApp = () => useContext(Ctx)

// Overlays render into the device frame so they don't scroll with the screen.
export const Portal = ({ children }) => createPortal(children, document.querySelector('.device'))

export const Icon = ({ name, fill, size, className = '', style }) => (
  <span className={`ms ${fill ? 'fill' : ''} ${className}`} style={size ? { fontSize: size, ...style } : style} aria-hidden="true">{name}</span>
)

// Photo slot: shows /public/img file when present, otherwise a cream placeholder with an icon.
export function Img({ src, icon = 'image', h, w, r, className = '', children, style }) {
  const [ok, setOk] = useState(true)
  return (
    <div className={`img ${className}`} style={{ height: h, width: w, borderRadius: r, ...style }}>
      {src && ok ? <img src={src} alt="" onError={() => setOk(false)} /> : <div className="ph"><Icon name={icon} /></div>}
      {children}
    </div>
  )
}

export function Heart({ id, kind = 'tool', className = '' }) {
  const { isSaved, openSaveSheet } = useApp()
  const on = isSaved(kind, id)
  const click = (e) => { e.stopPropagation(); openSaveSheet(kind, id) }
  const icon = kind === 'tool' ? 'favorite' : on ? 'bookmark_added' : 'bookmark_add'
  return (
    <button className={`heart ${on ? 'on' : ''} ${className}`} onClick={click} aria-label="Save to folder">
      <Icon name={icon} fill={on} />
    </button>
  )
}

// Saved item types — one icon/label per type so folders show what each item is.
export const TYPES = {
  tool: { label: 'Tool', plural: 'Tools', icon: 'handyman' },
  video: { label: 'Video', plural: 'Videos', icon: 'smart_display' },
  article: { label: 'Article', plural: 'Articles', icon: 'article' },
}
export const KINDS = Object.keys(TYPES)

export const TypeBadge = ({ kind, style }) => (
  <span className={`type-badge type-${kind}`} style={style}><Icon name={TYPES[kind].icon} fill />{TYPES[kind].label}</span>
)

// "2 tools · 1 video · 1 article"
export const countLabel = (f) => KINDS.filter((k) => f[k].length)
  .map((k) => `${f[k].length} ${(f[k].length === 1 ? TYPES[k].label : TYPES[k].plural).toLowerCase()}`).join(' · ') || 'Empty'

// Icon + count per type, e.g. [🔧2] [▶2] [📄1]
export const TypeCounts = ({ f }) => (
  <span className="row" style={{ gap: 10, flexWrap: 'wrap' }}>
    {KINDS.filter((k) => f[k].length).map((k) => (
      <span key={k} className="row p6 muted" style={{ gap: 3 }} title={TYPES[k].plural}><Icon name={TYPES[k].icon} size={16} className={`type-ink-${k}`} />{f[k].length}</span>
    ))}
    {!KINDS.some((k) => f[k].length) && <span className="p6 faint">Empty</span>}
  </span>
)

// "Save to folder" bottom sheet — check any number of folders or create a new one.
export function SaveToFolderSheet({ item, onClose }) {
  const { folders, toggleInFolder, createFolder, toast, go } = useApp()
  const { kind, id } = item
  const [creating, setCreating] = useState(false)
  const [name, setName] = useState('')
  const create = (e) => {
    e.preventDefault()
    const n = name.trim()
    if (!n) return
    createFolder(n, item)
    toast(`Saved to “${n}”`)
    setName(''); setCreating(false)
  }
  const flip = (f) => {
    const had = f[kind].includes(id)
    toggleInFolder(f.id, kind, id)
    toast(had ? `Removed from “${f.name}”` : `Saved to “${f.name}”`)
  }
  return (
    <Portal>
      <div className="scrim" onClick={onClose} />
      <div className="sheet">
        <div className="grabber" />
        <div className="row between" style={{ padding: '6px 20px 6px' }}>
          <div><h2 className="h3">Save to folder</h2><TypeBadge kind={kind} style={{ marginTop: 6 }} /></div>
          <button className="icon-btn" onClick={onClose} aria-label="Close"><Icon name="close" /></button>
        </div>
        <div style={{ overflowY: 'auto', padding: '4px 20px 0' }}>
          {folders.map((f) => {
            const on = f[kind].includes(id)
            return (
              <button key={f.id} className="row" style={{ width: '100%', padding: '12px 0', gap: 14, textAlign: 'left' }} onClick={() => flip(f)}>
                <span className="section-icon" style={{ width: 44, height: 44, borderRadius: 12 }}><Icon name="folder" fill /></span>
                <span className="grow"><span className="h6" style={{ display: 'block', marginBottom: 2 }}>{f.name}</span><TypeCounts f={f} /></span>
                <span className={`checkbox ${on ? 'on' : ''}`}>{on && <Icon name="check" />}</span>
              </button>
            )
          })}
          {creating ? (
            <form className="row" style={{ gap: 10, padding: '12px 0' }} onSubmit={create}>
              <div className="input grow"><Icon name="create_new_folder" /><input autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="Folder name" aria-label="Folder name" /></div>
              <button className="btn btn-primary btn-sm" style={{ width: 96 }} disabled={!name.trim()}>Create</button>
            </form>
          ) : (
            <button className="row blue" style={{ width: '100%', padding: '12px 0', gap: 14 }} onClick={() => setCreating(true)}>
              <span className="section-icon" style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--blue-30)' }}><Icon name="add" /></span>
              <span className="h6">New folder</span>
            </button>
          )}
        </div>
        <div className="row" style={{ padding: '14px 20px 34px', gap: 12 }}>
          <button className="btn btn-outline btn-sm" style={{ width: 150 }} onClick={() => go('saved')}>View folders</button>
          <button className="btn btn-primary btn-sm grow" onClick={onClose}>Done</button>
        </div>
      </div>
    </Portal>
  )
}

export const Back = ({ label = 'Back', onClick }) => {
  const { back } = useApp()
  return <button className="back" onClick={onClick || back}><Icon name="arrow_back_ios_new" size={20} />{label}</button>
}

// Search pill + menu — shared header from the base hi-fi wireframes
export function SearchHeader({ back = false }) {
  const { go, openMenu } = useApp()
  return (
    <>
      <div className="topbar">
        <button className="searchbar" onClick={() => go('search')}><Icon name="search" />Search for tools or guides</button>
        <button className="icon-btn" onClick={openMenu} aria-label="Menu"><Icon name="menu" size={28} /></button>
      </div>
      {back && <div className="pad"><Back /></div>}
    </>
  )
}

export function TabBar({ active }) {
  const { go } = useApp()
  const tabs = [['home', 'home', 'Home'], ['catalog', 'menu_book', 'Catalog'], ['profile', 'person', 'Profile']]
  return (
    <nav className="tabbar">
      {tabs.map(([id, icon, label]) => (
        <button key={id} className={active === id ? 'on' : ''} onClick={() => go(id)}>
          <Icon name={icon} fill={active === id} />{label}
        </button>
      ))}
    </nav>
  )
}

export function MenuDrawer({ onClose }) {
  const { go, toast } = useApp()
  const items = [
    ['home', 'Home', () => go('home')],
    ['menu_book', 'Catalog', () => go('catalog')],
    ['folder', 'Saved Folders', () => go('saved')],
    ['local_library', 'My Library Location', () => go('library')],
    ['help', 'Help', () => { onClose(); toast('Help center is out of scope for this prototype') }],
    ['logout', 'Sign Out', () => go('landing')],
  ]
  return (
    <>
      <div className="scrim" onClick={onClose} />
      <aside className="drawer">
        <button className="icon-btn" style={{ position: 'absolute', top: 58, right: 12 }} onClick={onClose} aria-label="Close"><Icon name="close" /></button>
        <img src="/logo.svg" width="48" height="48" alt="" style={{ borderRadius: 14 }} />
        <p className="h4" style={{ margin: '12px 0 20px' }}>MakeTogether</p>
        <div className="list">
          {items.map(([icon, label, fn]) => (
            <button key={label} className="list-row" onClick={fn}><Icon name={icon} className="blue" /><span className="p4 grow">{label}</span></button>
          ))}
        </div>
      </aside>
    </>
  )
}

export const Tag = ({ children, level, icon }) => (
  <span className={`tag ${level ? 'level' : ''}`}>{icon && <Icon name={icon} />}{children}</span>
)

export function BorrowButton({ size = '', note = 'Opens aadl.org' }) {
  return (
    <div>
      <a className={`btn btn-primary ${size}`} href={AADL_URL} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
        Borrow from Library <Icon name="arrow_outward" size={size ? 18 : 20} />
      </a>
      {note && <p className="btn-note">{note}</p>}
    </div>
  )
}

export function SectionHead({ icon, title, onMore, h = 'h5' }) {
  return (
    <div className="section-head">
      <div className="title">
        {icon && <span className="section-icon"><Icon name={icon} /></span>}
        <h3 className={h}>{title}</h3>
      </div>
      {onMore && <button className="see-all" onClick={onMore}>See all<Icon name="chevron_right" /></button>}
    </div>
  )
}

export function Field({ label, icon, type = 'text', placeholder, value, onChange, trailing }) {
  const [show, setShow] = useState(false)
  const isPw = type === 'password'
  return (
    <div className="field">
      <label>{label}</label>
      <div className="input">
        <Icon name={icon} />
        <input type={isPw && !show ? 'password' : isPw ? 'text' : type} placeholder={placeholder} value={value} onChange={(e) => onChange?.(e.target.value)} />
        {isPw && <button onClick={() => setShow(!show)} aria-label="Toggle password"><Icon name={show ? 'visibility' : 'visibility_off'} /></button>}
        {trailing}
      </div>
    </div>
  )
}

export const Dots = ({ n = 3, at }) => <div className="dots">{Array.from({ length: n }, (_, i) => <i key={i} className={i === at ? 'on' : ''} />)}</div>

export function VideoCard({ v, w = 240, onClick }) {
  return (
    <button className="card" style={{ width: w, textAlign: 'left' }} onClick={onClick}>
      <Img src={v.img} icon="play_circle" h={Math.round(w * 0.56)}>
        <span className="play"><Icon name="play_arrow" fill /></span>
        <span className="duration">{v.length}</span>
      </Img>
      <div style={{ padding: '12px 14px 14px' }}>
        <p className="h6">{v.title}</p>
        <p className="p6 faint" style={{ marginTop: 2 }}>{v.min} min · {v.level}</p>
      </div>
    </button>
  )
}

export function ToolGridCard({ t, onClick }) {
  return (
    // div (not button): it contains the Heart button, and buttons can't nest
    <div className="card" role="button" tabIndex={0} style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
      onClick={onClick} onKeyDown={(e) => e.key === 'Enter' && onClick()}>
      <Img src={t.img} icon={t.icon} h={130}><Heart id={t.id} /></Img>
      <div style={{ padding: '12px 12px 14px' }}>
        <p className="h6">{t.name}</p>
        <div className="row" style={{ marginTop: 8, flexWrap: 'wrap', gap: 6 }}>
          <Tag level>{t.level}</Tag>
        </div>
      </div>
    </div>
  )
}
