<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>NOIR — Barbería de Lujo</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&display=swap" rel="stylesheet">
<style>
/* ─── RESET & ROOT ─────────────────────────────────────── */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
:root {
  --gold:    #c9a96e;
  --gold-l:  #e8c98a;
  --gold-d:  #8a6d3f;
  --ink:     #080808;
  --ink2:    #111111;
  --ink3:    #1a1a1a;
  --ink4:    #222222;
  --smoke:   #2a2a2a;
  --ash:     rgba(255,255,255,0.06);
  --cream:   #f5f0e8;
  --text:    rgba(255,255,255,0.85);
  --muted:   rgba(255,255,255,0.35);
  --faint:   rgba(255,255,255,0.07);
  --ff-serif: 'Playfair Display', Georgia, serif;
  --ff-body:  'Cormorant Garamond', Georgia, serif;
  --ff-mono:  'DM Mono', monospace;
  --ease-expo: cubic-bezier(0.19,1,0.22,1);
}
html { scroll-behavior: smooth; }
body {
  background: var(--ink);
  color: var(--text);
  font-family: var(--ff-body);
  font-size: 18px;
  line-height: 1.7;
  overflow-x: hidden;
  cursor: none;
}

/* ─── CUSTOM CURSOR ────────────────────────────────────── */
#cursor {
  position: fixed; top: 0; left: 0; z-index: 9999;
  width: 12px; height: 12px;
  background: var(--gold);
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%,-50%);
  transition: width .3s var(--ease-expo), height .3s var(--ease-expo), background .3s;
  mix-blend-mode: screen;
}
#cursor-ring {
  position: fixed; top: 0; left: 0; z-index: 9998;
  width: 36px; height: 36px;
  border: 1px solid rgba(201,169,110,0.5);
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%,-50%);
  transition: transform .15s var(--ease-expo), width .3s var(--ease-expo), height .3s var(--ease-expo);
}
body:hover #cursor { opacity: 1; }
a:hover ~ #cursor, button:hover ~ #cursor { width: 20px; height: 20px; }

/* ─── NOISE OVERLAY ────────────────────────────────────── */
body::before {
  content: '';
  position: fixed; inset: 0; z-index: 9990;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
  opacity: 0.025;
  pointer-events: none;
}

/* ─── SCROLLBAR ─────────────────────────────────────────── */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--ink); }
::-webkit-scrollbar-thumb { background: var(--gold-d); border-radius: 2px; }

/* ─── NAVIGATION ────────────────────────────────────────── */
nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 500;
  display: flex; align-items: center; justify-content: space-between;
  padding: 1.5rem 4rem;
  background: linear-gradient(to bottom, rgba(8,8,8,0.98) 0%, transparent 100%);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(201,169,110,0.08);
  transition: padding .4s var(--ease-expo), background .4s;
}
nav.scrolled {
  padding: 1rem 4rem;
  background: rgba(8,8,8,0.97);
  border-bottom-color: rgba(201,169,110,0.15);
}
.nav-logo {
  display: flex; align-items: center; gap: 0.75rem;
  text-decoration: none;
}
.nav-logo-mark {
  width: 38px; height: 38px;
  background: var(--gold);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--ff-serif); font-weight: 900; color: #000;
  font-size: 1.1rem;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  transition: transform .4s var(--ease-expo);
}
.nav-logo:hover .nav-logo-mark { transform: rotate(30deg); }
.nav-logo-text {
  font-family: var(--ff-serif); font-weight: 900;
  font-size: 1.3rem; letter-spacing: 0.15em;
  color: #fff; text-transform: uppercase;
}
.nav-logo-text span { color: var(--gold); }
.nav-links { display: flex; align-items: center; gap: 2.5rem; list-style: none; }
.nav-links a {
  color: var(--muted);
  text-decoration: none;
  font-family: var(--ff-mono);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  transition: color .3s;
  position: relative;
}
.nav-links a::after {
  content: '';
  position: absolute; bottom: -4px; left: 0;
  width: 0; height: 1px;
  background: var(--gold);
  transition: width .4s var(--ease-expo);
}
.nav-links a:hover { color: var(--gold); }
.nav-links a:hover::after { width: 100%; }
.nav-cta {
  background: transparent;
  border: 1px solid var(--gold);
  color: var(--gold) !important;
  padding: 0.6rem 1.5rem !important;
  transition: background .3s, color .3s !important;
}
.nav-cta:hover { background: var(--gold) !important; color: #000 !important; }
.nav-cta::after { display: none !important; }
.nav-hamburger { display: none; background: none; border: none; cursor: none; }
.nav-hamburger span { display: block; width: 24px; height: 1px; background: var(--gold); margin: 5px 0; transition: all .3s; }

/* ─── HERO ──────────────────────────────────────────────── */
.hero {
  position: relative;
  height: 100vh; min-height: 700px;
  display: flex; align-items: center;
  overflow: hidden;
}
.hero-bg {
  position: absolute; inset: 0;
  background-image: url('https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=1920&q=85&auto=format');
  background-size: cover;
  background-position: center 30%;
  transform: scale(1.05);
  animation: heroZoom 20s ease-in-out infinite alternate;
}
@keyframes heroZoom {
  from { transform: scale(1.05) translateY(0); }
  to   { transform: scale(1.12) translateY(-2%); }
}
.hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(
    135deg,
    rgba(8,8,8,0.92) 0%,
    rgba(8,8,8,0.7) 40%,
    rgba(201,169,110,0.08) 80%,
    rgba(8,8,8,0.85) 100%
  );
}
.hero-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(201,169,110,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(201,169,110,0.04) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse at center, black 20%, transparent 80%);
}
.hero-content {
  position: relative; z-index: 2;
  max-width: 1400px; margin: 0 auto;
  padding: 0 4rem;
  display: grid; grid-template-columns: 1fr 1fr;
  align-items: center; gap: 4rem;
  width: 100%;
}
.hero-badge {
  display: inline-flex; align-items: center; gap: 0.6rem;
  border: 1px solid rgba(201,169,110,0.3);
  padding: 0.4rem 1.2rem;
  margin-bottom: 2rem;
  font-family: var(--ff-mono); font-size: 0.65rem;
  letter-spacing: 0.3em; text-transform: uppercase;
  color: var(--gold);
  animation: fadeUp 1s var(--ease-expo) 0.2s both;
}
.hero-badge-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 8px #22c55e;
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%,100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(0.8); }
}
.hero-title {
  font-family: var(--ff-serif);
  font-size: clamp(4rem, 8vw, 8rem);
  font-weight: 900;
  line-height: 0.88;
  letter-spacing: -0.03em;
  margin-bottom: 2rem;
  animation: fadeUp 1s var(--ease-expo) 0.4s both;
}
.hero-title em {
  font-style: italic;
  color: var(--gold);
  display: block;
}
.hero-title .outline {
  -webkit-text-stroke: 1px rgba(255,255,255,0.3);
  color: transparent;
}
.hero-desc {
  font-size: 1.15rem; color: var(--muted);
  max-width: 420px;
  margin-bottom: 3rem;
  font-weight: 300;
  line-height: 1.9;
  animation: fadeUp 1s var(--ease-expo) 0.6s both;
}
.hero-actions {
  display: flex; align-items: center; gap: 1.5rem;
  animation: fadeUp 1s var(--ease-expo) 0.8s both;
}
.btn-primary {
  display: inline-flex; align-items: center; gap: 0.75rem;
  background: var(--gold);
  color: #000;
  padding: 1rem 2.5rem;
  font-family: var(--ff-mono); font-size: 0.7rem;
  letter-spacing: 0.2em; text-transform: uppercase;
  text-decoration: none;
  font-weight: 500;
  transition: all .4s var(--ease-expo);
  position: relative; overflow: hidden;
  cursor: none;
  border: none;
}
.btn-primary::before {
  content: '';
  position: absolute; inset: 0;
  background: #fff;
  transform: translateX(-101%);
  transition: transform .4s var(--ease-expo);
}
.btn-primary:hover::before { transform: translateX(0); }
.btn-primary span { position: relative; z-index: 1; }
.btn-secondary {
  display: inline-flex; align-items: center; gap: 0.5rem;
  color: var(--muted);
  font-family: var(--ff-mono); font-size: 0.7rem;
  letter-spacing: 0.15em; text-transform: uppercase;
  text-decoration: none;
  cursor: none;
  transition: color .3s;
  background: none; border: none;
}
.btn-secondary:hover { color: var(--gold); }
.hero-stats {
  display: flex; gap: 3rem;
  margin-top: 4rem;
  padding-top: 3rem;
  border-top: 1px solid var(--ash);
  animation: fadeUp 1s var(--ease-expo) 1s both;
}
.hero-stat-num {
  font-family: var(--ff-serif);
  font-size: 2.5rem; font-weight: 900;
  color: var(--gold);
  line-height: 1;
}
.hero-stat-label {
  font-family: var(--ff-mono);
  font-size: 0.6rem; letter-spacing: 0.25em;
  text-transform: uppercase; color: var(--muted);
  margin-top: 0.3rem;
}
.hero-image-stack {
  position: relative;
  height: 580px;
  animation: fadeIn 1.5s var(--ease-expo) 0.5s both;
}
.hero-img-main {
  position: absolute; right: 0; top: 0;
  width: 78%; height: 90%;
  object-fit: cover;
  filter: grayscale(20%);
  box-shadow: -30px 30px 80px rgba(0,0,0,0.6);
}
.hero-img-secondary {
  position: absolute; left: 0; bottom: 0;
  width: 45%; height: 55%;
  object-fit: cover;
  filter: grayscale(20%);
  box-shadow: 20px -20px 60px rgba(0,0,0,0.5);
  border: 2px solid rgba(201,169,110,0.2);
}
.hero-img-accent {
  position: absolute; right: 20%; top: -20px;
  width: 120px; height: 120px;
  border: 1px solid var(--gold);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--ff-serif); font-size: 1rem;
  color: var(--gold);
  background: rgba(8,8,8,0.8);
  backdrop-filter: blur(10px);
  animation: rotate 20s linear infinite;
}
@keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.hero-img-accent-inner { animation: rotate 20s linear infinite reverse; font-size: 1.5rem; }
.hero-scroll {
  position: absolute; bottom: 3rem; left: 50%; transform: translateX(-50%);
  display: flex; flex-direction: column; align-items: center; gap: 0.75rem;
  color: var(--muted);
  font-family: var(--ff-mono); font-size: 0.6rem; letter-spacing: 0.25em;
  text-transform: uppercase;
  animation: fadeIn 2s 1.5s both;
}
.hero-scroll-line {
  width: 1px; height: 50px;
  background: linear-gradient(to bottom, var(--gold), transparent);
  animation: scrollLine 2s ease-in-out infinite;
}
@keyframes scrollLine {
  0% { transform: scaleY(0); transform-origin: top; }
  50% { transform: scaleY(1); transform-origin: top; }
  50.01% { transform: scaleY(1); transform-origin: bottom; }
  100% { transform: scaleY(0); transform-origin: bottom; }
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; } to { opacity: 1; }
}

/* ─── MARQUEE ───────────────────────────────────────────── */
.marquee-wrapper {
  overflow: hidden;
  border-top: 1px solid rgba(201,169,110,0.1);
  border-bottom: 1px solid rgba(201,169,110,0.1);
  padding: 1rem 0;
  background: var(--ink2);
}
.marquee-track {
  display: flex;
  animation: marquee 25s linear infinite;
  white-space: nowrap;
}
.marquee-item {
  display: flex; align-items: center; gap: 2rem;
  padding: 0 2.5rem;
  font-family: var(--ff-serif); font-style: italic;
  font-size: 1.1rem; color: var(--muted);
}
.marquee-sep { color: var(--gold); font-size: 0.6rem; }
@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

/* ─── SECTIONS COMMON ───────────────────────────────────── */
section { padding: 8rem 4rem; max-width: 1400px; margin: 0 auto; }
.section-full { max-width: none; padding: 8rem 0; }
.section-label {
  font-family: var(--ff-mono); font-size: 0.65rem;
  letter-spacing: 0.35em; text-transform: uppercase;
  color: var(--gold); margin-bottom: 1rem;
  display: flex; align-items: center; gap: 1rem;
}
.section-label::before {
  content: ''; display: block;
  width: 40px; height: 1px; background: var(--gold);
}
.section-title {
  font-family: var(--ff-serif); font-size: clamp(3rem, 5vw, 5rem);
  font-weight: 900; line-height: 0.95;
  letter-spacing: -0.03em;
  margin-bottom: 1.5rem;
}
.section-title em { font-style: italic; color: var(--gold); }

/* ─── SERVICES ──────────────────────────────────────────── */
#services { background: var(--ink2); max-width: none; padding: 8rem 4rem; }
.services-inner { max-width: 1400px; margin: 0 auto; }
.services-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 5rem; flex-wrap: wrap; gap: 2rem; }
.services-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5px; background: rgba(201,169,110,0.08); }
.service-card {
  background: var(--ink2);
  padding: 3rem 2.5rem;
  position: relative;
  overflow: hidden;
  transition: background .4s;
  cursor: none;
}
.service-card::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
  transform: translateX(-100%);
  transition: transform .6s var(--ease-expo);
}
.service-card:hover::before { transform: translateX(0); }
.service-card:hover { background: var(--ink3); }
.service-icon {
  width: 64px; height: 64px;
  border: 1px solid rgba(201,169,110,0.2);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.8rem;
  margin-bottom: 2rem;
  transition: border-color .3s, transform .4s var(--ease-expo);
}
.service-card:hover .service-icon {
  border-color: var(--gold);
  transform: scale(1.1) rotate(-5deg);
}
.service-name {
  font-family: var(--ff-serif); font-size: 1.5rem; font-weight: 700;
  margin-bottom: 0.75rem;
}
.service-desc { font-size: 0.95rem; color: var(--muted); margin-bottom: 2rem; font-weight: 300; }
.service-meta { display: flex; justify-content: space-between; align-items: center; }
.service-price { font-family: var(--ff-serif); font-size: 1.8rem; color: var(--gold); font-weight: 700; }
.service-duration {
  font-family: var(--ff-mono); font-size: 0.65rem;
  letter-spacing: 0.15em; color: var(--muted);
  border: 1px solid var(--ash); padding: 0.3rem 0.8rem;
}
.service-cta {
  position: absolute; bottom: 2.5rem; right: 2.5rem;
  width: 44px; height: 44px;
  background: var(--gold);
  display: flex; align-items: center; justify-content: center;
  opacity: 0; transform: translateY(10px) scale(0.8);
  transition: all .3s var(--ease-expo);
  font-size: 1.2rem; color: #000;
  cursor: none;
  border: none;
}
.service-card:hover .service-cta { opacity: 1; transform: translateY(0) scale(1); }

/* ─── PROFESSIONALS ─────────────────────────────────────── */
#team { padding: 8rem 4rem; }
.team-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-top: 5rem; }
.team-card {
  position: relative; overflow: hidden;
  background: var(--ink2);
  cursor: none;
}
.team-card-img-wrap {
  position: relative; overflow: hidden;
  height: 420px;
}
.team-card-img {
  width: 100%; height: 100%;
  object-fit: cover;
  filter: grayscale(40%) brightness(0.85);
  transition: filter .6s, transform .8s var(--ease-expo);
}
.team-card:hover .team-card-img {
  filter: grayscale(0%) brightness(0.9);
  transform: scale(1.05);
}
.team-card-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(8,8,8,0.9) 0%, transparent 60%);
}
.team-card-content {
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: 2.5rem;
  transform: translateY(60px);
  transition: transform .5s var(--ease-expo);
}
.team-card:hover .team-card-content { transform: translateY(0); }
.team-name { font-family: var(--ff-serif); font-size: 1.8rem; font-weight: 700; }
.team-specialty { color: var(--gold); font-size: 0.85rem; font-family: var(--ff-mono); letter-spacing: 0.15em; margin-top: 0.25rem; }
.team-bio { color: var(--muted); font-size: 0.9rem; margin-top: 1rem; font-weight: 300; opacity: 0; transition: opacity .4s .1s; }
.team-card:hover .team-bio { opacity: 1; }
.team-stats { display: flex; gap: 1.5rem; margin-top: 1.5rem; opacity: 0; transition: opacity .4s .15s; }
.team-card:hover .team-stats { opacity: 1; }
.team-stat { text-align: center; }
.team-stat-n { font-family: var(--ff-serif); font-size: 1.4rem; font-weight: 700; color: var(--gold); }
.team-stat-l { font-family: var(--ff-mono); font-size: 0.55rem; color: var(--muted); letter-spacing: 0.15em; }
.team-book-btn {
  margin-top: 1.5rem;
  display: inline-flex; align-items: center; gap: 0.5rem;
  background: var(--gold); color: #000;
  padding: 0.7rem 1.5rem;
  font-family: var(--ff-mono); font-size: 0.65rem;
  letter-spacing: 0.2em; text-transform: uppercase;
  font-weight: 500;
  border: none; cursor: none;
  opacity: 0; transform: translateY(10px);
  transition: all .4s .2s var(--ease-expo);
}
.team-card:hover .team-book-btn { opacity: 1; transform: translateY(0); }
.team-card-badge {
  position: absolute; top: 1.5rem; right: 1.5rem;
  background: rgba(8,8,8,0.8); backdrop-filter: blur(10px);
  border: 1px solid rgba(201,169,110,0.2);
  padding: 0.5rem 0.8rem;
  font-family: var(--ff-mono); font-size: 0.65rem;
  color: var(--gold); letter-spacing: 0.1em;
}

/* ─── GALLERY ───────────────────────────────────────────── */
#gallery { padding: 0; max-width: none; background: var(--ink); }
.gallery-header { max-width: 1400px; margin: 0 auto; padding: 8rem 4rem 4rem; }
.gallery-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 350px 350px;
  gap: 3px;
}
.gallery-item {
  position: relative; overflow: hidden; cursor: none;
}
.gallery-item:first-child { grid-row: span 2; }
.gallery-item img {
  width: 100%; height: 100%;
  object-fit: cover;
  filter: grayscale(30%) brightness(0.8);
  transition: filter .6s, transform .8s var(--ease-expo);
}
.gallery-item:hover img { filter: grayscale(0%) brightness(1); transform: scale(1.05); }
.gallery-item-label {
  position: absolute; bottom: 1.5rem; left: 1.5rem;
  background: rgba(8,8,8,0.7); backdrop-filter: blur(8px);
  border-left: 2px solid var(--gold);
  padding: 0.5rem 1rem;
  font-family: var(--ff-mono); font-size: 0.65rem;
  letter-spacing: 0.15em; color: var(--gold);
  opacity: 0; transition: opacity .3s;
}
.gallery-item:hover .gallery-item-label { opacity: 1; }

/* ─── BOOKING ───────────────────────────────────────────── */
#booking { background: var(--cream); color: #111; max-width: none; padding: 8rem 4rem; }
.booking-inner { max-width: 1400px; margin: 0 auto; }
.booking-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 6rem; align-items: start; }
.booking-left .section-label { color: var(--gold-d); }
.booking-left .section-label::before { background: var(--gold-d); }
.booking-left .section-title { color: #111; }
.booking-info { margin-top: 3rem; }
.booking-info-item {
  display: flex; gap: 1.5rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid rgba(0,0,0,0.08);
}
.booking-info-icon {
  width: 44px; height: 44px; flex-shrink: 0;
  border: 1px solid rgba(201,169,110,0.4);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.2rem;
}
.booking-info-label { font-family: var(--ff-mono); font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold-d); }
.booking-info-value { font-family: var(--ff-serif); font-size: 1.1rem; color: #111; font-weight: 600; }
/* Booking Form */
.booking-form-wrap {
  background: #fff;
  box-shadow: 0 40px 120px rgba(0,0,0,0.12);
  padding: 3rem;
}
.booking-steps {
  display: flex; gap: 0;
  margin-bottom: 3rem;
  border-bottom: 1px solid rgba(0,0,0,0.08);
  padding-bottom: 1.5rem;
}
.booking-step {
  flex: 1; text-align: center;
  position: relative;
}
.booking-step-num {
  width: 32px; height: 32px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--ff-mono); font-size: 0.7rem;
  margin: 0 auto 0.5rem;
  transition: all .3s;
  border: 1px solid #ccc; color: #999;
}
.booking-step.active .booking-step-num { background: var(--gold-d); border-color: var(--gold-d); color: #fff; }
.booking-step.done .booking-step-num { background: #22c55e; border-color: #22c55e; color: #fff; }
.booking-step-label { font-family: var(--ff-mono); font-size: 0.6rem; letter-spacing: 0.15em; text-transform: uppercase; color: #aaa; }
.booking-step.active .booking-step-label { color: var(--gold-d); }
.booking-step::after {
  content: '';
  position: absolute; top: 16px; left: 60%;
  width: 80%; height: 1px;
  background: #e5e5e5;
}
.booking-step:last-child::after { display: none; }
/* Form elements */
.form-section { display: none; }
.form-section.active { display: block; }
.form-title { font-family: var(--ff-serif); font-size: 1.8rem; color: #111; margin-bottom: 2rem; font-weight: 700; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.form-grid.full { grid-template-columns: 1fr; }
.service-option, .pro-option {
  padding: 1.25rem 1.5rem;
  border: 1.5px solid #e5e5e5;
  cursor: none;
  transition: all .3s;
  position: relative;
}
.service-option:hover, .pro-option:hover { border-color: var(--gold-d); }
.service-option.selected, .pro-option.selected {
  border-color: var(--gold-d);
  background: rgba(138,109,63,0.04);
}
.service-option.selected::after, .pro-option.selected::after {
  content: '✓';
  position: absolute; top: 0.75rem; right: 1rem;
  color: var(--gold-d); font-weight: 700;
}
.service-opt-name { font-family: var(--ff-serif); font-size: 1.1rem; color: #111; font-weight: 600; }
.service-opt-meta { font-family: var(--ff-mono); font-size: 0.6rem; color: #999; letter-spacing: 0.1em; margin-top: 0.25rem; }
.service-opt-price { font-family: var(--ff-serif); font-size: 1.4rem; color: var(--gold-d); font-weight: 700; margin-top: 0.75rem; }
.pro-opt-avatar {
  width: 48px; height: 48px; border-radius: 50%;
  object-fit: cover; margin-bottom: 0.75rem;
  filter: grayscale(30%);
  border: 2px solid transparent;
  transition: border-color .3s;
}
.pro-option.selected .pro-opt-avatar, .pro-option:hover .pro-opt-avatar { border-color: var(--gold-d); filter: grayscale(0%); }
.pro-opt-name { font-family: var(--ff-serif); font-size: 1rem; color: #111; font-weight: 700; }
.pro-opt-spec { font-family: var(--ff-mono); font-size: 0.6rem; color: #999; letter-spacing: 0.1em; }
.pro-opt-rating { color: var(--gold-d); font-size: 0.75rem; margin-top: 0.25rem; }
/* Calendar */
.calendar {
  border: 1.5px solid #e5e5e5;
  padding: 1.5rem;
}
.calendar-header {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 1.5rem;
}
.calendar-nav {
  width: 32px; height: 32px;
  border: 1px solid #e5e5e5;
  background: none; cursor: none;
  display: flex; align-items: center; justify-content: center;
  transition: all .3s;
}
.calendar-nav:hover { border-color: var(--gold-d); background: var(--gold-d); color: #fff; }
.calendar-title { font-family: var(--ff-serif); font-size: 1.1rem; color: #111; font-weight: 700; }
.calendar-grid { display: grid; grid-template-columns: repeat(7,1fr); gap: 4px; }
.cal-day-label { font-family: var(--ff-mono); font-size: 0.6rem; letter-spacing: 0.1em; color: #aaa; text-align: center; padding: 0.5rem 0; }
.cal-day {
  aspect-ratio: 1; display: flex; align-items: center; justify-content: center;
  font-family: var(--ff-mono); font-size: 0.75rem;
  cursor: none; transition: all .3s;
  color: #444;
}
.cal-day:not(.disabled):not(.empty):hover { background: rgba(138,109,63,0.1); color: var(--gold-d); }
.cal-day.selected { background: var(--gold-d); color: #fff; }
.cal-day.today { border: 1px solid var(--gold-d); color: var(--gold-d); }
.cal-day.disabled { color: #ddd; cursor: not-allowed; pointer-events: none; }
.cal-day.empty { pointer-events: none; }
/* Time slots */
.time-slots { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; margin-top: 1.5rem; }
.time-slot {
  padding: 0.6rem;
  border: 1px solid #e5e5e5;
  font-family: var(--ff-mono); font-size: 0.7rem;
  text-align: center; cursor: none; transition: all .3s;
  color: #444;
}
.time-slot:hover { border-color: var(--gold-d); color: var(--gold-d); }
.time-slot.selected { background: var(--gold-d); border-color: var(--gold-d); color: #fff; }
/* Form fields */
.field { margin-bottom: 1.5rem; }
.field label { display: block; font-family: var(--ff-mono); font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase; color: #888; margin-bottom: 0.6rem; }
.field input {
  width: 100%; padding: 0.9rem 1.2rem;
  border: 1.5px solid #e5e5e5;
  background: #fafafa;
  font-family: var(--ff-body); font-size: 1rem;
  color: #111; outline: none;
  transition: border-color .3s;
}
.field input:focus { border-color: var(--gold-d); background: #fff; }
.field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.booking-summary {
  background: #f9f7f3;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-left: 3px solid var(--gold-d);
}
.summary-row { display: flex; justify-content: space-between; padding: 0.5rem 0; font-size: 0.95rem; border-bottom: 1px solid rgba(0,0,0,0.06); }
.summary-row:last-child { border: none; font-family: var(--ff-serif); font-size: 1.2rem; font-weight: 700; color: #111; }
.summary-total { color: var(--gold-d); }
.form-btns { display: flex; justify-content: space-between; align-items: center; margin-top: 2rem; }
.btn-back {
  background: none; border: none; cursor: none;
  font-family: var(--ff-mono); font-size: 0.7rem;
  letter-spacing: 0.15em; text-transform: uppercase;
  color: #aaa; display: flex; align-items: center; gap: 0.5rem;
  transition: color .3s;
}
.btn-back:hover { color: #111; }
.btn-next {
  background: var(--gold-d); color: #fff;
  border: none; cursor: none;
  padding: 1rem 2rem;
  font-family: var(--ff-mono); font-size: 0.7rem;
  letter-spacing: 0.2em; text-transform: uppercase;
  font-weight: 500;
  display: flex; align-items: center; gap: 0.75rem;
  transition: all .3s;
}
.btn-next:hover { background: var(--gold); color: #000; }
.booking-confirm {
  text-align: center; padding: 3rem 0;
}
.confirm-icon {
  width: 80px; height: 80px;
  background: #22c55e; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 2rem;
  margin: 0 auto 2rem;
  animation: popIn .6s var(--ease-expo);
}
@keyframes popIn {
  from { transform: scale(0); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}
.confirm-title { font-family: var(--ff-serif); font-size: 2.5rem; color: #111; font-weight: 900; margin-bottom: 1rem; }
.confirm-sub { color: #888; font-size: 0.95rem; margin-bottom: 2.5rem; }

/* ─── ADMIN ──────────────────────────────────────────────── */
#admin { background: var(--ink); padding: 8rem 4rem; max-width: none; }
.admin-inner { max-width: 1400px; margin: 0 auto; }
.admin-kpis { display: grid; grid-template-columns: repeat(4,1fr); gap: 1.5px; background: rgba(201,169,110,0.08); margin: 4rem 0; }
.kpi {
  background: var(--ink2); padding: 2.5rem;
  position: relative; overflow: hidden;
}
.kpi::before {
  content: '';
  position: absolute; top: 0; left: 0;
  width: 3px; height: 100%;
  background: var(--gold);
}
.kpi-icon { font-size: 1.8rem; margin-bottom: 1rem; opacity: 0.7; }
.kpi-value { font-family: var(--ff-serif); font-size: 2.8rem; font-weight: 900; color: var(--gold); line-height: 1; }
.kpi-label { font-family: var(--ff-mono); font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); margin-top: 0.5rem; }
.kpi-change { font-family: var(--ff-mono); font-size: 0.65rem; color: #22c55e; margin-top: 0.75rem; }
/* Table */
.admin-controls {
  display: flex; gap: 1rem; align-items: center;
  margin-bottom: 2rem; flex-wrap: wrap;
}
.admin-search {
  flex: 1; min-width: 200px;
  padding: 0.75rem 1.25rem;
  background: var(--ink2); border: 1px solid var(--ash);
  color: var(--text); font-family: var(--ff-body); font-size: 0.95rem;
  outline: none; transition: border-color .3s;
}
.admin-search:focus { border-color: rgba(201,169,110,0.4); }
.admin-filter {
  padding: 0.75rem 1.5rem;
  background: none; border: 1px solid var(--ash);
  color: var(--muted); cursor: none;
  font-family: var(--ff-mono); font-size: 0.65rem;
  letter-spacing: 0.15em; text-transform: uppercase;
  transition: all .3s;
}
.admin-filter.active, .admin-filter:hover { background: var(--gold); border-color: var(--gold); color: #000; }
.admin-table-wrap { overflow-x: auto; }
.admin-table { width: 100%; border-collapse: separate; border-spacing: 0 2px; }
.admin-table th {
  font-family: var(--ff-mono); font-size: 0.6rem;
  letter-spacing: 0.2em; text-transform: uppercase;
  color: var(--muted); text-align: left;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--ash);
}
.admin-table td {
  padding: 1.25rem 1.5rem;
  background: var(--ink2);
  font-size: 0.9rem;
  border-bottom: 1px solid var(--ash);
  transition: background .2s;
}
.admin-table tr:hover td { background: var(--ink3); }
.status-badge {
  display: inline-flex; align-items: center; gap: 0.4rem;
  padding: 0.3rem 0.75rem;
  font-family: var(--ff-mono); font-size: 0.6rem;
  letter-spacing: 0.1em; text-transform: uppercase;
  border-radius: 999px;
  border: none; cursor: none;
}
.status-badge::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: currentColor; }
.status-badge.confirmado { background: rgba(34,197,94,0.1); color: #22c55e; }
.status-badge.pendiente  { background: rgba(234,179,8,0.1);  color: #eab308; }
.status-badge.cancelado  { background: rgba(239,68,68,0.1);  color: #ef4444; }
.action-btn {
  width: 32px; height: 32px;
  border: 1px solid var(--ash);
  background: none; cursor: none;
  display: inline-flex; align-items: center; justify-content: center;
  font-size: 0.85rem;
  transition: all .3s; margin-left: 4px;
}
.action-btn:hover { border-color: var(--gold); background: rgba(201,169,110,0.1); }
.action-btn.del:hover { border-color: #ef4444; background: rgba(239,68,68,0.1); }
/* Admin charts */
.admin-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 3rem; }
.admin-card { background: var(--ink2); padding: 2rem; border: 1px solid var(--ash); }
.admin-card-title { font-family: var(--ff-serif); font-size: 1.3rem; margin-bottom: 2rem; }
/* Bar chart */
.bar-chart { display: flex; align-items: flex-end; gap: 0.75rem; height: 140px; }
.bar-wrap { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 0.5rem; height: 100%; justify-content: flex-end; }
.bar {
  width: 100%; background: var(--ash);
  position: relative; overflow: hidden;
  transition: height .8s var(--ease-expo);
}
.bar-fill {
  position: absolute; bottom: 0; left: 0; right: 0;
  background: linear-gradient(to top, var(--gold-d), var(--gold-l));
  transition: height 1.2s var(--ease-expo);
}
.bar-label { font-family: var(--ff-mono); font-size: 0.55rem; color: var(--muted); letter-spacing: 0.1em; }
.bar-value { font-family: var(--ff-mono); font-size: 0.6rem; color: var(--gold); }
/* Email section */
.email-list { list-style: none; }
.email-item {
  display: flex; align-items: center; gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--ash);
}
.email-item:last-child { border: none; }
.email-toggle {
  width: 36px; height: 20px;
  background: var(--ash); border-radius: 10px;
  position: relative; cursor: none; border: none;
  transition: background .3s;
  flex-shrink: 0;
}
.email-toggle.on { background: var(--gold); }
.email-toggle-dot {
  width: 14px; height: 14px; border-radius: 50%;
  background: #fff;
  position: absolute; top: 3px; left: 3px;
  transition: transform .3s var(--ease-expo);
}
.email-toggle.on .email-toggle-dot { transform: translateX(16px); }
.email-name { font-size: 0.9rem; color: var(--text); flex: 1; }
.email-status { font-family: var(--ff-mono); font-size: 0.6rem; letter-spacing: 0.1em; }
.email-toggle.on ~ .email-status { color: #22c55e; }
.reminder-send-btn {
  padding: 0.35rem 0.75rem;
  background: rgba(201,169,110,0.1); border: 1px solid rgba(201,169,110,0.2);
  color: var(--gold); font-family: var(--ff-mono); font-size: 0.6rem;
  letter-spacing: 0.1em; cursor: none; transition: all .3s;
}
.reminder-send-btn:hover { background: var(--gold); color: #000; }

/* ─── SCHEDULE ──────────────────────────────────────────── */
#schedule { background: var(--ink3); max-width: none; padding: 8rem 4rem; }
.schedule-inner { max-width: 1400px; margin: 0 auto; }
.schedule-grid { display: grid; grid-template-columns: repeat(7,1fr); gap: 1.5px; background: rgba(201,169,110,0.08); margin-top: 4rem; }
.schedule-day {
  background: var(--ink2); padding: 2rem 1.5rem;
  text-align: center; position: relative;
  transition: background .3s;
}
.schedule-day.closed { background: var(--ink); }
.schedule-day.today-col {
  background: rgba(201,169,110,0.06);
  outline: 1px solid rgba(201,169,110,0.3);
}
.sched-day-letter { font-family: var(--ff-serif); font-size: 2.5rem; font-weight: 900; }
.schedule-day.closed .sched-day-letter { opacity: 0.2; }
.sched-day-name { font-family: var(--ff-mono); font-size: 0.55rem; letter-spacing: 0.2em; color: var(--muted); margin-top: 0.25rem; }
.sched-hours { font-family: var(--ff-mono); font-size: 0.7rem; color: var(--gold); margin-top: 1rem; line-height: 1.8; }
.schedule-day.closed .sched-hours { color: var(--muted); opacity: 0.4; }
.today-badge {
  position: absolute; top: 0.75rem; right: 0.75rem;
  background: var(--gold); color: #000;
  font-family: var(--ff-mono); font-size: 0.5rem;
  letter-spacing: 0.15em; padding: 0.2rem 0.5rem;
  font-weight: 700;
}

/* ─── LOCATION ──────────────────────────────────────────── */
#location { padding: 0; max-width: none; }
.location-grid { display: grid; grid-template-columns: 1fr 1fr; min-height: 500px; }
.location-info {
  background: var(--ink2); padding: 6rem 5rem;
  display: flex; flex-direction: column; justify-content: center;
}
.location-map-placeholder {
  background: var(--ink3);
  position: relative; overflow: hidden;
  display: flex; align-items: center; justify-content: center;
}
.location-map-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(201,169,110,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(201,169,110,0.06) 1px, transparent 1px);
  background-size: 40px 40px;
}
.location-pin {
  position: relative; z-index: 1;
  text-align: center;
}
.location-pin-dot {
  width: 60px; height: 60px;
  border-radius: 50% 50% 50% 0;
  background: var(--gold);
  transform: rotate(-45deg);
  margin: 0 auto 1rem;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 0 40px rgba(201,169,110,0.4);
  animation: pinBounce 2s ease-in-out infinite;
}
.location-pin-dot-inner { transform: rotate(45deg); font-size: 1.5rem; }
@keyframes pinBounce {
  0%,100% { transform: rotate(-45deg) translateY(0); }
  50% { transform: rotate(-45deg) translateY(-10px); }
}
.location-address {
  font-family: var(--ff-serif); font-size: 1.1rem;
  color: #fff; margin-top: 0.5rem;
}
.location-sub { color: var(--muted); font-size: 0.85rem; margin-top: 0.25rem; }
.contact-items { margin-top: 3rem; display: flex; flex-direction: column; gap: 1.5rem; }
.contact-item { display: flex; gap: 1.5rem; align-items: flex-start; }
.contact-item-icon {
  width: 48px; height: 48px; flex-shrink: 0;
  border: 1px solid rgba(201,169,110,0.2);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.2rem;
}
.contact-item-l { font-family: var(--ff-mono); font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); }
.contact-item-v { font-family: var(--ff-serif); font-size: 1.1rem; color: var(--text); }
.whatsapp-btn {
  display: inline-flex; align-items: center; gap: 0.75rem;
  margin-top: 2.5rem;
  background: #25d366; color: #fff;
  padding: 1rem 2rem;
  font-family: var(--ff-mono); font-size: 0.7rem;
  letter-spacing: 0.15em; text-transform: uppercase;
  text-decoration: none; font-weight: 500;
  transition: all .3s;
  border: none; cursor: none;
}
.whatsapp-btn:hover { background: #128c7e; }

/* ─── FOOTER ─────────────────────────────────────────────── */
footer {
  background: #030303;
  padding: 5rem 4rem 2rem;
  border-top: 1px solid rgba(201,169,110,0.08);
}
.footer-inner { max-width: 1400px; margin: 0 auto; }
.footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 4rem; margin-bottom: 4rem; }
.footer-brand p { color: var(--muted); font-size: 0.9rem; font-weight: 300; margin-top: 1.5rem; max-width: 280px; }
.footer-col-title { font-family: var(--ff-mono); font-size: 0.6rem; letter-spacing: 0.25em; text-transform: uppercase; color: var(--gold); margin-bottom: 1.5rem; }
.footer-links { list-style: none; display: flex; flex-direction: column; gap: 0.75rem; }
.footer-links a { color: var(--muted); text-decoration: none; font-size: 0.9rem; font-weight: 300; transition: color .3s; }
.footer-links a:hover { color: var(--gold); }
.footer-bottom {
  border-top: 1px solid var(--ash);
  padding-top: 2rem;
  display: flex; justify-content: space-between; align-items: center;
  font-family: var(--ff-mono); font-size: 0.6rem;
  letter-spacing: 0.1em; color: var(--muted);
}
.footer-social { display: flex; gap: 1rem; }
.social-link {
  width: 36px; height: 36px;
  border: 1px solid var(--ash);
  display: flex; align-items: center; justify-content: center;
  color: var(--muted); font-size: 0.9rem;
  text-decoration: none;
  transition: all .3s;
}
.social-link:hover { border-color: var(--gold); color: var(--gold); }

/* ─── NOTIFICATION ─────────────────────────────────────── */
#notif {
  position: fixed; bottom: 2rem; right: 2rem; z-index: 1000;
  background: var(--ink2); border: 1px solid rgba(201,169,110,0.2);
  padding: 1.25rem 2rem;
  font-family: var(--ff-mono); font-size: 0.7rem; letter-spacing: 0.1em;
  color: var(--gold);
  transform: translateY(100px); opacity: 0;
  transition: all .5s var(--ease-expo);
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
  pointer-events: none;
  display: flex; align-items: center; gap: 0.75rem;
}
#notif.show { transform: translateY(0); opacity: 1; }
#notif::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 8px #22c55e; flex-shrink: 0; }

/* ─── RESPONSIVE ────────────────────────────────────────── */
@media (max-width: 1100px) {
  nav { padding: 1.2rem 2rem; }
  nav.scrolled { padding: 0.8rem 2rem; }
  .nav-links { gap: 1.5rem; }
  section { padding: 6rem 2rem; }
  #services, #booking, #schedule, #admin, #gallery { padding: 6rem 2rem; }
  footer { padding: 4rem 2rem 2rem; }
  .hero-content { grid-template-columns: 1fr; padding: 0 2rem; }
  .hero-image-stack { display: none; }
  .services-grid { grid-template-columns: 1fr 1fr; }
  .team-grid { grid-template-columns: 1fr 1fr; }
  .booking-grid { grid-template-columns: 1fr; gap: 3rem; }
  .gallery-grid { grid-template-columns: 1fr 1fr; grid-template-rows: auto; }
  .gallery-item:first-child { grid-row: span 1; }
  .admin-kpis { grid-template-columns: 1fr 1fr; }
  .admin-grid { grid-template-columns: 1fr; }
  .footer-grid { grid-template-columns: 1fr 1fr; gap: 2rem; }
  .location-grid { grid-template-columns: 1fr; }
  .location-map-placeholder { min-height: 300px; }
  .schedule-grid { grid-template-columns: repeat(4,1fr); }
}
@media (max-width: 768px) {
  body { cursor: auto; }
  #cursor, #cursor-ring { display: none; }
  .nav-links { display: none; }
  .nav-hamburger { display: flex; flex-direction: column; }
  .services-grid, .team-grid { grid-template-columns: 1fr; }
  .form-grid { grid-template-columns: 1fr; }
  .field-row { grid-template-columns: 1fr; }
  .time-slots { grid-template-columns: repeat(3,1fr); }
  .admin-kpis { grid-template-columns: 1fr 1fr; }
  .footer-grid { grid-template-columns: 1fr; }
  .schedule-grid { grid-template-columns: repeat(4,1fr); }
  .gallery-grid { grid-template-columns: 1fr; }
}
</style>
</head>
<body>

<div id="cursor"></div>
<div id="cursor-ring"></div>
<div id="notif">Operación completada</div>

<!-- ─── NAV ─── -->
<nav id="nav">
  <a href="#" class="nav-logo" onclick="scrollToTop()">
    <div class="nav-logo-mark">N</div>
    <span class="nav-logo-text">NOIR<span>&</span>CO</span>
  </a>
  <ul class="nav-links">
    <li><a href="#services">Servicios</a></li>
    <li><a href="#team">Equipo</a></li>
    <li><a href="#gallery">Galería</a></li>
    <li><a href="#schedule">Horarios</a></li>
    <li><a href="#location">Ubicación</a></li>
    <li><a href="#admin">Admin</a></li>
    <li><a href="#booking" class="nav-cta">Reservar</a></li>
  </ul>
  <button class="nav-hamburger" onclick="toggleMenu()">
    <span></span><span></span><span></span>
  </button>
</nav>

<!-- ─── HERO ─── -->
<section class="hero" id="home">
  <div class="hero-bg"></div>
  <div class="hero-overlay"></div>
  <div class="hero-grid"></div>
  <div class="hero-content">
    <div>
      <div class="hero-badge">
        <span class="hero-badge-dot"></span>
        Abierto Lun–Sáb · 09:00–19:00
      </div>
      <h1 class="hero-title">
        THE<br>
        <em>Art of</em><br>
        <span class="outline">GROOMING</span>
      </h1>
      <p class="hero-desc">
        Barbería de lujo con técnica artesanal. Donde cada corte es una obra de precisión y cada visita, una experiencia irrepetible.
      </p>
      <div class="hero-actions">
        <a href="#booking" class="btn-primary"><span>✦ Agendar mi hora</span></a>
        <button class="btn-secondary" onclick="scrollToSection('team')">↓ Conoce el equipo</button>
      </div>
      <div class="hero-stats">
        <div>
          <div class="hero-stat-num">1.2K+</div>
          <div class="hero-stat-label">Clientes</div>
        </div>
        <div>
          <div class="hero-stat-num">4.9★</div>
          <div class="hero-stat-label">Valoración</div>
        </div>
        <div>
          <div class="hero-stat-num">8</div>
          <div class="hero-stat-label">Años</div>
        </div>
        <div>
          <div class="hero-stat-num">3</div>
          <div class="hero-stat-label">Maestros</div>
        </div>
      </div>
    </div>
    <div class="hero-image-stack">
      <img class="hero-img-main" src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=85&auto=format" alt="Barbero profesional" />
      <img class="hero-img-secondary" src="https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=500&q=85&auto=format" alt="Detalle corte" />
      <div class="hero-img-accent">
        <span class="hero-img-accent-inner">✦</span>
      </div>
    </div>
  </div>
  <div class="hero-scroll">
    <span>Scroll</span>
    <div class="hero-scroll-line"></div>
  </div>
</section>

<!-- ─── MARQUEE ─── -->
<div class="marquee-wrapper">
  <div class="marquee-track" id="marqueeTrack"></div>
</div>

<!-- ─── SERVICES ─── -->
<section id="services" class="section-full">
  <div class="services-inner">
    <div class="services-header">
      <div>
        <div class="section-label">Lo que hacemos</div>
        <h2 class="section-title">Nuestros<br><em>Servicios</em></h2>
      </div>
      <p style="max-width:380px;color:var(--muted);font-weight:300;font-size:1rem;">
        Cada servicio es realizado con productos de primera línea y técnicas desarrolladas a lo largo de años de práctica.
      </p>
    </div>
    <div class="services-grid" id="servicesGrid"></div>
  </div>
</section>

<!-- ─── TEAM ─── -->
<section id="team">
  <div class="section-label">Nuestro equipo</div>
  <h2 class="section-title">Los<br><em>Maestros</em></h2>
  <div class="team-grid" id="teamGrid"></div>
</section>

<!-- ─── GALLERY ─── -->
<section id="gallery" class="section-full">
  <div class="gallery-header">
    <div class="section-label">Nuestro trabajo</div>
    <h2 class="section-title">La <em>Galería</em></h2>
  </div>
  <div class="gallery-grid">
    <div class="gallery-item">
      <img src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=1000&q=85&auto=format" alt="Corte" />
      <div class="gallery-item-label">Corte Premium</div>
    </div>
    <div class="gallery-item">
      <img src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=85&auto=format" alt="Barbero" />
      <div class="gallery-item-label">El Maestro</div>
    </div>
    <div class="gallery-item">
      <img src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=85&auto=format" alt="Herramientas" />
      <div class="gallery-item-label">Herramientas</div>
    </div>
    <div class="gallery-item">
      <img src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&q=85&auto=format" alt="Diseño barba" />
      <div class="gallery-item-label">Diseño de Barba</div>
    </div>
    <div class="gallery-item">
      <img src="https://images.unsplash.com/photo-1622288432450-277d0fef5ed6?w=800&q=85&auto=format" alt="Ambiente" />
      <div class="gallery-item-label">El Ambiente</div>
    </div>
  </div>
</section>

<!-- ─── BOOKING ─── -->
<section id="booking" class="section-full">
  <div class="booking-inner">
    <div class="booking-grid">
      <div class="booking-left">
        <div class="section-label">Reserva online</div>
        <h2 class="section-title" style="color:#111">Agenda<br><em>Tu hora</em></h2>
        <div class="booking-info">
          <div class="booking-info-item">
            <div class="booking-info-icon">📍</div>
            <div>
              <div class="booking-info-label">Dirección</div>
              <div class="booking-info-value">Av. Apoquindo 4501, Las Condes</div>
            </div>
          </div>
          <div class="booking-info-item">
            <div class="booking-info-icon">📅</div>
            <div>
              <div class="booking-info-label">Horario</div>
              <div class="booking-info-value">Lunes a Sábado, 09:00–19:00</div>
            </div>
          </div>
          <div class="booking-info-item">
            <div class="booking-info-icon">✉️</div>
            <div>
              <div class="booking-info-label">Confirmación</div>
              <div class="booking-info-value">Email + WhatsApp automático</div>
            </div>
          </div>
          <div class="booking-info-item">
            <div class="booking-info-icon">🔔</div>
            <div>
              <div class="booking-info-label">Recordatorio</div>
              <div class="booking-info-value">24 horas antes de tu cita</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="booking-form-wrap">
          <!-- Steps indicator -->
          <div class="booking-steps" id="stepsIndicator"></div>
          <!-- Steps content -->
          <div id="step1" class="form-section active">
            <div class="form-title">¿Qué servicio quieres?</div>
            <div class="form-grid" id="serviceOptions"></div>
            <div class="form-btns">
              <span></span>
              <button class="btn-next" onclick="goStep(2)"><span>Continuar</span> →</button>
            </div>
          </div>
          <div id="step2" class="form-section">
            <div class="form-title">¿Con qué maestro?</div>
            <div style="display:grid;gap:1rem;" id="proOptions"></div>
            <div class="form-btns">
              <button class="btn-back" onclick="goStep(1)">← Atrás</button>
              <button class="btn-next" onclick="goStep(3)"><span>Continuar</span> →</button>
            </div>
          </div>
          <div id="step3" class="form-section">
            <div class="form-title">¿Cuándo te acomoda?</div>
            <div class="calendar" id="calendar"></div>
            <div class="time-slots" id="timeSlots" style="display:none"></div>
            <div class="form-btns">
              <button class="btn-back" onclick="goStep(2)">← Atrás</button>
              <button class="btn-next" onclick="goStep(4)" id="nextStep4" style="display:none"><span>Continuar</span> →</button>
            </div>
          </div>
          <div id="step4" class="form-section">
            <div class="form-title">Tus datos</div>
            <div class="field"><label>Nombre completo *</label><input type="text" id="fname" placeholder="Juan Pérez"></div>
            <div class="field-row">
              <div class="field"><label>Email *</label><input type="email" id="femail" placeholder="juan@email.cl"></div>
              <div class="field"><label>Teléfono *</label><input type="tel" id="fphone" placeholder="+56 9 1234 5678"></div>
            </div>
            <div class="booking-summary" id="bookingSummary"></div>
            <div class="form-btns">
              <button class="btn-back" onclick="goStep(3)">← Atrás</button>
              <button class="btn-next" onclick="confirmBooking()"><span>✦ Confirmar Reserva</span></button>
            </div>
          </div>
          <div id="step5" class="form-section">
            <div class="booking-confirm">
              <div class="confirm-icon">✓</div>
              <div class="confirm-title">¡Reserva confirmada!</div>
              <div class="confirm-sub">Te enviamos los detalles por email y recibirás un recordatorio por WhatsApp 24h antes.</div>
              <div class="booking-summary" id="confirmSummary"></div>
              <button class="btn-next" onclick="resetBooking()" style="margin:1.5rem auto 0;display:flex"><span>✦ Hacer otra reserva</span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ─── SCHEDULE ─── -->
<section id="schedule" class="section-full">
  <div class="schedule-inner">
    <div class="section-label">Cuándo abrimos</div>
    <h2 class="section-title">Horario<br><em>Semanal</em></h2>
    <div class="schedule-grid" id="scheduleGrid"></div>
  </div>
</section>

<!-- ─── LOCATION ─── -->
<section id="location" style="padding:0;max-width:none;">
  <div class="location-grid">
    <div class="location-info">
      <div class="section-label">Dónde estamos</div>
      <h2 class="section-title">Nuestra<br><em>Ubicación</em></h2>
      <div class="contact-items">
        <div class="contact-item">
          <div class="contact-item-icon">📍</div>
          <div>
            <div class="contact-item-l">Dirección</div>
            <div class="contact-item-v">Av. Apoquindo 4501, Las Condes</div>
          </div>
        </div>
        <div class="contact-item">
          <div class="contact-item-icon">📞</div>
          <div>
            <div class="contact-item-l">Teléfono</div>
            <div class="contact-item-v">+56 2 1234 5678</div>
          </div>
        </div>
        <div class="contact-item">
          <div class="contact-item-icon">✉️</div>
          <div>
            <div class="contact-item-l">Email</div>
            <div class="contact-item-v">hola@noirbarberia.cl</div>
          </div>
        </div>
      </div>
      <button class="whatsapp-btn">💬 Escribir por WhatsApp</button>
    </div>
    <div class="location-map-placeholder">
      <div class="location-map-grid"></div>
      <div class="location-pin">
        <div class="location-pin-dot"><div class="location-pin-dot-inner">N</div></div>
        <div class="location-address">Av. Apoquindo 4501</div>
        <div class="location-sub">Las Condes, Santiago</div>
      </div>
    </div>
  </div>
</section>

<!-- ─── ADMIN ─── -->
<section id="admin" class="section-full">
  <div class="admin-inner">
    <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:2rem">
      <div>
        <div class="section-label">Panel de control</div>
        <h2 class="section-title">Admin<em>istración</em></h2>
      </div>
      <div style="font-family:var(--ff-mono);font-size:0.7rem;color:var(--muted)">
        Simulación de backend Python (Flask/FastAPI)
      </div>
    </div>
    <div class="admin-kpis" id="adminKpis"></div>
    <div class="admin-controls">
      <input class="admin-search" id="adminSearch" placeholder="Buscar cliente, servicio..." oninput="filterTable()">
      <button class="admin-filter active" onclick="setFilter('todos',this)">Todos</button>
      <button class="admin-filter" onclick="setFilter('confirmado',this)">Confirmados</button>
      <button class="admin-filter" onclick="setFilter('pendiente',this)">Pendientes</button>
      <button class="admin-filter" onclick="setFilter('cancelado',this)">Cancelados</button>
      <button class="btn-primary" style="padding:.7rem 1.5rem;font-family:var(--ff-mono);font-size:0.65rem;letter-spacing:.15em;text-transform:uppercase;cursor:none;" onclick="simulatePython()">
        <span>⚡ Ejecutar Python</span>
      </button>
    </div>
    <div class="admin-table-wrap">
      <table class="admin-table" id="adminTable">
        <thead>
          <tr>
            <th>Cliente</th><th>Servicio</th><th>Profesional</th>
            <th>Fecha</th><th>Hora</th><th>Estado</th><th>Total</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody id="adminTbody"></tbody>
      </table>
    </div>
    <div class="admin-grid">
      <div class="admin-card">
        <div class="admin-card-title">📊 Ingresos por profesional</div>
        <div class="bar-chart" id="barChart"></div>
      </div>
      <div class="admin-card">
        <div class="admin-card-title">✉️ Correos & recordatorios automáticos</div>
        <ul class="email-list" id="emailList"></ul>
        <div style="margin-top:1.5rem;padding:1rem;background:var(--ash);font-family:var(--ff-mono);font-size:0.65rem;color:var(--muted);line-height:1.8;">
          <span style="color:var(--gold)"># Python backend simulado</span><br>
          <span style="color:#a8ff78">import</span> smtplib, schedule<br>
          reminder_service.send_24h_reminder(<span style="color:var(--gold)">'appointments'</span>)<br>
          <span style="color:var(--muted)"># → Ejecutado: Lun–Sáb 09:00</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ─── FOOTER ─── -->
<footer>
  <div class="footer-inner">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="nav-logo" style="display:inline-flex;margin-bottom:.5rem;">
          <div class="nav-logo-mark">N</div>
          <span class="nav-logo-text" style="margin-left:.75rem">NOIR<span style="color:var(--gold)">&</span>CO</span>
        </div>
        <p>Barbería de lujo. Precisión artesanal. Experiencia irrepetible. Est. 2016, Santiago de Chile.</p>
      </div>
      <div>
        <div class="footer-col-title">Navegar</div>
        <ul class="footer-links">
          <li><a href="#services">Servicios</a></li>
          <li><a href="#team">Equipo</a></li>
          <li><a href="#gallery">Galería</a></li>
          <li><a href="#booking">Reservar</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-title">Horarios</div>
        <ul class="footer-links">
          <li><a href="#">Lun–Vie: 09–19h</a></li>
          <li><a href="#">Sábado: 09–19h</a></li>
          <li><a href="#">Domingo: Cerrado</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-title">Contacto</div>
        <ul class="footer-links">
          <li><a href="#">+56 2 1234 5678</a></li>
          <li><a href="#">hola@noirbarberia.cl</a></li>
          <li><a href="#">Av. Apoquindo 4501</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Noir & Co. Todos los derechos reservados.</span>
      <div class="footer-social">
        <a href="#" class="social-link">ig</a>
        <a href="#" class="social-link">fb</a>
        <a href="#" class="social-link">tw</a>
      </div>
    </div>
  </div>
</footer>

<script>
// ─── DATA ─────────────────────────────────────────────────────────────
const SERVICES = [
  { id:1, icon:'✂️', name:'Corte Clásico',   price:12000, duration:'30 min', desc:'Tijera y máquina. Perfilado impecable. El clásico que nunca falla.' },
  { id:2, icon:'🪒', name:'Corte + Barba',   price:18000, duration:'45 min', desc:'El pack completo. Corte y diseño de barba con navaja recta caliente.' },
  { id:3, icon:'🔥', name:'Diseño de Barba', price:9000,  duration:'30 min', desc:'Perfilado, definición y styling. Para una barba perfectamente esculpida.' },
  { id:4, icon:'👑', name:'Corte Premium',   price:25000, duration:'60 min', desc:'Ritual completo: lavado, corte, mascarilla facial, secado y styling.' },
];
const PROS = [
  { id:1, name:'Andrés F.', spec:'Cortes Clásicos & Fade', rating:'4.9', cuts:'1.240', img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop&crop=faces', bio:'12 años de experiencia. Especialista en fades y cortes clásicos americanos.' },
  { id:2, name:'Camila R.', spec:'Corte + Barba Femenino', rating:'5.0', cuts:'980',   img:'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&q=80&auto=format&fit=crop&crop=faces', bio:'Primera maestra barbera del equipo. Especialista en diseños de barba y coloración.' },
  { id:3, name:'Sebastián M.', spec:'Diseño & Textura',    rating:'4.8', cuts:'1.560', img:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop&crop=faces', bio:'Referente en cortes de textura y técnicas internacionales. Ex-instructor.' },
];
const SCHEDULE = [
  { day:'L', name:'LUN', h:'09:00\n19:00', open:true },
  { day:'M', name:'MAR', h:'09:00\n19:00', open:true },
  { day:'M', name:'MIÉ', h:'09:00\n19:00', open:true },
  { day:'J', name:'JUE', h:'09:00\n19:00', open:true },
  { day:'V', name:'VIE', h:'09:00\n20:00', open:true },
  { day:'S', name:'SÁB', h:'09:00\n19:00', open:true },
  { day:'D', name:'DOM', h:'Cerrado',       open:false },
];
const TIME_SLOTS = ['09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30'];
const MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const EMAIL_CONFIGS = [
  { name:'Confirmación de reserva',   on:true },
  { name:'Recordatorio 24h antes',    on:true },
  { name:'Recordatorio 1h antes',     on:false },
  { name:'Encuesta post-servicio',    on:false },
  { name:'Recordatorio de fidelidad', on:true },
];

let appointments = [
  { id:1, client:'Martín Riquelme', service:'Corte Clásico',   pro:'Andrés F.',    date:'17/05/2026', time:'10:00', status:'confirmado', total:12000, email:'martin@email.cl' },
  { id:2, client:'Diego Soto',      service:'Corte + Barba',   pro:'Camila R.',    date:'17/05/2026', time:'11:30', status:'pendiente',  total:18000, email:'diego@email.cl' },
  { id:3, client:'Felipe Mora',     service:'Corte Premium',   pro:'Sebastián M.', date:'18/05/2026', time:'14:00', status:'confirmado', total:25000, email:'felipe@email.cl' },
  { id:4, client:'Ignacio Vega',    service:'Diseño de Barba', pro:'Andrés F.',    date:'19/05/2026', time:'16:30', status:'cancelado',  total:9000,  email:'ignacio@email.cl' },
  { id:5, client:'Tomás Herrera',   service:'Corte Clásico',   pro:'Sebastián M.', date:'20/05/2026', time:'09:00', status:'confirmado', total:12000, email:'tomas@email.cl' },
];

// Booking state
let booking = { service:null, pro:null, date:null, time:null };
let calYear=2026, calMonth=4;
let filterState='todos';
let emailConfigs = EMAIL_CONFIGS.map(e => ({...e}));

// ─── CURSOR ─────────────────────────────────────────────────────────────
const cur = document.getElementById('cursor');
const curRing = document.getElementById('cursor-ring');
let mouseX=0, mouseY=0, ringX=0, ringY=0;
document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cur.style.left = mouseX+'px'; cur.style.top = mouseY+'px';
});
function animRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  curRing.style.left = ringX+'px'; curRing.style.top = ringY+'px';
  requestAnimationFrame(animRing);
}
animRing();
document.querySelectorAll('a,button,[style*="cursor:none"]').forEach(el => {
  el.addEventListener('mouseenter', () => { cur.style.width='20px'; cur.style.height='20px'; curRing.style.width='56px'; curRing.style.height='56px'; });
  el.addEventListener('mouseleave', () => { cur.style.width='12px'; cur.style.height='12px'; curRing.style.width='36px'; curRing.style.height='36px'; });
});

// ─── NAV SCROLL ──────────────────────────────────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 60);
});
function scrollToTop() { window.scrollTo({top:0,behavior:'smooth'}); }
function scrollToSection(id) { document.getElementById(id).scrollIntoView({behavior:'smooth'}); }
function toggleMenu() {}

// ─── MARQUEE ─────────────────────────────────────────────────────────────
const marqueeItems = ['Cortes Clásicos','✦','Diseño de Barba','✦','Fade Perfecto','✦','Afeitado con Navaja','✦','Barbería Premium','✦','Est. 2016','✦','Las Condes, Santiago','✦'];
const mt = document.getElementById('marqueeTrack');
const full = [...marqueeItems,...marqueeItems].map(t => `<span class="marquee-item">${t === '✦' ? '<span class="marquee-sep">✦</span>' : t}</span>`).join('');
mt.innerHTML = full + full;

// ─── SERVICES GRID ───────────────────────────────────────────────────────
document.getElementById('servicesGrid').innerHTML = SERVICES.map(s => `
  <div class="service-card">
    <div class="service-icon">${s.icon}</div>
    <div class="service-name">${s.name}</div>
    <div class="service-desc">${s.desc}</div>
    <div class="service-meta">
      <div class="service-price">${fmt(s.price)}</div>
      <div class="service-duration">${s.duration}</div>
    </div>
    <button class="service-cta" onclick="selectServiceAndScroll(${s.id})">→</button>
  </div>
`).join('');

// ─── TEAM GRID ───────────────────────────────────────────────────────────
document.getElementById('teamGrid').innerHTML = PROS.map(p => `
  <div class="team-card">
    <div class="team-card-img-wrap">
      <img class="team-card-img" src="${p.img}" alt="${p.name}" />
      <div class="team-card-overlay"></div>
      <div class="team-card-badge">${p.rating} ★</div>
    </div>
    <div class="team-card-content">
      <div class="team-name">${p.name}</div>
      <div class="team-specialty">${p.spec}</div>
      <div class="team-bio">${p.bio}</div>
      <div class="team-stats">
        <div class="team-stat"><div class="team-stat-n">${p.cuts}</div><div class="team-stat-l">Cortes</div></div>
        <div class="team-stat"><div class="team-stat-n">${p.rating}★</div><div class="team-stat-l">Rating</div></div>
      </div>
      <button class="team-book-btn" onclick="selectProAndScroll(${p.id})">Reservar con ${p.name.split(' ')[0]} →</button>
    </div>
  </div>
`).join('');

// ─── SCHEDULE GRID ────────────────────────────────────────────────────────
const todayDow = new Date().getDay();
document.getElementById('scheduleGrid').innerHTML = SCHEDULE.map((d,i) => {
  const isToday = (i === 6 ? todayDow === 0 : todayDow === i+1);
  return `
    <div class="schedule-day ${!d.open?'closed':''} ${isToday?'today-col':''}">
      ${isToday ? '<div class="today-badge">HOY</div>' : ''}
      <div class="sched-day-letter">${d.day}</div>
      <div class="sched-day-name">${d.name}</div>
      <div class="sched-hours">${d.h.replace('\n','<br>')}</div>
    </div>`;
}).join('');

// ─── BOOKING STEPS ───────────────────────────────────────────────────────
let currentStep = 1;
const stepLabels = ['Servicio','Profesional','Fecha','Datos'];
function renderSteps() {
  document.getElementById('stepsIndicator').innerHTML = stepLabels.map((l,i) => `
    <div class="booking-step ${currentStep === i+1 ? 'active' : ''} ${currentStep > i+1 ? 'done' : ''}">
      <div class="booking-step-num">${currentStep > i+1 ? '✓' : i+1}</div>
      <div class="booking-step-label">${l}</div>
    </div>
  `).join('');
}

// Service options
document.getElementById('serviceOptions').innerHTML = SERVICES.map(s => `
  <div class="service-option" id="sopt_${s.id}" onclick="selectService(${s.id})">
    <div class="service-opt-name">${s.icon} ${s.name}</div>
    <div class="service-opt-meta">${s.duration}</div>
    <div class="service-opt-price">${fmt(s.price)}</div>
  </div>
`).join('');

// Pro options
document.getElementById('proOptions').innerHTML = PROS.map(p => `
  <div class="pro-option" id="popt_${p.id}" onclick="selectPro(${p.id})" style="display:flex;align-items:center;gap:1.25rem;">
    <img class="pro-opt-avatar" src="${p.img}" alt="${p.name}" />
    <div>
      <div class="pro-opt-name">${p.name}</div>
      <div class="pro-opt-spec">${p.spec}</div>
      <div class="pro-opt-rating">${p.rating} ★</div>
    </div>
  </div>
`).join('');

function selectService(id) {
  booking.service = SERVICES.find(s => s.id === id);
  document.querySelectorAll('.service-option').forEach(el => el.classList.remove('selected'));
  document.getElementById('sopt_'+id).classList.add('selected');
}
function selectPro(id) {
  booking.pro = PROS.find(p => p.id === id);
  document.querySelectorAll('.pro-option').forEach(el => el.classList.remove('selected'));
  document.getElementById('popt_'+id).classList.add('selected');
}
function selectServiceAndScroll(id) {
  selectService(id);
  document.getElementById('booking').scrollIntoView({behavior:'smooth'});
  setTimeout(() => goStep(2), 600);
}
function selectProAndScroll(id) {
  selectPro(id);
  document.getElementById('booking').scrollIntoView({behavior:'smooth'});
  setTimeout(() => goStep(2), 600);
}

function goStep(n) {
  if (n === 2 && !booking.service) { notify('Selecciona un servicio primero'); return; }
  if (n === 3 && !booking.pro) { notify('Selecciona un profesional primero'); return; }
  if (n === 4 && (!booking.date || !booking.time)) { notify('Selecciona fecha y hora'); return; }
  document.querySelectorAll('.form-section').forEach(el => el.classList.remove('active'));
  document.getElementById('step'+n).classList.add('active');
  currentStep = n;
  renderSteps();
  if (n === 3) renderCalendar();
  if (n === 4) renderSummary('bookingSummary');
}

// ─── CALENDAR ────────────────────────────────────────────────────────────
function renderCalendar() {
  const daysInMonth = new Date(calYear, calMonth+1, 0).getDate();
  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const firstDayAdj = firstDay === 0 ? 6 : firstDay - 1;
  const today = new Date();
  let html = `
    <div class="calendar-header">
      <button class="calendar-nav" onclick="prevMonth()">‹</button>
      <div class="calendar-title">${MONTHS[calMonth]} ${calYear}</div>
      <button class="calendar-nav" onclick="nextMonth()">›</button>
    </div>
    <div class="calendar-grid">
      ${['LU','MA','MI','JU','VI','SÁ','DO'].map(d => `<div class="cal-day-label">${d}</div>`).join('')}
      ${Array(firstDayAdj).fill('<div class="cal-day empty"></div>').join('')}
  `;
  for (let d=1; d<=daysInMonth; d++) {
    const thisDate = new Date(calYear, calMonth, d);
    const isPast = thisDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const isSun = thisDate.getDay() === 0;
    const isSel = booking.date && booking.date.getDate()===d && booking.date.getMonth()===calMonth && booking.date.getFullYear()===calYear;
    const isTod = today.getDate()===d && today.getMonth()===calMonth && today.getFullYear()===calYear;
    let cls = 'cal-day';
    if (isPast || isSun) cls += ' disabled';
    if (isSel) cls += ' selected';
    else if (isTod) cls += ' today';
    html += `<div class="${cls}" onclick="selectDate(${d})">${d}</div>`;
  }
  html += '</div>';
  document.getElementById('calendar').innerHTML = html;
  renderTimeSlots();
}
function prevMonth() { if(calMonth===0){calMonth=11;calYear--;}else calMonth--; renderCalendar(); }
function nextMonth() { if(calMonth===11){calMonth=0;calYear++;}else calMonth++; renderCalendar(); }
function selectDate(d) {
  booking.date = new Date(calYear, calMonth, d);
  booking.time = null;
  renderCalendar();
  const ts = document.getElementById('timeSlots');
  ts.style.display = 'grid';
  document.getElementById('nextStep4').style.display = 'none';
}
function renderTimeSlots() {
  if (!booking.date) return;
  document.getElementById('timeSlots').innerHTML = TIME_SLOTS.map(t => `
    <div class="time-slot ${booking.time===t?'selected':''}" onclick="selectTime('${t}')">${t}</div>
  `).join('');
}
function selectTime(t) {
  booking.time = t;
  renderTimeSlots();
  document.getElementById('nextStep4').style.display = 'flex';
}

// ─── SUMMARY & CONFIRM ───────────────────────────────────────────────────
function renderSummary(id) {
  const dateStr = booking.date ? booking.date.toLocaleDateString('es-CL',{day:'numeric',month:'long',year:'numeric'}) : '-';
  document.getElementById(id).innerHTML = `
    <div class="summary-row"><span style="color:#888">Servicio</span><span>${booking.service?.name||'-'}</span></div>
    <div class="summary-row"><span style="color:#888">Profesional</span><span>${booking.pro?.name||'-'}</span></div>
    <div class="summary-row"><span style="color:#888">Fecha</span><span>${dateStr}</span></div>
    <div class="summary-row"><span style="color:#888">Hora</span><span>${booking.time||'-'}</span></div>
    <div class="summary-row"><span>Total</span><span class="summary-total">${fmt(booking.service?.price||0)}</span></div>
  `;
}
function confirmBooking() {
  const name = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const phone = document.getElementById('fphone').value.trim();
  if (!name || !email.includes('@') || phone.length < 7) { notify('Completa todos los campos correctamente'); return; }
  const dateStr = booking.date ? `${String(booking.date.getDate()).padStart(2,'0')}/${String(booking.date.getMonth()+1).padStart(2,'0')}/${booking.date.getFullYear()}` : '-';
  appointments.push({
    id: Date.now(), client: name, service: booking.service.name,
    pro: booking.pro.name, date: dateStr, time: booking.time,
    status: 'confirmado', total: booking.service.price, email
  });
  renderAdminTable();
  renderKpis();
  renderBarChart();
  renderSummary('confirmSummary');
  goStep(5);
  notify('✉️ Email de confirmación enviado a ' + email);
}
function resetBooking() {
  booking = {service:null,pro:null,date:null,time:null};
  document.querySelectorAll('.service-option,.pro-option').forEach(el=>el.classList.remove('selected'));
  goStep(1);
}
renderSteps();

// ─── ADMIN ───────────────────────────────────────────────────────────────
function fmt(n) { return new Intl.NumberFormat('es-CL',{style:'currency',currency:'CLP',maximumFractionDigits:0}).format(n); }

function renderKpis() {
  const confirmed = appointments.filter(a=>a.status==='confirmado');
  const pending   = appointments.filter(a=>a.status==='pendiente');
  const revenue   = confirmed.reduce((s,a)=>s+a.total,0);
  document.getElementById('adminKpis').innerHTML = [
    { icon:'📅', val: appointments.length, label:'Total citas', change:'+3 esta semana' },
    { icon:'✅', val: confirmed.length,    label:'Confirmadas',  change:`${Math.round(confirmed.length/appointments.length*100)}% del total` },
    { icon:'⏳', val: pending.length,      label:'Pendientes',   change:'Requieren atención' },
    { icon:'💰', val: fmt(revenue),        label:'Ingresos',     change:'+12% vs semana anterior' },
  ].map(k => `
    <div class="kpi">
      <div class="kpi-icon">${k.icon}</div>
      <div class="kpi-value">${k.val}</div>
      <div class="kpi-label">${k.label}</div>
      <div class="kpi-change">${k.change}</div>
    </div>
  `).join('');
}

function renderAdminTable(list = null) {
  const data = list ?? appointments.filter(a => filterState==='todos' || a.status===filterState)
    .filter(a => {
      const q = document.getElementById('adminSearch')?.value.toLowerCase()||'';
      return !q || a.client.toLowerCase().includes(q) || a.service.toLowerCase().includes(q);
    });
  document.getElementById('adminTbody').innerHTML = data.map(a => `
    <tr>
      <td>
        <div style="font-weight:700;color:var(--text)">${a.client}</div>
        <div style="font-size:.75rem;color:var(--muted)">${a.email}</div>
      </td>
      <td style="color:var(--muted)">${a.service}</td>
      <td style="color:var(--muted)">${a.pro}</td>
      <td style="color:var(--muted)">${a.date}</td>
      <td style="color:var(--gold);font-family:var(--ff-mono);font-size:.8rem">${a.time}</td>
      <td>
        <select class="status-badge ${a.status}" onchange="updateStatus(${a.id},this.value)" style="cursor:none;background:transparent;border:none;outline:none;font-family:var(--ff-mono);font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;padding:.3rem .75rem;">
          <option value="confirmado" ${a.status==='confirmado'?'selected':''}>✓ Confirmado</option>
          <option value="pendiente"  ${a.status==='pendiente' ?'selected':''}>⏳ Pendiente</option>
          <option value="cancelado"  ${a.status==='cancelado' ?'selected':''}>✕ Cancelado</option>
        </select>
      </td>
      <td style="font-family:var(--ff-serif);color:var(--gold);font-weight:700">${fmt(a.total)}</td>
      <td>
        <button class="action-btn" onclick="sendReminder(${a.id})" title="Recordatorio">📱</button>
        <button class="action-btn del" onclick="deleteAppt(${a.id})" title="Eliminar">✕</button>
      </td>
    </tr>
  `).join('') || `<tr><td colspan="8" style="text-align:center;padding:3rem;color:var(--muted)">No hay citas</td></tr>`;
}

function updateStatus(id, status) {
  appointments = appointments.map(a => a.id===id ? {...a,status} : a);
  renderAdminTable(); renderKpis(); renderBarChart();
}
function deleteAppt(id) {
  appointments = appointments.filter(a => a.id!==id);
  renderAdminTable(); renderKpis(); renderBarChart();
  notify('Cita eliminada del sistema');
}
function sendReminder(id) {
  const a = appointments.find(x=>x.id===id);
  if(a) notify(`📱 Recordatorio enviado a ${a.client} (${a.email})`);
}
function setFilter(f, btn) {
  filterState = f;
  document.querySelectorAll('.admin-filter').forEach(el=>el.classList.remove('active'));
  btn.classList.add('active');
  renderAdminTable();
}
function filterTable() { renderAdminTable(); }
function simulatePython() {
  notify('⚡ Script Python ejecutado: 3 recordatorios enviados');
}

function renderBarChart() {
  const chart = document.getElementById('barChart');
  const days = ['Lun','Mar','Mié','Jue','Vie','Sáb'];
  const vals = [3,5,2,7,6,4];
  const max = Math.max(...vals);
  chart.innerHTML = days.map((d,i) => `
    <div class="bar-wrap">
      <div class="bar-value">${vals[i]}</div>
      <div class="bar" style="height:${Math.round(vals[i]/max*100)}%">
        <div class="bar-fill" style="height:100%"></div>
      </div>
      <div class="bar-label">${d}</div>
    </div>
  `).join('');
}

function renderEmailList() {
  document.getElementById('emailList').innerHTML = emailConfigs.map((e,i) => `
    <li class="email-item">
      <button class="email-toggle ${e.on?'on':''}" onclick="toggleEmail(${i})">
        <div class="email-toggle-dot"></div>
      </button>
      <span class="email-name">${e.name}</span>
      <span class="email-status" style="font-family:var(--ff-mono);font-size:.6rem;letter-spacing:.1em">${e.on?'ACTIVO':'INACTIVO'}</span>
      ${e.on?`<button class="reminder-send-btn" onclick="notify('✉️ ${e.name} enviado manualmente')">Enviar</button>`:''}
    </li>
  `).join('');
}
function toggleEmail(i) {
  emailConfigs[i].on = !emailConfigs[i].on;
  renderEmailList();
}

// ─── NOTIFICATION ────────────────────────────────────────────────────────
let notifTimeout;
function notify(msg) {
  const el = document.getElementById('notif');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(notifTimeout);
  notifTimeout = setTimeout(() => el.classList.remove('show'), 3500);
}

// ─── INIT ─────────────────────────────────────────────────────────────────
renderKpis();
renderAdminTable();
renderBarChart();
renderEmailList();

// ─── INTERSECTION OBSERVER (fade-in) ─────────────────────────────────────
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) { e.target.style.opacity='1'; e.target.style.transform='translateY(0)'; } });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.service-card, .team-card, .kpi, .admin-card, .schedule-day').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity .7s ease, transform .7s ease';
  obs.observe(el);
});
</script>
</body>
</html>