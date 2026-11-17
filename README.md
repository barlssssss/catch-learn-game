# CATCH & LEARN – Jom Memancing Sambil Belajar!

An interactive, Malay-language educational fishing game that delivers the **Kit Media Pendidikan Kesihatan Tingkatan 1: Penyakit** (Form 1 Health Education media kit on diseases). Players cast a line into a 3D-cartoon lake and catch five special fish; each fish carries one component of the kit:

1. **NOTA** – lesson notes on communicable and non-communicable diseases, how they spread and how to prevent them
2. **RANCANGAN PENGAJARAN HARIAN (RPH)** – a 40-minute daily lesson plan
3. **MANUAL PENGGUNA** – user manual for teachers and students
4. **MANUAL PERMAINAN** – game rules, controls and scoring
5. **KUIZ INTERAKTIF** – a 10-question quiz with instant feedback and a star rating

Once a fish is caught, the component name appears on its body, and tapping the fish opens the material.

Student: MUHAMMAD IRFAN IQBAL BIN ZAINUDDIN (D20241114109)

## Features

- Title screen with a layered 3D cartoon logo, assignment ribbon and student card
- **MULA BERMAIN**, **CARA BERMAIN** and **TETAPAN MUZIK** screens
- A fishing loop: tap the water to cast, glowing "?" fish swim to the bait, then a timing bar asks you to press **TARIK!** (or Space) while the needle is in the green zone
- Score, a "perfect pull" bonus, difficulty that rises with each catch, and a Koleksi Kit Media tray so caught fish can be reopened at any time
- Different background music on every screen, plus water, casting, bite, catch and success sound effects. All audio is generated live with the Web Audio API, so there are no audio files to download.
- Music ON/OFF toggle on every screen, plus volume and sound-effect controls (saved in the browser)
- A fixed 16:9 landscape stage that scales to any screen, which suits projector presentations

## Tech stack

- [TanStack Start](https://tanstack.com/start) + React 19 + TypeScript
- Vite 8, plain CSS with container-query units (`src/game/game.css`)
- Web Audio API for procedural music and sound effects
- Lake backgrounds illustrated with Netlify AI Gateway (Gemini image model) and served through the Netlify Image CDN
- Hosted on Netlify

## Running locally

```bash
pnpm install
netlify dev        # or: pnpm dev (Vite on port 3000)
```

Open the site, click **TEKAN UNTUK MULA** (browsers need one tap before they play audio), and play in landscape or full screen (F11) for the best experience.
