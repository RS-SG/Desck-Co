'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function HeroEffects() {
  const glow = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = glow.current;
    if (!node) return;
    const move = (event: PointerEvent) => gsap.to(node, { x: event.clientX - window.innerWidth / 2, y: event.clientY - window.innerHeight / 2, duration: 1.2, ease: 'power3.out' });
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, []);
  return <div ref={glow} aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[.05] blur-3xl" />;
}
