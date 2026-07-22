"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Environmental layer — CSS-first ambience + optional pointer light.
 * Particles/grain are CSS; pointer light is rAF-throttled and paused off-interaction.
 */
export function Ambience() {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const targetRef = useRef({ x: 50, y: 30 });
  const currentRef = useRef({ x: 50, y: 30 });

  useEffect(() => {
    if (reduce) return;
    const el = rootRef.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      targetRef.current = {
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      };
    };

    const tick = () => {
      const c = currentRef.current;
      const t = targetRef.current;
      c.x += (t.x - c.x) * 0.06;
      c.y += (t.y - c.y) * 0.06;
      el.style.setProperty("--tos-pointer-x", `${c.x}%`);
      el.style.setProperty("--tos-pointer-y", `${c.y}%`);
      rafRef.current = window.requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    rafRef.current = window.requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.cancelAnimationFrame(rafRef.current);
    };
  }, [reduce]);

  return (
    <div ref={rootRef} className="tos-ambience" aria-hidden>
      <div className="tos-ambience__wash" />
      <div className="tos-ambience__pointer" />
      <div className="tos-ambience__edge" />
      <div className="tos-ambience__dust" />
      <div className="tos-ambience__grain" />
    </div>
  );
}
