# pencisas.github.io

Portfolio of **Pao Encisa**: Roblox games, stylized 3D modeling and AI video editing.

Live: https://pencisas.github.io (link straight to a specialty with `#tech`, `#3d` or `#ai-video`)

## How it's built
Static site, no build step. Free and open tools only:
- [GSAP](https://gsap.com) + ScrollTrigger for scroll choreography
- [Lenis](https://github.com/darkroomengineering/lenis) for smooth scrolling (MIT)
- [three.js](https://threejs.org) for the background cube field (MIT)
- Self-hosted Google Fonts: Unbounded, Big Shoulders Display, Instrument Serif, Bricolage Grotesque (OFL)

## Editing content
Everything you see is in `js/data.js`: games, stats, 3D shelves and videos.
- Add a video: drop an H.264 `.mp4` and a `.webp` poster in `assets/video/`, then add it to `VIDEO_TYPES`.
- Add a 3D render: add `name.webp` (1600px) and `name-sm.webp` (720px) to `assets/3d/`, then add it to `SHELVES` or `CUBE_CAST`.
