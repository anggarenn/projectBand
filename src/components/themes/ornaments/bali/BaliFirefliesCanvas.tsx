"use client";

import React, { useEffect, useRef } from "react";

interface BaliFirefliesCanvasProps {
  className?: string;
  particleCount?: number;
}

/**
 * BaliFirefliesCanvas
 * Partikel cahaya emas melayang (Balinese Gold Fireflies & Blencong Sparks)
 * Menghadirkan pendaran mistis kunang-kunang malam pura Bali dan percikan api suci blencong.
 * Berjalan super ringan pada HTML5 Canvas 60fps dengan efek glow radial.
 */
export function BaliFirefliesCanvas({
  className = "absolute inset-0 pointer-events-none z-5 w-full h-full",
  particleCount = 38,
}: BaliFirefliesCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Inisialisasi partikel kunang-kunang emas Bali
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedY: Math.random() * 0.45 + 0.2, // melayang lembut ke atas
      speedX: (Math.random() - 0.5) * 0.35, // goyangan horizontal alami
      baseAlpha: Math.random() * 0.5 + 0.25,
      alpha: Math.random() * 0.7 + 0.15,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      colorVariant: Math.random(), // 0: kencana muda (#FFFDF7), 1: emas murni (#FDE68A), 2: emas candi (#D4AF37)
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.y -= p.speedY;
        p.x += Math.sin(p.y * 0.02) * 0.4 + p.speedX;
        p.alpha += p.pulseSpeed;

        // Pulsing kedip lembut kunang-kunang
        if (p.alpha > 0.85 || p.alpha < 0.15) {
          p.pulseSpeed = -p.pulseSpeed;
        }

        // Wrap around batas layar
        if (p.y < -15) {
          p.y = height + 15;
          p.x = Math.random() * width;
        }
        if (p.x < -15) p.x = width + 15;
        if (p.x > width + 15) p.x = -15;

        const color =
          p.colorVariant > 0.6
            ? `rgba(253, 230, 138, ${Math.max(0, Math.min(1, p.alpha))})` // #FDE68A
            : p.colorVariant > 0.3
            ? `rgba(212, 175, 55, ${Math.max(0, Math.min(1, p.alpha * 0.9))})` // #D4AF37
            : `rgba(255, 253, 247, ${Math.max(0, Math.min(1, p.alpha))})`; // #FFFDF7

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowBlur = 9;
        ctx.shadowColor = "#FDE68A";
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleCount]);

  return <canvas ref={canvasRef} className={className} />;
}
