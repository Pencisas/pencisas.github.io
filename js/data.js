// All portfolio content lives here. To swap a video, change its `src` / `poster`.
const G = 'assets/games/';
const T = 'assets/3d/';
const V = 'assets/video/';

export const PROFILE = {
  name: 'Pao Encisa',
  email: 'paomonggi.dev@gmail.com',
  location: 'Marikina, Philippines',
  about:
    'Computer Science graduate with 3+ years across software development, automation, 3D modeling and digital content. I build Roblox games end to end, model game-ready assets in Blender, and produce AI videos from script to final cut.',
  availability: '40+ hours a week · starts within 1 week',
};

/* ------------------------------------------------------------------ TECH */
export const FEATURED_GAME = {
  name: 'Anime Ink Battle!',
  studio: 'MonPao Studio',
  url: 'https://www.roblox.com/games/116442407292822/Anime-Ink-Battle',
  icon: G + '10771468832-icon.webp',
  video: V + 'anime-ink-battle.mp4',
  poster: V + 'anime-ink-battle.webp',
  blurb:
    'Tiny ink-doodle anime heroes march into battle, evolve into second forms and take down giant bosses. Built in Roblox Studio under my own studio, MonPao.',
  points: ['Lane-battle gameplay scripted in Luau', 'Hero evolutions, bosses and rewards', '30-second trailer produced in code with Remotion'],
};

export const GAMES = [
  { name: '+1 Speed Broom Escape', icon: '9917582048', visits: 180699, favs: 10213, url: 'https://www.roblox.com/games/70689304784448/1-Speed-Broom-Escape', tag: 'Obby · speed sim' },
  { name: 'Clean and Guess!', icon: '10681297248', visits: 49996, favs: 196, url: 'https://www.roblox.com/games/94629675097885/Guess-Before-Cleaned', tag: 'Party · mystery' },
  { name: 'Avoid Trains For Eggs!', icon: '9545289521', visits: 26801, favs: 117, url: 'https://www.roblox.com/games/76194768511184/Avoid-Trains-For-Eggs', tag: 'Survival · collect' },
  { name: 'Swing Obby for Brainrot Eggs!', icon: '9843596981', visits: 15961, favs: 32, url: 'https://www.roblox.com/games/113317945633040/Swing-Obby-for-Brainrot-Eggs', tag: 'Obby · physics' },
  { name: 'Spirit Choppers', icon: '10104026758', url: 'https://www.roblox.com/games/127003471705770/Spirit-Choppers-New', tag: 'Simulator · new' },
  { name: 'Anime Tap Cubers', icon: '9794470895', url: 'https://www.roblox.com/games/99072810820523/Anime-Tap-Cubers', tag: 'Clicker · anime' },
  { name: 'Set Sail For Brainrots', icon: '9742430039', url: 'https://www.roblox.com/games/125983368638723/Set-Sail-For-Brainrots', tag: 'Draw · build' },
  { name: 'Mow ur Snow', icon: null, url: 'https://www.roblox.com/share?code=9dc6512b4a2cd44ab4e85513f84a17e2&type=ExperienceDetails&stamp=1788817155432', tag: 'Simulator · winter' },
].map((g) => ({ ...g, icon: g.icon ? G + g.icon + '-icon.webp' : null }));

export const SYSTEMS = [
  { name: 'Quality assurance automation', what: 'Automated QA checks that flag broken workflows before clients notice.', tools: 'Make.com · GoHighLevel', link: 'https://www.loom.com/share/fe1cc72098654795a498b412a675b798', kind: 'Watch walkthrough', extra: { label: 'QA workflows', url: 'https://drive.google.com/drive/folders/1hBHzNUnly5xbmHxHbYoxNWjEKmw8nfF1?usp=drive_link' } },
  { name: 'Client report dashboard', what: 'A live Looker Studio report that replaced hand-built weekly client decks.', tools: 'Looker Studio', link: 'https://www.loom.com/share/556d9cd43d17497c9c8fda2c499a1fc2', kind: 'Watch walkthrough' },
  { name: 'Client fulfillment tracker', what: 'An Apps Script tracker that moves every client from signed to delivered.', tools: 'Google Apps Script · Sheets', link: 'https://drive.google.com/drive/folders/1PH-iDLXQJjAxJlJqm20nQ8OYGN10vm3a?usp=drive_link', kind: 'Open files' },
  { name: 'Project management system', what: 'One system for tasks, owners and deadlines across the team.', tools: 'Apps Script · Sheets', link: 'https://drive.google.com/drive/folders/1zx3_jkhaApCEHH31ZOv5-hR9OC4GCF-p?usp=drive_link', kind: 'Open files' },
  { name: 'Onboarding automation', what: 'New clients get accounts, forms and welcome sequences with no manual steps.', tools: 'Make.com · GoHighLevel · HotProspector', link: 'https://drive.google.com/drive/folders/1Z0-n1ZemKPnYVKk_5XjIVuqYx2LDuQ_u?usp=drive_link', kind: 'Open files' },
];

export const TECH_STACK = ['Roblox Studio', 'Luau', 'Make.com', 'GoHighLevel', 'Looker Studio', 'Apps Script', 'HotProspector', 'JavaScript', 'Python'];

/* ------------------------------------------------------------------ 3D */
export const CUBE_HERO = { src: T + '3d-cubed-characters-styl-01', w: 1920, h: 998, alt: 'Sung Jinwoo and his shadow soldiers as stylized cube characters' };

export const CUBE_CAST = [
  ['02', 'Demon slayer pair, cubed', 1496, 1080],
  ['03', 'Upper moons, cubed', 1495, 1080],
  ['05', 'Six-eyed swordsman, cubed', 1294, 935],
  ['06', 'Flame pillar, cubed', 1262, 912],
  ['07', 'Frost wing beast', 1495, 1080],
  ['08', 'Sabre-tooth spirit', 1196, 864],
  ['09', 'Lion pets, light and dark', 1920, 662],
  ['10', 'Octopus pets', 1847, 637],
  ['11', 'Pet lineup', 828, 195],
].map(([n, t, w, h]) => ({ src: T + '3d-cubed-characters-styl-' + n, title: t, w, h }));

// Category shelves: [file prefix, count, title, note]
const shelf = (p, n, title, note, dims) => ({ title, note, items: dims.map((d, i) => ({ src: T + p + '-' + String(i + 1).padStart(2, '0'), w: d[0], h: d[1] })) });
export const SHELVES = [
  shelf('3d-blades', 13, '3D blades', 'Axes, katanas, kunai, tridents and candy-cane flails', [[1690,1080],[875,559],[1505,962],[1000,1036],[1505,962],[992,634],[1026,656],[645,678],[530,557],[1920,968],[703,703],[796,796],[786,786]]),
  shelf('boss-mob-gedo-mazo-inspi', 3, 'Boss mob, Gedo Mazo inspired', 'Raid boss with in-game UI pass', [[1677,1080],[1495,1080],[878,634]]),
  shelf('boss-mob-cocooned-muzan-', 2, 'Boss mob, cocooned Muzan inspired', 'Final-form boss, low-poly', [[1677,1080],[1920,1069]]),
  shelf('3d-low-poly-boss-mob', 1, 'Low-poly boss and mob', 'Spider brood from minion to boss', [[1920,676]]),
  shelf('alien-monster-low-poly', 1, 'Alien monster', 'Low-poly creature', [[777,632]]),
  shelf('solo-leveling-architect-', 1, 'Solo Leveling, the Architect', 'Low-poly throne room scene', [[1051,774]]),
  shelf('3d-low-mid-poly-bikes', 4, 'Bikes', 'Low and mid-poly motorcycles', [[520,380],[833,542],[590,449],[548,417]]),
  shelf('3d-low-poly-buildings-st', 3, 'Low-poly buildings', 'Stylized environments and kits', [[433,465],[954,1024],[899,582]]),
  shelf('spirit-models', 1, 'Spirit models', 'Made for Spirit Choppers', [[1920,1066]]),
  shelf('brainrot-models-stylized', 2, 'Brainrot models', 'Collectibles for the brainrot games', [[1920,1066],[1920,1066]]),
  shelf('egg-models-stylized-uniq', 1, 'Egg models', 'Hatchable eggs, each one unique', [[1920,1066]]),
  shelf('broom-models-stylized', 1, 'Broom models', 'Made for +1 Speed Broom Escape', [[904,549]]),
];

/* ------------------------------------------------------------------ AI VIDEO */
// `featured` are the newest pieces. Swap src/poster when the final files land.
export const VIDEO_FEATURED = [
  { title: 'The Speedrunner Who Stole Time', type: '3D story explainer', src: V + 'speedrunner.mp4', poster: V + 'speedrunner.webp', ratio: '9/16' },
  { title: 'The NPC Who Remembered', type: 'Stick-figure story', src: V + 'npc-remembered.mp4', poster: V + 'npc-remembered.webp', ratio: '9/16' },
  { title: 'Perfume UGC ad', type: 'AI UGC commercial', src: V + 'perfume-ugc.mp4', poster: V + 'perfume-ugc.webp', ratio: '16/9' },
];

export const VIDEO_TYPES = [
  { type: '3D story shorts', note: 'Faceless 3D storytelling with voice, captions and sound design, in the style of viral explainer channels.', clips: [ ['player-never-win', 'The Player Who Was Never Supposed to Win', '9/16'] ] },
  { type: 'Whiteboard and stick-figure explainers', note: 'Hand-drawn style that makes a dry topic easy to follow.', clips: [ ['npc-explainer', 'NPCs', '16/9'], ['great-players', 'What great players do', '16/9'] ] },
  { type: 'Cinematic AI explainers', note: 'Story-led narration over generated cinematic shots.', clips: [ ['twelve-hours', '12 hours straight', '16/9'], ['invisible-walls', 'Invisible walls', '16/9'] ] },
  { type: 'UGC-style ads', note: 'Creator-style product videos with punchy captions.', clips: [ ['sarah-ugc', 'Paid invoices', '9/16'] ] },
  { type: 'Product commercials', note: 'Studio-lit hero shots for products.', clips: [ ['headphones-ad', 'Headphones', '16/9'], ['watch-ad', 'Watch', '16/9'] ] },
  { type: 'Listicles and faceless shorts', note: 'Fast countdowns built for retention.', clips: [ ['dogs-listicle', 'Jumping dogs', '9/16'] ] },
  { type: 'Client edits in CapCut', note: 'Event recaps, testimonials and brand reels from raw footage.', clips: [ ['event-reel', 'Event recap', '9/16'], ['testimonial', 'Testimonial', '9/16'], ['pool-reel', 'Brand reel', '9/16'] ] },
].map((t) => ({ ...t, clips: t.clips.map(([f, title, ratio]) => ({ src: V + f + '.mp4', poster: V + f + '.webp', title, ratio })) }));

export const VIDEO_TOOLS = ['CapCut', 'AI image and video generation', 'AI voiceover', 'Code-driven 3D animation', 'Captions and sound design', 'Pacing and color'];
