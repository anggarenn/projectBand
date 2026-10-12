"use client";

import React, { useEffect, useRef } from "react";

interface EmeraldCurtainCanvasProps {
  className?: string;
  particleCount?: number;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  alpha: number;
  maxAlpha: number;
  fadeSpeed: number;
  color: string;
}

/**
 * EmeraldCurtainCanvas
 * 60fps lightweight HTML5 Canvas yang merender ambient partikel debu emas (gold dust sparkle)
 * melayang lembut di atas tirai beludru hijau zamrud gelap.
 */
export function EmeraldCurtainCanvas({
  className = "absolute inset-0 pointer-events-none z-10",
  particleCount = 35,
}: EmeraldCurtainCanvasProps) {
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

    const goldColors = ["#FFF8E1", "#F3E5AB", "#D4AF37", "#E5C365"];

    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      speedY: -(Math.random() * 0.35 + 0.1),
      speedX: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.8,
      maxAlpha: Math.random() * 0.6 + 0.3,
      fadeSpeed: Math.random() * 0.008 + 0.004,
      color: goldColors[Math.floor(Math.random() * goldColors.length)],
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.y += p.speedY;
        p.x += p.speedX;

        // Twinkle pulse
        p.alpha += p.fadeSpeed;
        if (p.alpha > p.maxAlpha || p.alpha < 0.1) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        // Wrap around bounds
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Render soft glowing particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
        ctx.shadowBlur = p.radius * 4;
        ctx.shadowColor = "#D4AF37";
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
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
