"use client";

import React, { useEffect, useRef } from "react";

interface ChinoiseriePetalsCanvasProps {
  className?: string;
  particleCount?: number;
}

interface PetalParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  swayAngle: number;
  swaySpeed: number;
  flipAngle: number;
  flipSpeed: number;
  rotation: number;
  rotationSpeed: number;
  alpha: number;
  color: string;
}

/**
 * ChinoiseriePetalsCanvas (花瓣飞舞画布)
 * Canvas 2D ultra-ringan (12-15 partikel, performa 60 FPS tinggi tanpa beban CPU/GPU)
 * Merender kelopak bunga peoni / sakura merah muda lembut melayang & berputar jatuh perlahan
 * ditiup angin sepoi-sepoi di atas panggung kekaisaran.
 */
export function ChinoiseriePetalsCanvas({
  className = "absolute inset-0 pointer-events-none z-10",
  particleCount = 14,
}: ChinoiseriePetalsCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.offsetHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.offsetHeight || window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Palet warna kelopak peoni kekaisaran (imperial blush & soft cherry)
    const petalColors = [
      "rgba(255, 183, 197, 0.85)", // Peony Pink
      "rgba(255, 209, 220, 0.82)", // Soft Blush
      "rgba(247, 143, 179, 0.78)", // Rose Petal
      "rgba(254, 226, 226, 0.88)", // Creamy Sakura
      "rgba(253, 203, 218, 0.80)", // Cherry Blossom
    ];

    // Inisialisasi 12-15 partikel kelopak
    const petals: PetalParticle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 5 + 6, // 6px - 11px
      speedY: Math.random() * 0.45 + 0.35, // Jatuh lembut lambat
      swayAngle: Math.random() * Math.PI * 2,
      swaySpeed: Math.random() * 0.015 + 0.008,
      flipAngle: Math.random() * Math.PI * 2,
      flipSpeed: Math.random() * 0.02 + 0.012,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.012,
      alpha: Math.random() * 0.35 + 0.55, // 0.55 - 0.9
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];

        // ── Fisika Gerak Melayang Halus ──
        p.y += p.speedY;
        p.swayAngle += p.swaySpeed;
        p.flipAngle += p.flipSpeed;
        p.rotation += p.rotationSpeed;

        // Ayunan horizontal alami
        p.x += Math.sin(p.swayAngle) * 0.65 + 0.2; // sedikit bias tiupan angin ke kanan

        // Wrap around bounds
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 25) {
          p.x = -25;
        } else if (p.x < -25) {
          p.x = width + 25;
        }

        // ── Render Bentuk Kelopak Peoni 2.5D (Tumbling/Flipping in Air) ──
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        // Skala sumbu X mengikuti Math.cos(flipAngle) menciptakan ilusi kelopak berputar di udara
        const flipScale = Math.cos(p.flipAngle);
        ctx.scale(flipScale, 1);

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;

        // Bentuk organik kelopak bunga peoni/sakura
        ctx.beginPath();
        const s = p.size;
        ctx.moveTo(0, -s);
        // Sisi kanan kelopak
        ctx.bezierCurveTo(s * 0.75, -s * 0.45, s * 0.85, s * 0.55, 0, s);
        // Sisi kiri kelopak
        ctx.bezierCurveTo(-s * 0.85, s * 0.55, -s * 0.75, -s * 0.45, 0, -s);
        ctx.closePath();
        ctx.fill();

        // Goresan lipatan tengah halus (Petal Midrib)
        ctx.beginPath();
        ctx.moveTo(0, -s * 0.7);
        ctx.quadraticCurveTo(s * 0.1, 0, 0, s * 0.7);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.lineWidth = 0.5;
        ctx.stroke();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [particleCount]);

  return <canvas ref={canvasRef} className={className} />;
}
