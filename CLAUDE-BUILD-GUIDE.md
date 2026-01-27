# Rocky Mount Hero v2.0 — Claude Code Build Guide

## Mission

Transform the Rocky Mount homepage hero from generic "2026 Commemorative Year" framing to a **July 4th-focused celebration** with premium atmospheric effects.

**Project Path:** `/Users/codyboring/CodyML/projects/TNRocky/tennessee-starts-here`

---

## What's Changing

| Current | After |
|---------|-------|
| Nav has "First 250" | Nav has "Almanac" |
| CTA: "Join First 250" | CTA: "Plan Your Visit" |
| Year block (2026 badge) | July 4th Feature Card |
| Static headline | Gold shimmer on "TENNESSEE" |
| No atmospheric effects | Lantern spotlight + particle dust |
| Splash page at `/` | Direct to `/home` |

---

## Build Order

1. Create new components (July4Card, LanternSpotlight, ParticleDust)
2. Update Navigation.tsx
3. Update home/page.tsx 
4. Update home/page.module.css
5. Update MobileStickyCTA.tsx
6. Add root redirect
7. Test

---

## Step 1: Create Components Directory

```bash
mkdir -p components/hero
```

---

## Step 2: Create July4Card.tsx

**File:** `components/July4Card.tsx`

```tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./July4Card.module.css";

function getDaysUntil(targetDate: string): number {
  const target = new Date(targetDate);
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export default function July4Card() {
  const [mounted, setMounted] = useState(false);
  const [daysToJuly4, setDaysToJuly4] = useState(0);
  const [daysToJune1, setDaysToJune1] = useState(0);

  useEffect(() => {
    setMounted(true);
    setDaysToJuly4(getDaysUntil("2026-07-04"));
    setDaysToJune1(getDaysUntil("2026-06-01"));

    const interval = setInterval(() => {
      setDaysToJuly4(getDaysUntil("2026-07-04"));
      setDaysToJune1(getDaysUntil("2026-06-01"));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.card}>
      <span className={`${styles.corner} ${styles.cornerTL}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.cornerBR}`} aria-hidden="true" />

      <div className={styles.header}>
        <span className={styles.eyebrow}>Independence Day at Rocky Mount</span>
        <h2 className={styles.title}>America&apos;s 250th Birthday</h2>
        <p className={styles.date}>July 4, 2026</p>
      </div>

      <div className={styles.countdowns}>
        <div className={styles.countdownItem}>
          <span className={styles.countdownLabel}>America 250</span>
          <span className={styles.countdownValue}>
            {mounted ? `${daysToJuly4} days` : "— days"}
          </span>
        </div>
        <div className={styles.countdownDivider} aria-hidden="true" />
        <div className={styles.countdownItem}>
          <span className={styles.countdownLabel}>Tennessee 230</span>
          <span className={styles.countdownValue}>
            {mounted ? `${daysToJune1} days` : "— days"}
          </span>
        </div>
      </div>

      <p className={styles.hook}>
        Sign the register. Hear the Declaration.
        <br />
        Be part of history.
      </p>

      <Link href="/events/july-4" className={styles.cta}>
        Learn More
      </Link>
    </div>
  );
}
```

---

## Step 3: Create July4Card.module.css

**File:** `components/July4Card.module.css`

```css
.card {
  position: relative;
  text-align: center;
  padding: 2rem 2.5rem;
  border: 1px solid rgba(201, 162, 39, 0.3);
  background: rgba(10, 22, 40, 0.6);
  backdrop-filter: blur(4px);
  max-width: 28rem;
  margin: 2rem auto;
}

.corner {
  position: absolute;
  width: 20px;
  height: 20px;
  pointer-events: none;
}

.cornerTL {
  top: -1px;
  left: -1px;
  border-top: 2px solid var(--accent);
  border-left: 2px solid var(--accent);
}

.cornerBR {
  bottom: -1px;
  right: -1px;
  border-bottom: 2px solid var(--accent);
  border-right: 2px solid var(--accent);
}

.header {
  margin-bottom: 1.5rem;
}

.eyebrow {
  display: block;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 0.5rem;
}

.title {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 400;
  color: white;
  margin: 0 0 0.25rem;
}

.date {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

.countdowns {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.countdownItem {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.countdownLabel {
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
}

.countdownValue {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--accent);
  font-variant-numeric: tabular-nums;
}

.countdownDivider {
  width: 1px;
  height: 2.5rem;
  background: rgba(201, 162, 39, 0.3);
}

.hook {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
  margin: 0 0 1.5rem;
}

.cta {
  display: inline-block;
  padding: 0.75rem 2rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--primary);
  background: var(--accent);
  border: none;
  text-decoration: none;
  transition: background 0.2s ease, transform 0.2s ease;
}

.cta:hover {
  background: #d4af37;
  transform: translateY(-1px);
}

.cta:focus-visible {
  outline: 2px solid white;
  outline-offset: 2px;
}

@media (max-width: 480px) {
  .card {
    padding: 1.5rem 1.25rem;
    margin: 1.5rem 1rem;
  }
  .countdowns {
    gap: 1rem;
  }
  .title {
    font-size: 1.25rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cta {
    transition: none;
  }
}
```

---

## Step 4: Create LanternSpotlight.tsx

**File:** `components/hero/LanternSpotlight.tsx`

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./LanternSpotlight.module.css";

interface Props {
  enabled?: boolean;
}

export default function LanternSpotlight({ enabled = true }: Props) {
  const [mousePos, setMousePos] = useState({ x: "50%", y: "50%" });
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    currentRef.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    targetRef.current = { ...currentRef.current };

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.08;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.08;
      setMousePos({
        x: `${currentRef.current.x}px`,
        y: `${currentRef.current.y}px`,
      });
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      className={styles.lantern}
      style={{ "--mouse-x": mousePos.x, "--mouse-y": mousePos.y } as React.CSSProperties}
      aria-hidden="true"
    />
  );
}
```

---

## Step 5: Create LanternSpotlight.module.css

**File:** `components/hero/LanternSpotlight.module.css`

```css
.lantern {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 4;
  background: radial-gradient(
    circle 500px at var(--mouse-x, 50%) var(--mouse-y, 50%),
    transparent 0%,
    rgba(5, 13, 24, 0.5) 40%,
    rgba(5, 13, 24, 0.8) 70%,
    rgba(5, 13, 24, 0.95) 100%
  );
  will-change: background;
}

@media (max-width: 768px) {
  .lantern {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .lantern {
    display: none;
  }
}
```

---

## Step 6: Create ParticleDust.tsx

**File:** `components/hero/ParticleDust.tsx`

```tsx
"use client";

import { useMemo } from "react";
import styles from "./ParticleDust.module.css";

interface Props {
  enabled?: boolean;
  count?: number;
}

export default function ParticleDust({ enabled = true, count = 60 }: Props) {
  const dustShadow = useMemo(() => {
    if (!enabled) return "";
    let shadow = "";
    for (let i = 0; i < count; i++) {
      const x = Math.floor(Math.random() * 100);
      const y = Math.floor(Math.random() * 100);
      const opacity = (Math.random() * 0.4 + 0.1).toFixed(2);
      shadow += `${x}vw ${y}vh 0 rgba(201, 162, 39, ${opacity})`;
      if (i < count - 1) shadow += ", ";
    }
    return shadow;
  }, [enabled, count]);

  const dustShadowSmall = useMemo(() => {
    if (!enabled) return "";
    let shadow = "";
    const smallCount = Math.floor(count * 0.6);
    for (let i = 0; i < smallCount; i++) {
      const x = Math.floor(Math.random() * 100);
      const y = Math.floor(Math.random() * 100);
      const opacity = (Math.random() * 0.3 + 0.1).toFixed(2);
      shadow += `${x}vw ${y}vh 0 rgba(255, 255, 255, ${opacity})`;
      if (i < smallCount - 1) shadow += ", ";
    }
    return shadow;
  }, [enabled, count]);

  if (!enabled) return null;

  return (
    <div className={styles.container} aria-hidden="true">
      <div className={`${styles.dust} ${styles.dustGold}`} style={{ boxShadow: dustShadow }} />
      <div className={`${styles.dust} ${styles.dustWhite}`} style={{ boxShadow: dustShadowSmall }} />
      <div className={`${styles.firefly} ${styles.firefly1}`} />
      <div className={`${styles.firefly} ${styles.firefly2}`} />
      <div className={`${styles.firefly} ${styles.firefly3}`} />
    </div>
  );
}
```

---

## Step 7: Create ParticleDust.module.css

**File:** `components/hero/ParticleDust.module.css`

```css
.container {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  overflow: hidden;
}

.dust {
  position: absolute;
  width: 1px;
  height: 1px;
  border-radius: 50%;
}

.dustGold {
  opacity: 0.4;
  animation: float 60s linear infinite;
}

.dustWhite {
  opacity: 0.2;
  animation: float 40s linear infinite reverse;
}

@keyframes float {
  from { transform: translateY(0); }
  to { transform: translateY(-100vh); }
}

.firefly {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--accent);
  border-radius: 50%;
  filter: blur(1px);
  opacity: 0;
}

.firefly1 {
  top: 25%;
  left: 25%;
  animation: firefly 7s ease-in-out infinite alternate;
}

.firefly2 {
  top: 75%;
  left: 65%;
  animation: firefly 11s ease-in-out infinite alternate-reverse;
  animation-delay: 2s;
}

.firefly3 {
  top: 50%;
  left: 80%;
  animation: firefly 9s ease-in-out infinite;
  animation-delay: 4s;
}

@keyframes firefly {
  0% { transform: translate(0, 0) scale(1); opacity: 0; }
  25% { opacity: 0.8; }
  50% { transform: translate(80px, -40px) scale(1.2); opacity: 0.5; }
  75% { opacity: 0.8; }
  100% { transform: translate(-40px, -80px) scale(0.8); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .dust, .firefly { animation: none; }
  .dustGold, .dustWhite { opacity: 0.2; }
  .firefly { display: none; }
}

@media (max-width: 768px) {
  .firefly { display: none; }
  .dustGold, .dustWhite { animation-duration: 120s; }
}
```

---

## Step 8: Update Navigation.tsx

**File:** `components/Navigation.tsx`

### Change 1: Update NAV_LINKS

**Find:**
```tsx
const NAV_LINKS = [
  { href: "/", label: "Our Story" },
  { href: "/first-250", label: "First 250" },
  { href: "/events", label: "Events" },
  { href: "/lectures", label: "Lectures" },
  { href: "/visit", label: "Visit" },
];
```

**Replace:**
```tsx
const NAV_LINKS = [
  { href: "/", label: "Our Story" },
  { href: "/events", label: "Events" },
  { href: "/lectures", label: "Lectures" },
  { href: "/visit", label: "Visit" },
  { href: "/almanac", label: "Almanac" },
];
```

### Change 2: Update Desktop CTA

**Find:**
```tsx
<Link href="/first-250" className={styles.cta}>
  <span className={styles["cta-text"]}>Join First 250</span>
  <Feather className={styles["cta-icon"]} size={14} />
</Link>
```

**Replace:**
```tsx
<Link href="/visit" className={styles.cta}>
  <span className={styles["cta-text"]}>Plan Your Visit</span>
  <Feather className={styles["cta-icon"]} size={14} />
</Link>
```

### Change 3: Update Mobile CTA

**Find:**
```tsx
<Link
  href="/first-250"
  className={styles["mobile-cta"]}
  onClick={closeMobileMenu}
>
  <span>Join First 250</span>
  <Feather size={16} />
</Link>
```

**Replace:**
```tsx
<Link
  href="/visit"
  className={styles["mobile-cta"]}
  onClick={closeMobileMenu}
>
  <span>Plan Your Visit</span>
  <Feather size={16} />
</Link>
```

---

## Step 9: Update home/page.tsx

**File:** `app/(main)/home/page.tsx`

### Change 1: Add Imports

**Add after existing imports:**
```tsx
import July4Card from "@/components/July4Card";
import LanternSpotlight from "@/components/hero/LanternSpotlight";
import ParticleDust from "@/components/hero/ParticleDust";
```

### Change 2: Add Atmospheric Effects

**Find:**
```tsx
<section className={styles["hero-cinematic"]} aria-labelledby="hero-heading">
  {/* Atmospheric layers */}
  <div className={styles["hero-gradient-overlay"]} />
  <div className={styles["hero-vignette"]} aria-hidden="true" />
  <div className={styles["hero-grain"]} aria-hidden="true" />
```

**Replace:**
```tsx
<section className={styles["hero-cinematic"]} aria-labelledby="hero-heading">
  {/* Atmospheric layers */}
  <div className={styles["hero-gradient-overlay"]} />
  <div className={styles["hero-vignette"]} aria-hidden="true" />
  <div className={styles["hero-grain"]} aria-hidden="true" />
  
  {/* Premium effects - set enabled={false} to disable */}
  <ParticleDust enabled={true} count={60} />
  <LanternSpotlight enabled={true} />
```

### Change 3: Replace Year Block with July4Card

**Find:**
```tsx
{/* Commemorative Year Block - Broader framing */}
<div className={`${styles["hero-year-block"]} ${styles["hero-animate"]}`} style={{ '--delay': '0.7s' } as React.CSSProperties}>
  <span className={styles["hero-year-badge"]}>2026</span>
  <span className={styles["hero-year-label"]}>The Commemorative Year</span>
  <p className={styles["hero-milestones"]}>
    America&apos;s 250th · Tennessee&apos;s 230th
  </p>
</div>
```

**Replace:**
```tsx
{/* July 4th Feature Card */}
<div className={styles["hero-animate"]} style={{ '--delay': '0.7s' } as React.CSSProperties}>
  <July4Card />
</div>
```

---

## Step 10: Update page.module.css (Shimmer Effect)

**File:** `app/(main)/home/page.module.css`

**Find:**
```css
.hero-headline-primary {
  display: block;
  font-family: var(--font-serif);
  font-size: clamp(2.5rem, 10vw, 7rem);
  font-weight: 700;
  line-height: 0.9;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  color: white;
  text-shadow: 0 4px 60px rgba(0, 0, 0, 0.5);
}
```

**Replace:**
```css
.hero-headline-primary {
  display: block;
  font-family: var(--font-serif);
  font-size: clamp(2.5rem, 10vw, 7rem);
  font-weight: 700;
  line-height: 0.9;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  text-shadow: 0 4px 60px rgba(0, 0, 0, 0.5);
  /* Gold shimmer */
  background: linear-gradient(
    90deg,
    #ffffff 0%,
    #ffffff 35%,
    #FFE696 50%,
    #ffffff 65%,
    #ffffff 100%
  );
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: shimmerHeadline 4s ease-in-out infinite;
}

@keyframes shimmerHeadline {
  0%, 100% { background-position: 200% center; }
  50% { background-position: -200% center; }
}

@media (prefers-reduced-motion: reduce) {
  .hero-headline-primary {
    animation: none;
    background: none;
    color: white;
  }
}
```

---

## Step 11: Update MobileStickyCTA.tsx

**File:** `components/MobileStickyCTA.tsx`

**Find:**
```tsx
<Link
  href="/events"
  className="flex-1 bg-white/10 text-white text-center py-3 rounded-sm font-semibold text-sm hover:bg-white/20 transition-colors border border-white/30 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
>
  2026 Events
</Link>
```

**Replace:**
```tsx
<Link
  href="/events/july-4"
  className="flex-1 bg-white/10 text-white text-center py-3 rounded-sm font-semibold text-sm hover:bg-white/20 transition-colors border border-white/30 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
>
  July 4th Event
</Link>
```

---

## Step 12: Add Root Redirect

**File:** `next.config.ts`

**Replace entire file:**
```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
```

---

## Disable/Enable Effects

To turn off any effect, change `enabled={true}` to `enabled={false}`:

```tsx
{/* Turn off particles */}
<ParticleDust enabled={false} count={60} />

{/* Turn off lantern */}
<LanternSpotlight enabled={false} />
```

To remove shimmer: revert `.hero-headline-primary` CSS changes.

---

## Files Summary

### Create New (6 files)
```
components/July4Card.tsx
components/July4Card.module.css
components/hero/LanternSpotlight.tsx
components/hero/LanternSpotlight.module.css
components/hero/ParticleDust.tsx
components/hero/ParticleDust.module.css
```

### Modify (5 files)
```
components/Navigation.tsx
app/(main)/home/page.tsx
app/(main)/home/page.module.css
components/MobileStickyCTA.tsx
next.config.ts
```

---

## Test Checklist

- [ ] Gold shimmer animates on "TENNESSEE"
- [ ] Lantern follows mouse on desktop
- [ ] Particles float upward
- [ ] Fireflies pulse in/out
- [ ] July 4th card shows correct countdowns
- [ ] Nav shows: Our Story, Events, Lectures, Visit, Almanac
- [ ] No "First 250" in nav
- [ ] Desktop CTA: "Plan Your Visit" → /visit
- [ ] Mobile CTA: "Plan Your Visit" → /visit
- [ ] Mobile sticky: "July 4th Event" → /events/july-4
- [ ] Root `/` redirects to `/home`
- [ ] Reduced motion disables all animations
- [ ] Mobile hides lantern (no mouse)

---

## Rollback

Each change is isolated. To undo:

1. **Effects broken?** → `enabled={false}` on components
2. **Card broken?** → Restore original year block
3. **Nav broken?** → Restore original NAV_LINKS
4. **Shimmer broken?** → Restore original `.hero-headline-primary`
