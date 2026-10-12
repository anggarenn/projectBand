# Motion Art Frontend Architecture & 60fps Optimization Guide
**Role:** Ucil — Senior Frontend Developer (Tim Sikobokan)  
**Target:** 60fps Mobile Performance & Zero Paint Thrashing  
**Benchmark:** Folk Invitation (`https://folkinvitation.id/motion-art-aceh-black/`)

---

## 1. Media Layering & Stacking Context

Gunakan stacking context terisolasi (`isolation: isolate`) pada container viewport agar compositor GPU memisahkan layer tanpa re-rastering layer tetangga.

### Z-Index Hierarchy Matrix
| Layer | Z-Index | Komponen / Asset | Teknik Komposisi |
|---|---|---|---|
| **L0** | `z-0` | Video Backdrop / Animated WebP | `fixed inset-0 w-full h-full object-cover pointer-events-none` |
| **L1** | `z-[1]` | Ambient Mist / Particle Canvas | HTML5 Canvas 2D / WebGL, `mix-blend-screen`, `pointer-events-none` |
| **L2** | `z-[2]` | Light Flicker / Blencong Glow | CSS Radial Gradient / Keyframe Opacity, GPU composited |
| **L3** | `z-10` | Traditional Ornament / Lace Header | SVG Vector / PNG Alpha, `sticky top-0`, `will-change: transform` |
| **L4** | `z-20` | Hero Card / Content Container | Glassmorphism / Content DOM, Scrollable area |
| **L5** | `z-30` | Floating Action & Navigation Bar | `fixed bottom-6`, Audio toggle, floating RSVP |
| **Modal**| `z-50` | Cover Gate Screen (Stage 1) | `fixed inset-0`, Dual-door curtain swing split |

```html
<!-- DOM Blueprint -->
<div class="relative w-full min-h-screen overflow-x-hidden isolate bg-black text-white">
  <!-- L0: Backdrop Video -->
  <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden will-change-transform">
    <video
      id="bg-video"
      class="w-full h-full object-cover transform-gpu scale-105"
      autoplay loop muted playsinline
      poster="/assets/motion/backdrop-poster.webp">
      <source src="/assets/motion/backdrop-h264.mp4" type="video/mp4; codecs=avc1.42E01E,mp4a.40.2" />
    </video>
    <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80"></div>
  </div>

  <!-- L1: Ambient Canvas (Mist/Smoke/Dust) -->
  <canvas id="ambient-canvas" class="fixed inset-0 z-[1] pointer-events-none mix-blend-screen"></canvas>

  <!-- L2: Light Flicker (Blencong) -->
  <div class="fixed inset-0 z-[2] pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-transparent animate-flicker"></div>

  <!-- L3: Lace & Header Ornaments -->
  <header class="fixed top-0 left-0 right-0 z-10 pointer-events-none flex justify-center">
    <img src="/assets/motion/ornament-header.webp" alt="Lace Header" class="w-full max-w-lg object-contain drop-shadow-md" />
  </header>

  <!-- L4: Floating Content / Stage 2 Body -->
  <main id="main-content" class="relative z-20 w-full min-h-screen px-4 pt-24 pb-32 flex flex-col items-center">
    <!-- Cards & Invitation Content -->
  </main>

  <!-- L5: Floating Bottom Bar -->
  <nav class="fixed bottom-6 z-30 flex items-center gap-3 px-5 py-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 shadow-2xl">
    <!-- Music Button & Quick Nav -->
  </nav>

  <!-- Stage 1: Cover Screen Gate -->
  <div id="cover-screen" class="fixed inset-0 z-50 flex items-center justify-center bg-stone-950 will-change-transform">
    <!-- Curtain Left / Right & Open Trigger -->
  </div>
</div>
```

---

## 2. Video Streaming DX & Graceful Degradation

### A. Mobile Low-Power Mode & Autoplay Failover
Mobile Safari dan Android Chrome sering memblokir autoplay saat baterai hemat (Low Power Mode) atau koneksi data lambat.
Wajib menyertakan listener catch promise autoplay:

```javascript
const initVideoPlayback = (videoEl, fallbackPosterEl) => {
  if (!videoEl) return;

  videoEl.muted = true;
  videoEl.playsInline = true;

  const playPromise = videoEl.play();
  if (playPromise !== undefined) {
    playPromise.catch((error) => {
      console.warn('[VideoDX] Autoplay dicegah browser (Low Power / Data Saver). Aktifkan fallback statis WebP.', error);
      videoEl.style.display = 'none';
      if (fallbackPosterEl) {
        fallbackPosterEl.classList.remove('hidden');
      }
    });
  }
};
```

### B. Asset Optimization Specifications
1. **Video Codec:** H.264 Baseline profile level 3.1 (`libx264 -crf 26 -preset slow -pix_fmt yuv420p -an`). Tanpa track audio (`-an`) untuk memangkas payload 30%.
2. **Bitrate Budget:** Maksimal 800 kbps - 1.2 Mbps untuk resolusi 1080x1920 (9:16 mobile portrait). Durasi loop 6-8 detik (Ukuran file ≤ 1.5MB).
3. **Poster Fallback:** WebP Lossy Q75 resolusi sama, ukuran target ≤ 80KB.
4. **Connection Adaptive Preload:**
   ```javascript
   if (navigator.connection && (navigator.connection.saveData || navigator.connection.effectiveType === '2g')) {
     videoEl.preload = 'none';
     videoEl.style.display = 'none';
     fallbackPosterEl.classList.remove('hidden');
   } else {
     videoEl.preload = 'auto';
   }
   ```

---

## 3. GPU-Accelerated Animations (Zero Reflow / Paint Thrashing)

### A. Komposit Rule
- **HANYA animasikan `transform` (`translate3d`, `scale3d`, `rotate3d`) dan `opacity`.**
- **HARAM** menganimasikan: `top`, `left`, `margin`, `padding`, `width`, `height`, `border-radius`, `box-shadow`, `filter` berat saat scroll.
- Berikan hint `will-change: transform, opacity` pada elemen animasi pintu gerbang, partikel, dan kartu. Hapus class `will-change` setelah transisi selesai untuk menghemat VRAM GPU mobile.

### B. CSS Keyframes Blencong Flicker (Hardware-Composited)
```css
@keyframes blencongPulse {
  0%, 100% {
    opacity: 0.12;
    transform: scale3d(1, 1, 1);
  }
  50% {
    opacity: 0.28;
    transform: scale3d(1.08, 1.08, 1);
  }
}

.animate-flicker {
  animation: blencongPulse 4s ease-in-out infinite;
  will-change: opacity, transform;
  transform: translateZ(0); /* Force RenderLayer promotion */
}
```

### C. Gate Door Opening Animation (Buka Gerbang)
```css
.gate-door-left {
  transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease-out 0.4s;
  will-change: transform, opacity;
  transform-origin: left center;
}

.gate-door-right {
  transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease-out 0.4s;
  will-change: transform, opacity;
  transform-origin: right center;
}

.gate-opened .gate-door-left {
  transform: translate3d(-100%, 0, 0) scale3d(0.95, 0.95, 1);
  opacity: 0;
  pointer-events: none;
}

.gate-opened .gate-door-right {
  transform: translate3d(100%, 0, 0) scale3d(0.95, 0.95, 1);
  opacity: 0;
  pointer-events: none;
}
```

---

## 4. State & Scroll Management: Cover Gate to Stage 2 + Audio Unlock

### A. Mobile Audio Policy Workaround (Autoplay Policy)
Browser mobile melarang audio menyala tanpa interaksi gestur pengguna (User Gesture requirement).
Tombol **"Buka Undangan"** adalah momen emas (Golden Touch) untuk unlock AudioContext dan trigger `audio.play()`.

### B. Full Implementation Controller (`motionArtController.js`)
```javascript
export class MotionArtController {
  constructor(options = {}) {
    this.coverEl = document.getElementById(options.coverId || 'cover-screen');
    this.openBtn = document.getElementById(options.openBtnId || 'btn-open-invitation');
    this.audioEl = document.getElementById(options.audioId || 'bg-music');
    this.audioBtn = document.getElementById(options.audioBtnId || 'btn-toggle-audio');
    this.mainEl = document.getElementById(options.mainId || 'main-content');
    this.isOpened = false;
    this.isPlaying = false;

    this.init();
  }

  init() {
    // 1. Lock scroll pada awal load
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // 2. Event Listener Buka Undangan
    this.openBtn?.addEventListener('click', () => this.handleOpenGate());

    // 3. Audio Toggle
    this.audioBtn?.addEventListener('click', () => this.toggleAudio());
  }

  handleOpenGate() {
    if (this.isOpened) return;
    this.isOpened = true;

    // A. Audio Unlock & Play
    if (this.audioEl) {
      this.audioEl.currentTime = 0;
      const playPromise = this.audioEl.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          this.isPlaying = true;
          this.updateAudioButtonState(true);
        }).catch((err) => {
          console.warn('[Audio] Autoplay diblokir sistem OS:', err);
          this.isPlaying = false;
          this.updateAudioButtonState(false);
        });
      }
    }

    // B. Gerbang Animasi (Trigger CSS class)
    this.coverEl.classList.add('gate-opened');

    // C. Scroll Unlock & Transisi Halus
    setTimeout(() => {
      // Re-enable native scroll
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';

      // Sembunyikan cover dari DOM tree accessibility
      this.coverEl.setAttribute('aria-hidden', 'true');
      this.coverEl.style.display = 'none';

      // Lepaskan will-change GPU allocation
      this.coverEl.style.willChange = 'auto';

      // Smooth scroll ke Hero Card Stage 2
      this.mainEl?.scrollIntoView({ behavior: 'smooth' });
    }, 1100);
  }

  toggleAudio() {
    if (!this.audioEl) return;
    if (this.isPlaying) {
      this.audioEl.pause();
      this.isPlaying = false;
      this.updateAudioButtonState(false);
    } else {
      this.audioEl.play().then(() => {
        this.isPlaying = true;
        this.updateAudioButtonState(true);
      });
    }
  }

  updateAudioButtonState(isActive) {
    if (!this.audioBtn) return;
    this.audioBtn.setAttribute('data-playing', isActive ? 'true' : 'false');
    this.audioBtn.classList.toggle('animate-spin-slow', isActive);
  }
}
```

---

## 5. Lightweight Canvas Particles (60fps Mobile Ambient)
Gunakan `requestAnimationFrame` dengan throttle delta time dan partikel maksimal 25 butir di mobile untuk menjaga CPU thread tetap dingin.

```javascript
class AmbientCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d', { alpha: true });
    this.particles = [];
    this.count = window.innerWidth < 768 ? 20 : 45; // Budget hemat mobile
    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize(), { passive: true });
    for (let i = 0; i < this.count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * 2 + 0.8,
        speedY: -(Math.random() * 0.4 + 0.1),
        speedX: Math.sin(Math.random() * Math.PI) * 0.2,
        alpha: Math.random() * 0.5 + 0.2
      });
    }
    this.render();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'rgba(234, 179, 8, 0.4)'; // Amber golden dust

    for (let p of this.particles) {
      p.y += p.speedY;
      p.x += p.speedX;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fill();
    }
    requestAnimationFrame(() => this.render());
  }
}
```

---

## 6. Summary Checklist Performance Auditing (Lighthouse & DevTools)
1. **LCP (Largest Contentful Paint) < 2.0s:** `poster.webp` dimuat via `<link rel="preload" as="image" href="..." fetchpriority="high">`.
2. **CLS (Cumulative Layout Shift) = 0:** Seluruh container video, canvas, dan gate menggunakan fixed layout dengan dimensi eksplisit.
3. **INP (Interaction to Next Paint) < 100ms:** Event klik tombol buka gerbang tidak memicu kalkulasi sinkron berat; state swap didelegasikan ke CSS compositor.
4. **Memory Footprint:** VRAM dibersihkan dengan menghapus elemen Cover dari rendering tree (`display: none` + reset `will-change`) setelah animasi berakhir.
