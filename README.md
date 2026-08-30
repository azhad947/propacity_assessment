# MUREC — Redesigned Home Page

A ground-up UI redesign of the MUREC (Madhusudan Urban Real Estate Collection) home page.
Built with React + Vite + Tailwind CSS v4 + Framer Motion + GSAP.

All copy, images, video and links are sourced from [murec.com](https://www.murec.com/).

## Stack



 Framework | React 18 + Vite 
 Styling | Tailwind CSS v4 (custom design tokens) 
 Scroll physics | Lenis smooth scroll 
 Scroll animations | GSAP + ScrollTrigger 
 UI animations | Framer Motion 
 Fonts | Fraunces (display) · Inter (sans) 


## Project structure

src/
  components/   # One file per section + shared primitives
  data/
    content.js  # Single source of truth for all copy & asset paths
  lib/
    gsap.js           # GSAP + ScrollTrigger registration
    useScrollParallax # Scroll-linked parallax hook
    useTiltCard       # 3D cursor-tilt hook
    text.js           # splitLines utility
  index.css     # Tailwind v4 theme + global utilities
public/
  images/       # All assets self-hosted (video, photos, logos)


## Getting started

   bash
npm install
npm run dev      
npm run build    
npm run preview  
```

## Notes

- Fully responsive — 360 px mobile through wide desktop
- `prefers-reduced-motion` respected across all animation layers
- Visible keyboard focus rings on all interactive elements
- Images below the fold use `loading="lazy"`
