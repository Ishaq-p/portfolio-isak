# Paktinyar Portfolio — Redesign

Drop the `app/` folder in here into your existing Next.js project (it will
overwrite the files below — everything else in your project, including your
`public/data/*.json`, is untouched).

## 1. Install two new dependencies

The new design self-hosts its fonts (no Google Fonts network call, faster
and more reliable) via Fontsource:

```bash
npm install @fontsource/fraunces @fontsource/inter @fontsource/ibm-plex-mono
```

Everything else (`next`, `react`, `framer-motion`, `react-icons`,
`@emailjs/browser`, `tailwindcss` v4) is already in your project.

## 2. Files changed

- `globals.css` — new design tokens (colors, type scale), self-hosted fonts
- `layout.tsx` — simplified, no next/font/google
- `components/OrbitMark.tsx` — **new**. The atom/orbit signature mark you
  liked, now a reusable component used in the navbar, both heroes, the
  footer, and the contact card
- `components/Navbar.tsx`, `components/Footer.tsx` — rebuilt
- `page.tsx` (home) — rebuilt with real copy about you instead of the
  generic agency placeholder text
- `components/Capabilities.tsx` — kept your liked tilt-card mechanic,
  restyled to match the new system
- `components/SocialImpact.tsx` ("Human Interoperability") — kept the name
  and structure you liked, restyled
- `components/ProjectCard.tsx`, `components/ExperienceCard.tsx`,
  `components/FilterJumble.tsx`, `components/ConnectionProtocol.tsx` —
  rebuilt
- `portfolio/page.tsx` — rebuilt
- `components/project/Arch.tsx`, `components/project/Constraints.tsx`,
  `portfolio/project/[id]/page.tsx`,
  `portfolio/experience/[id]/page.tsx` — rebuilt

## 3. Removed (now unused)

`components/NeuralNetwork.tsx` and `components/FooterMetrics.tsx` are no
longer imported anywhere. They're not included in this delivery — safe to
delete from your project if you still have them.

## 4. Design system, in short

- **Colors** — near-black "ink" + cool "paper" white, with a precise
  blue-violet ("ion") as the primary accent and a muted green ("culture")
  as a secondary accent for status/bio-adjacent moments. No orange/terracotta,
  no generic neon-hacker green.
- **Type** — Fraunces (serif display, for headlines) + Inter (body) + IBM
  Plex Mono (used sparingly, only for real data: metrics, stack tags — not
  as decoration on every label).
- **Signature** — `OrbitMark`, the atom/electron motif, reused everywhere
  instead of being a one-off hero graphic.
- **Copy** — removed the terminal/hacker jargon (`CLIENT_ID`, `PUSH_MESSAGE`,
  `bitatlim-prod`, ghost index numbers on non-sequential content) in favor
  of plain, confident language.
- **Motion** — orchestrated hero reveal, scroll-triggered reveals, magnetic
  tilt cards, tab transitions. Respects `prefers-reduced-motion`.

All tested in a full Next.js build (dev + production build, zero type
errors) with sample data matching your existing JSON schema, across desktop
and mobile widths.
