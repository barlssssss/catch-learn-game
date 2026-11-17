# AGENTS.md

## Project overview

**CATCH & LEARN – Jom Memancing Sambil Belajar!** is a client-side educational fishing game in Bahasa Melayu for a university assignment: *Kit Media Pendidikan Kesihatan Tingkatan 1: Penyakit*. The player catches five special fish. Each fish holds one kit component (Nota, RPH, Manual Pengguna, Manual Permainan, Kuiz Interaktif) that opens in a modal.

There is no backend, database or API. Settings persist in `localStorage` only.

**Language rule:** all user-facing text must be in Bahasa Melayu. Identifiers in `src/game` are mostly Malay too (e.g. `ikan` = fish, `skrin` = screen, `tetapan` = settings, `bahan` = material, `ditangkap` = caught, `kail` = hook).

## Stack

TanStack Start (React 19, TS strict with `noUnusedLocals`), Vite 8 and Netlify. The game uses its own CSS (`src/game/game.css`), not Tailwind or shadcn. The template's `src/components/ui` is still present but the game doesn't use it.

## Key directories

```
src/routes/index.tsx        Renders <Game /> and imports game.css
src/routes/__root.tsx       HTML shell, Malay metadata, Google Fonts (Lilita One + Baloo 2)
src/game/Game.tsx           Screen state machine + context (screen, settings, caught fish, score, material modal) and per-screen music
src/game/audio.ts           Web Audio engine: procedural music tracks (TRACKS) + sound effects (sfx) + lake ambience
src/game/content.ts         Fish definitions (IKAN), student/title info (MAKLUMAT), quiz questions (SOALAN_KUIZ)
src/game/FishSvg.tsx        3D-cartoon SVG fish; `tunjukLabel` draws the component name on the body
src/game/ui.tsx             Title3D, GameButton, MusicToggle, LakeBackground, Panel, Bubbles, image CDN helper
src/game/screens/           MenuScreen (also the "press start" splash), CaraScreen, TetapanScreen, PlayScreen, TangkapanPopup, MenangScreen
src/game/bahan/             BahanModal + one component per kit material, Kuiz, Tab helper
public/img/                 AI-generated backgrounds (tasik.png = gameplay, muka-depan.png = title/settings/victory)
```

## Non-obvious decisions

- **16:9 stage:** `.cl-stage` is letterboxed to 16:9 and is a size container. Every dimension uses `cqw`/`cqh` so the whole game scales uniformly. Keep using `cqw` for new UI.
- **Gameplay coordinates** in `PlayScreen.tsx` use a virtual 1600×900 space. `ZON` (fish swim area), `airSah()` (valid casting water) and the rod anchor points are tuned to the `tasik.png` artwork. If you regenerate the background, re-tune them.
- **Performance:** the game loop (`requestAnimationFrame`) mutates refs and writes DOM styles directly. React state only changes on discrete events (phase changes, popups, notices).
- **Audio unlock:** browsers block audio until a user gesture. `audio.unlock()` runs on the first pointer or key press, and the requested track is queued until then.
- **Music per page:** `MUZIK_SKRIN` in `Game.tsx` maps screens to tracks, and an open material swaps to the `bahan` or `kuiz` track.
- **Images** go through the Netlify Image CDN via `gambar()` in `ui.tsx`, never as raw PNG URLs.
- Read `localStorage` only inside `useEffect` (SSR).

## Commands

```bash
pnpm dev          # Vite dev server (port 3000); `netlify dev` for Image CDN emulation
pnpm typecheck
pnpm lint
```
