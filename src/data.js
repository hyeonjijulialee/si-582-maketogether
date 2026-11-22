// Sample content for the click-through prototype. No backend.
// Images live in /public/img; missing files fall back to a styled placeholder.

export const user = { name: 'Jane Doe', first: 'Jane', email: 'jane.doe@example.com', initials: 'JD' }

export const categories = [
  { id: 'music', name: 'Music', icon: 'music_note', img: '/img/cat-music.jpg' },
  { id: '3d-printer', name: '3D Printer', icon: 'deployed_code', img: '/img/3d-printer.jpg' },
  { id: 'laser-cutter', name: 'Laser Cutter', icon: 'precision_manufacturing', img: '/img/laser-cutter.jpg' },
  { id: 'sewing', name: 'Sewing', icon: 'apparel', img: '/img/sewing-machine.jpg' },
  { id: 'board-games', name: 'Board Games', icon: 'casino', img: '/img/board-games.jpg' },
  { id: 'projector', name: 'Projector', icon: 'videocam', img: '/img/projector.jpg' },
  { id: 'electronics', name: 'Electronics', icon: 'computer', img: '/img/electronics.jpg' },
  { id: 'home-repair', name: 'Home Repair', icon: 'home_repair_service', img: '/img/home-repair.jpg' },
]

export const levels = ['Beginner', 'Intermediate', 'Advanced']

export const tools = [
  {
    id: 'acoustic-guitar', name: 'Acoustic Guitar', brand: 'Martin LX1 Little Martin', category: 'music', level: 'Beginner',
    short: 'For practicing chords, tuning, and learning songs.',
    desc: 'Acoustic guitar for practicing chords, tuning, and beginner-friendly songs.',
    note: { icon: 'close', text: 'No amplifier needed.' }, related: ['guitar-amplifier', 'mini-electric-guitar'],
    img: '/img/acoustic-guitar.jpg', icon: 'music_note',
  },
  {
    id: 'guitar-amplifier', name: 'Guitar Amplifier', brand: 'Fender Frontman 10G', category: 'music', level: 'Intermediate',
    short: 'Amplify your electric guitar and explore tone settings.',
    desc: 'Compact practice amp with gain, treble, and bass controls. Pairs with any electric guitar.',
    note: { icon: 'cable', text: 'Instrument cable included.' }, related: ['mini-electric-guitar', 'hss-electric-guitar'],
    img: '/img/guitar-amplifier.jpg', icon: 'speaker',
  },
  {
    id: 'mini-electric-guitar', name: 'Mini Electric Guitar', brand: 'Squier Mini Strat', category: 'music', level: 'Beginner',
    short: 'A compact electric guitar for practicing riffs and chords.',
    desc: 'Short-scale electric guitar that is easy to hold. Great for smaller hands and first riffs.',
    note: { icon: 'electric_bolt', text: 'Amplifier needed.' }, related: ['guitar-amplifier'],
    img: '/img/mini-electric-guitar.jpg', icon: 'music_note',
  },
  {
    id: 'hss-electric-guitar', name: 'HSS Electric Guitar', brand: 'Yamaha Pacifica 112V', category: 'music', level: 'Intermediate',
    short: 'Versatile pickups for clean and crunchy tones.',
    desc: 'Electric guitar with humbucker + single-coil pickups for a wide range of sounds.',
    note: { icon: 'electric_bolt', text: 'Amplifier needed.' }, related: ['guitar-amplifier'],
    img: '/img/hss-electric-guitar.jpg', icon: 'music_note',
  },
  {
    id: 'bass-guitar', name: 'Bass Guitar', brand: 'Ibanez GSR200', category: 'music', level: 'Advanced',
    short: 'Four-string bass for grooves and rhythm practice.',
    desc: 'Lightweight four-string bass with active EQ for rhythm and groove practice.',
    note: { icon: 'electric_bolt', text: 'Bass amplifier recommended.' }, related: ['guitar-amplifier'],
    img: '/img/bass-guitar.jpg', icon: 'music_note',
  },
  {
    id: 'les-paul-guitar', name: 'Les Paul Electric Guitar', brand: 'Epiphone Les Paul Standard', category: 'music', level: 'Intermediate',
    short: 'Warm, thick tone for rock and blues.',
    desc: 'Classic solid-body electric with dual humbuckers for warm rock and blues tones.',
    note: { icon: 'electric_bolt', text: 'Amplifier needed.' }, related: ['guitar-amplifier'],
    img: '/img/les-paul-guitar.jpg', icon: 'music_note',
  },
  {
    id: 'sewing-machine', name: 'Sewing Machine', brand: 'Brother CS7000X', category: 'sewing', level: 'Beginner',
    short: 'Mend, alter, and start creative projects.',
    desc: 'Computerized sewing machine with 70 built-in stitches and an automatic needle threader.',
    note: { icon: 'inventory_2', text: 'Bobbins and presser feet included.' }, related: [],
    img: '/img/sewing-machine.jpg', icon: 'apparel',
  },
  {
    id: '3d-printer', name: '3D Printer', brand: 'Prusa MINI+', category: '3d-printer', level: 'Intermediate',
    short: 'Turn digital models into real objects.',
    desc: 'Desktop FDM 3D printer for small prototypes, replacement parts, and models.',
    note: { icon: 'schedule', text: 'Bring your own PLA filament.' }, related: [],
    img: '/img/3d-printer.jpg', icon: 'deployed_code',
  },
  {
    id: 'laser-cutter', name: 'Laser Cutter', brand: 'Glowforge Basic', category: 'laser-cutter', level: 'Advanced',
    short: 'Cut and engrave wood, acrylic, and paper.',
    desc: 'Desktop laser cutter for engraving and precise cuts. Requires an in-person safety session.',
    note: { icon: 'shield', text: 'Safety training required.' }, related: [],
    img: '/img/laser-cutter.jpg', icon: 'precision_manufacturing',
  },
  {
    id: 'board-game-kit', name: 'Strategy Board Game Kit', brand: 'Library game collection', category: 'board-games', level: 'Beginner',
    short: 'A bundle of family-friendly strategy games.',
    desc: 'A rotating bundle of strategy games for 2–6 players, with quick-start rule cards.',
    note: { icon: 'groups', text: 'For 2–6 players.' }, related: [],
    img: '/img/board-games.jpg', icon: 'casino',
  },
  {
    id: 'projector', name: 'Portable Projector', brand: 'Epson EpiqVision Mini', category: 'projector', level: 'Beginner',
    short: 'Movie nights and presentations anywhere.',
    desc: 'Portable HD projector with built-in speaker and HDMI input.',
    note: { icon: 'cable', text: 'HDMI cable included.' }, related: [],
    img: '/img/projector.jpg', icon: 'videocam',
  },
]

export const videos = [
  { id: 'tuning', title: 'Tuning Guitar Tutorial', min: 5, length: '5:00', level: 'Beginner', tag: 'Music', tool: 'acoustic-guitar',
    desc: 'Get basic insights on tuning and adjusting a guitar to fit your needs.', img: '/img/video-tuning.jpg' },
  { id: 'notes', title: 'Learn Notes', min: 8, length: '8:00', level: 'Beginner', tag: 'Music', tool: 'acoustic-guitar',
    desc: 'Find every note on the fretboard with a simple pattern.', img: '/img/video-notes.jpg' },
  { id: 'acoustic-tips', title: 'Acoustic Guitar Tips', min: 5, length: '5:00', level: 'Beginner', tag: 'Music', tool: 'acoustic-guitar',
    desc: 'Posture, picking, and strumming habits that make practice easier.', img: '/img/video-acoustic-tips.jpg' },
  { id: 'tips-tricks', title: 'Guitar Tips + Tricks', min: 10, length: '10:00', level: 'Intermediate', tag: 'Music', tool: 'acoustic-guitar',
    desc: 'Capo tricks, alternate tunings, and cleaner chord changes.', img: '/img/video-tips-tricks.jpg' },
  { id: 'buzzing', title: 'Fixing Buzzing Strings', min: 6, length: '6:00', level: 'Beginner', tag: 'Music', tool: 'acoustic-guitar',
    desc: 'Find out why strings buzz and how to stop it.', img: '/img/video-buzzing.jpg' },
  { id: 'capo', title: 'Using a Capo', min: 4, length: '4:00', level: 'Beginner', tag: 'Music', tool: 'acoustic-guitar',
    desc: 'Change keys without learning new chord shapes.', img: '/img/video-capo.jpg' },
]

export const articles = [
  { id: 'roadblocks', title: 'Navigating Roadblocks', meta: 'Article · 4 min read', desc: 'What to do when sore fingers or tricky chords slow you down.', img: '/img/article-roadblocks.jpg' },
  { id: 'notes-simplified', title: 'Guitar Notes Simplified', meta: 'Article · 3 min read', desc: 'Twelve repeating pitches — A through G plus sharps and flats.', img: '/img/article-notes.jpg' },
  { id: 'string-care', title: 'Caring for Strings', meta: 'Article · 3 min read', desc: 'Wipe, stretch, and store strings so they last longer.', img: '/img/article-strings.jpg' },
]

export const steps = [
  { id: 'first-time', title: 'Common First-time Issues', icon: 'help' },
  { id: 'tips', title: 'Guitar Tips and Tricks', icon: 'lightbulb' },
  { id: 'strings', title: 'Common String Issues', icon: 'build' },
]

// Tool page tabs → which resources each tab surfaces
export const toolTabs = {
  'Getting Started': { videos: ['tuning', 'notes', 'acoustic-tips'], articles: ['roadblocks', 'notes-simplified'], steps: ['first-time', 'tips'] },
  'Common Issues': { videos: ['buzzing', 'tuning'], articles: ['string-care', 'roadblocks'], steps: ['strings', 'first-time'] },
  'Specific Functions': { videos: ['capo', 'tips-tricks'], articles: ['notes-simplified'], steps: ['tips', 'strings'] },
}

export const videoSections = [
  { title: 'First Steps', at: '0:10', desc: 'Hold the guitar and find the tuning pegs.' },
  { title: 'Tuning Guitar', at: '1:08', desc: 'Tune each string with a clip-on tuner.' },
  { title: 'Notes', at: '2:00', desc: 'Check the open-string notes E A D G B E.' },
  { title: 'Practice', at: '3:30', desc: 'Strum and fine-tune by ear.' },
]

export const transcript = [
  { at: '0:10', text: 'Start by resting the guitar on your right leg and finding the six tuning pegs.' },
  { at: '0:42', text: 'Clip the tuner on the headstock so it can pick up vibrations.' },
  { at: '1:08', text: 'The next step will be tuning up the strings to the specific notes, starting with the low E.' },
  { at: '1:40', text: 'Turn the peg slowly. Tighten to raise the pitch, loosen to lower it.' },
  { at: '2:00', text: 'Repeat for A, D, G, B, and high E, then strum all six strings.' },
]

export const guides = [
  { id: 'setup-sewing', title: 'Setting up a Sewing Machine', tool: 'sewing-machine', icon: 'apparel' },
  { id: 'setup-guitar', title: 'Guitar Set Up', tool: 'acoustic-guitar', icon: 'music_note' },
  { id: 'first-print', title: 'Your First 3D Print', tool: '3d-printer', icon: 'deployed_code' },
]

export const suggestions = ['Acoustic Guitar', 'Electric Guitar', 'Guitar Amplifier']
export const recentSearches = ['3D printer', 'Sewing machine']

export const libraries = [
  { id: 'downtown', name: 'Downtown Library', addr: '343 S. Fifth Ave., Ann Arbor', img: '/img/library-downtown.jpg' },
  { id: 'malletts', name: 'Malletts Creek Branch', addr: '3090 E. Eisenhower Pkwy., Ann Arbor', img: '/img/library-malletts.jpg' },
  { id: 'traverwood', name: 'Traverwood Branch', addr: '3333 Traverwood Dr., Ann Arbor', img: '/img/library-traverwood.jpg' },
]

export const byId = (list, id) => list.find((x) => x.id === id)
export const AADL_URL = 'https://aadl.org'
