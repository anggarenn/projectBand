"use client";

import React, { useEffect, useRef } from "react";

interface MistParticle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  maxAlpha: number;
  pulseSpeed: number;
  pulseOffset: number;
  hue: string;
}

interface MegamendungMistCanvasProps {
  className?: string;
  particleCount?: number;
}

/**
 * Efek Canvas Partikel Kabut & Awan Megamendung Parahyangan.
 * Menghasilkan partikel kabut bercahaya emas-mutiara yang melayang lembut
 * memberikan atmosfer sakral dan eksklusif khas pernikahan Sunda.
 */
export function MegamendungMistCanvas({
  className = "",
  particleCount = 28,
}: MegamendungMistCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 800);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Inisialisasi partikel kabut emas-mutiara
    const particles: MistParticle[] = [];
    const hues = [
      "rgba(255, 242, 214, ", // Pearl gold
      "rgba(229, 193, 108, ", // Royal gold
      "rgba(197, 155, 60, ",  // Deep gold
      "rgba(142, 202, 230, ", // Soft cyan mist (Megamendung sky)
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.8 + 1.2,
        vx: (Math.random() - 0.5) * 0.35 + 0.15, // Cenderung melayang perlahan ke kanan
        vy: (Math.random() - 0.5) * 0.25 - 0.1,  // Cenderung sedikit naik
        alpha: Math.random() * 0.4 + 0.1,
        maxAlpha: Math.random() * 0.5 + 0.25,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
        hue: hues[Math.floor(Math.random() * hues.length)],
      });
    }

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edge
        if (p.x > width + 10) p.x = -10;
        if (p.x < -10) p.x = width + 10;
        if (p.y > height + 10) p.y = -10;
        if (p.y < -10) p.y = height + 10;

        // Pulse opacity
        const currentAlpha =
          p.alpha + Math.sin(frame * p.pulseSpeed + p.pulseOffset) * (p.maxAlpha * 0.4);
        const safeAlpha = Math.max(0.05, Math.min(0.85, currentAlpha));

        // Gambar partikel berkabut (radial glow)
        const radGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2.5);
        radGrad.addColorStop(0, `${p.hue}${safeAlpha})`);
        radGrad.addColorStop(0.5, `${p.hue}${safeAlpha * 0.4})`);
        radGrad.addColorStop(1, `${p.hue}0)`);

        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, [particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none z-10 ${className}`}
      aria-hidden="true"
    />
  );
}
