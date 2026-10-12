"use client";

import React, { useEffect, useRef } from "react";

interface PetalsCanvasProps {
  className?: string;
  petalCount?: number;
}

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  angle: number;
  angularSpeed: number;
  flip: number;
  flipSpeed: number;
  color: string;
  isGoldFlake: boolean;
  alpha: number;
}

/**
 * PetalsCanvas
 * 60fps HTML5 Canvas animasi kelopak bunga Peony merah mekar dan serpihan emas
 * yang melayang anggun tertiup angin di atas sutra merah kekaisaran.
 */
export function PetalsCanvas({
  className = "absolute inset-0 pointer-events-none z-10",
  petalCount = 30,
}: PetalsCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
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

    const petalColors = [
      "#E63946", // Bright Peony Crimson
      "#C92A2A", // Rich Ruby Red
      "#991B1B", // Deep Imperial Carmine
      "#D1495B", // Rose Silk Blush
    ];

    const goldColors = ["#FFF8E1", "#FDE047", "#D4AF37", "#E6C65C"];

    const petals: Petal[] = Array.from({ length: petalCount }, (_, i) => {
      const isGoldFlake = i % 4 === 0;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: isGoldFlake ? Math.random() * 3 + 2 : Math.random() * 8 + 8,
        speedY: isGoldFlake ? Math.random() * 0.4 + 0.2 : Math.random() * 0.7 + 0.4,
        speedX: Math.random() * 0.4 - 0.2,
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.02,
        flip: Math.random() * Math.PI * 2,
        flipSpeed: Math.random() * 0.03 + 0.01,
        color: isGoldFlake
          ? goldColors[Math.floor(Math.random() * goldColors.length)]
          : petalColors[Math.floor(Math.random() * petalColors.length)],
        isGoldFlake,
        alpha: Math.random() * 0.4 + 0.5,
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];

        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.flip) * 0.35;
        p.angle += p.angularSpeed;
        p.flip += p.flipSpeed;

        // Wrap around bounds
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.scale(Math.cos(p.flip), 1);
        ctx.globalAlpha = p.alpha;

        if (p.isGoldFlake) {
          // Gold Diamond Sparkle / Flake
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 6;
          ctx.shadowColor = "#D4AF37";
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.lineTo(p.size * 0.6, 0);
          ctx.lineTo(0, p.size);
          ctx.lineTo(-p.size * 0.6, 0);
          ctx.closePath();
          ctx.fill();
        } else {
          // Organic Curved Peony Petal
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 4;
          ctx.shadowColor = "rgba(153, 27, 27, 0.4)";
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.bezierCurveTo(p.size * 0.7, -p.size * 0.6, p.size * 0.8, p.size * 0.4, 0, p.size);
          ctx.bezierCurveTo(-p.size * 0.8, p.size * 0.4, -p.size * 0.7, -p.size * 0.6, 0, -p.size);
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [petalCount]);

  return <canvas ref={canvasRef} className={className} />;
}
