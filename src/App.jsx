import React, { useCallback, useEffect, useState } from 'react'
import { Landing, SignUp, LogIn, Forgot, Welcome } from './screens/Auth.jsx'
import { Home, Catalog, Search, Results } from './screens/Browse.jsx'
import { ToolDetail, VideoList, VideoPlayer } from './screens/Tool.jsx'
import { Profile, LibraryLocation, RecentlyViewed, Folders, FolderDetail } from './screens/Profile.jsx'
import { Ctx, Icon, TabBar, MenuDrawer, SaveToFolderSheet } from './ui.jsx'

// Hash routes: #/name/arg?query — keeps browser back + shareable links working.
const SCREENS = {
  landing: Landing, signup: SignUp, login: LogIn, forgot: Forgot, welcome: Welcome,
  home: Home, catalog: Catalog, search: Search, results: Results,
  tool: ToolDetail, videos: VideoList, video: VideoPlayer,
  profile: Profile, library: LibraryLocation, saved: Folders, recent: RecentlyViewed,
  folder: FolderDetail,
}
const AUTH = new Set(['landing', 'signup', 'login', 'forgot', 'welcome'])
const PROFILE_TAB = new Set(['profile', 'library', 'saved', 'recent', 'folder'])

function parse(hash) {
  const [path, qs = ''] = hash.replace(/^#\/?/, '').split('?')
  const [name, arg] = path.split('/')
  return { name: SCREENS[name] ? name : 'landing', arg, query: Object.fromEntries(new URLSearchParams(qs)), id: hash }
}

export default function App() {
  const [route, setRoute] = useState(() => parse(location.hash))
  // Saved items live in folders, like music playlists. A folder holds tools, videos and articles;
  // one item can be in several folders.
  const [folders, setFolders] = useState([
    { id: 'guitar-basics', name: 'Guitar Basics', tool: ['acoustic-guitar', 'guitar-amplifier'], video: ['notes', 'acoustic-tips'], article: ['roadblocks'] },
    { id: 'want-to-try', name: 'Want to Try', tool: ['mini-electric-guitar', 'sewing-machine'], video: [], article: [] },
    { id: 'watch-later', name: 'Watch Later', tool: [], video: ['tuning'], article: ['notes-simplified'] },
  ])
  const [saveFor, setSaveFor] = useState(null) // { kind: 'tool' | 'video', id } while the sheet is open
  const [recent, setRecent] = useState(['acoustic-guitar', 'sewing-machine'])
  const [library, setLibrary] = useState('downtown')
  const [toastMsg, setToastMsg] = useState(null)
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    const on = () => { setRoute(parse(location.hash)); setMenu(false); setSaveFor(null) }
    addEventListener('hashchange', on)
    return () => removeEventListener('hashchange', on)
  }, [])

  useEffect(() => {
    if (!toastMsg) return
    const t = setTimeout(() => setToastMsg(null), 2200)
    return () => clearTimeout(t)
  }, [toastMsg])

  const toggle = (setter) => (id) => setter((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n })

  const app = {
    route,
    go: useCallback((path) => { location.hash = '/' + path }, []),
    replace: useCallback((path) => { location.replace('#/' + path) }, []),
    back: useCallback(() => history.back(), []),
    folders,
    isSaved: (kind, id) => folders.some((f) => f[kind].includes(id)),
    toggleInFolder: (fid, kind, id) => setFolders((fs) => fs.map((f) => f.id !== fid ? f
      : { ...f, [kind]: f[kind].includes(id) ? f[kind].filter((x) => x !== id) : [...f[kind], id] })),
    createFolder: (name, item) => setFolders((fs) => [...fs, {
      id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString(36), name,
      tool: item?.kind === 'tool' ? [item.id] : [], video: item?.kind === 'video' ? [item.id] : [], article: item?.kind === 'article' ? [item.id] : [],
    }]),
    deleteFolder: (fid) => setFolders((fs) => fs.filter((f) => f.id !== fid)),
    openSaveSheet: (kind, id) => setSaveFor({ kind, id }),
    recent, view: (id) => setRecent((r) => [id, ...r.filter((x) => x !== id)].slice(0, 6)),
    library, setLibrary,
    toast: setToastMsg,
    openMenu: () => setMenu(true),
  }

  const Screen = SCREENS[route.name]
  const tab = route.name === 'catalog' ? 'catalog' : PROFILE_TAB.has(route.name) ? 'profile' : 'home'

  return (
    <Ctx.Provider value={app}>
      <div className="stage">
        <div className="device">
          <div className="statusbar">
            <span>9:41</span>
            <span className="icons"><Icon name="signal_cellular_alt" fill /><Icon name="wifi" fill /><Icon name="battery_full" fill /></span>
          </div>
          <div className="screen screen-enter" key={route.id}>
            <Screen {...route} />
          </div>
          {!AUTH.has(route.name) && !route.query.onboarding && <TabBar active={tab} />}
          {menu && <MenuDrawer onClose={() => setMenu(false)} />}
          {saveFor && <SaveToFolderSheet item={saveFor} onClose={() => setSaveFor(null)} />}
          {toastMsg && <div className="toast"><Icon name="info" />{toastMsg}</div>}
          <div className="home-indicator" />
        </div>
      </div>
    </Ctx.Provider>
  )
}
