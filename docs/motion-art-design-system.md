# MOTION ART (ARTMOTION) DESIGN SYSTEM & VISUAL ARCHITECTURE SPECIFICATION
**Benchmark Standard:** Folk Invitation (Aceh Black Heritage) & Royal Nusantara Aesthetics  
**Document Author:** Soto (Lead UI/UX Designer & Stylist — Tim Sikobokan)  
**Target:** Reno & Tim Sikobokan Engineering  
**Version:** 1.0.0 (Production Master)

---

## 1. EXECUTIVE VISION & FILOSOFI ESTETIKA

Motion Art (Artmotion) adalah paradigma undangan digital kasta tertinggi (*ultra-luxury digital heirloom*). Berbeda dengan undangan web konvensional yang mengandalkan template generik, Motion Art memadukan:
1. **Sacred Heritage Noir**: Nuansa latar hitam pekat temaram (*obsidian void*) yang sakral, hening, dan megah, merefleksikan martabat bangsawan dan kesakralan prosesi pernikahan adat.
2. **Lithograph & Fine Copperplate Engraving**: Visual arsitektur adat bukan ilustrasi flat 2D, melainkan seni etsa arsir klasik (*cross-hatching engraving*) bertinta emas tembaga redup.
3. **Proscenium Stagecraft (Ceiling Lace Pelmet)**: Struktur panggung teater mewah di mana langit-langit viewport dibingkai renda ornamen adat (*canopy drape*), menciptakan ilusi kedalaman spasial tiga dimensi.
4. **Architectural Bento & Glassmorphism**: Struktur informasi modern berbasis modul bento gelap, border hairline emas 1px, sudut botani filigree tipis, dan efek kaca buram berkabut (*dark frosted glass*).

---

## 2. BEDAH HIERARKI VISUAL & ANATOMI KOMPONEN

```
+-------------------------------------------------------------------+
|  [================= CULTURAL LACE PELMET =================]      | <- Header Ceiling (Pucuk Rebung / Lung-lungan / Megamendung)
|                                                                   |
|                      "THE WEDDING OF"                             | <- High-tracking Classical Serif (Cinzel / Cormorant)
|                                                                   |
|                  /-------------------------\                      |
|                 /    ARCH PREWEDDING WINDOW \                     | <- Moorish / Cathedral Arch (1px Gold Hairline)
|                |                             |                    |
|                |   [ Desaturated Warm Tone ] |                    |
|                |                             |                    |
|                 \                           /                     |
|                  \-------------------------/                      |
|                                                                   |
|                      Raden & Kartika                              | <- Flowing Calligraphy Flourish Script
|                                                                   |
|                   ( * BUKA UNDANGAN * )                          | <- Pill Capsule Button (Gold Pulse Glow)
+-------------------------------------------------------------------+
```

### 2.1. Header: Cultural Lace Pelmet (Ceiling Proscenium)
* **Peran Visual**: Memberikan impresi kemegahan atap pendopo/istana sejak milidetik pertama layar dimuat (*the grand canopy*).
* **Karakter Ornamen Kultural**:
  * **Songket Pucuk Rebung (Minang)**: Pola segitiga runcing berulang dengan ornamen *itiak pulang patang* dan sulur pakis di kakinya. Melambangkan kesiapan berdiri tegak dan kesuburan budi pekerti.
  * **Lung-lungan Keraton (Jawa)**: Sulur-suluran tumbuhan meliuk lentur dengan motif daun srikaya dan bunga melati. Melambangkan hubungan harmonis berkesinambungan.
  * **Megamendung & Melati Ronce (Sunda)**: Lapisan awan berundak khas Cirebonan yang dipadukan dengan juntaian ronce melati tipis di tepi bawah kanopi.
  * **Patra Punggel & Keketusan (Bali)**: Ragam hias ukiran daun flora berpahat tajam, tegas, dan magis dengan aksen ikal spiral dinamis.
  * **Imperial Peony & Cloud Lattice (Chinoiserie)**: Siluet bunga peony kerajaan Tiongkok berpadu dengan kisi-kisi awan klasik (*cloud scroll lattice*) yang lembut dan aristokratis.
* **Teknik Rendering**:
  * Seamless horizontal repeating vector / mirrored SVG canopy.
  * Soft drop alpha / linear vertical gradient feathering di bagian bawah kanopi (`mask-image: linear-gradient(to bottom, black 85%, transparent 100%)`) agar renda membaur mulus ke dalam kanvas gelap panggung.

---

### 2.2. Cover Gate: The Sacred Arch & Entrance
* **Prewedding Arch Window**:
  * Bentuk: Busur kubah katedral atau Moorish horseshoe arch (`border-radius: 999px 999px 12px 12px` atau SVG Clip-path presisi).
  * Hairline Golden Border: Ketebalan tepat **1px** dengan gradasi multi-stop metallic (`linear-gradient(135deg, #F7E5A9 0%, #D4AF37 45%, #856314 100%)`).
  * Foto Subjek: Foto prewedding diolah dengan saturasi rendah (*warm muted tone*), kontras tinggi, dan *dark edge vignette* agar tidak bertabrakan dengan palet hitam-emas.
* **Tipografi Pengantar**:
  * Teks: "THE WEDDING OF"
  * Tipografi: Trajan Pro / Cinzel / Cormorant Garamond, All Caps, Font Size 11px - 13px, Letter-Spacing 0.35em - 0.5em (`tracking-[0.35em]`), warna `#C5A059`.
* **Nama Mempelai**:
  * Tipografi: Flowing calligraphy script dengan swash & flourish panjang di huruf awal dan akhir.
  * Warna: Gradasi emas berkilau (`background: linear-gradient(180deg, #FFF1CA 0%, #D4AF37 100%)`, `-webkit-background-clip: text`).
* **Tombol Masuk "Buka Undangan"**:
  * Bentuk: Pill Capsule (`border-radius: 9999px`).
  * Dimensi: Padding `14px 36px`, kompak dan elegan.
  * Surface: Semi-translucent obsidian dark gold (`background: rgba(22, 18, 12, 0.75)`, `backdrop-filter: blur(8px)`).
  * Border: 1px gold hairline (`rgba(212, 175, 55, 0.6)`).
  * Glowing Gold Shadow: Ambient gold illumination (`box-shadow: 0 0 24px rgba(212, 175, 55, 0.35), 0 4px 12px rgba(0, 0, 0, 0.8)`).
  * Micro-Motion: Bernapas lembut (*subtle breathing pulse animation* scale 1.00 -> 1.02, interval 2.4s cubic-bezier).

---

### 2.3. Stage 2: Backdrop Arsitektur Adat & Floating Glass Bento
```
+-------------------------------------------------------------------+
|             [ LITHOGRAPH WOODCUT ARCHITECTURE BACKDROP ]          | <- Etsa Rumah Adat / Keraton Berarsir Emas Redup
|                                                                   |
|           +-----------------------------------------------+       |
|           |       FLOATING GLASS BENTO NAME FRAME         |       | <- Dark Frosted Glass Bento
|           |       ~ 1px Hairline Metallic Gold Border ~   |       |
|           |                                               |       |
|           |          [ Kaligrafi Adat Suci / Basmalah ]   |       |
|           |                 Pangeran Arya                 |       |
|           |                       &                       |       |
|           |                Putri Annisa                   |       |
|           |                                               |       |
|           |    +-------------------------------------+    |       |
|           |    |  [COUNTDOWN CAPSULE PILL]           |    |       | <- Tabular Capsule Timer
|           |    |  12 Hari : 08 Jam : 45 Mnt : 10 Dtk |    |       |
|           |    +-------------------------------------+    |       |
|           +-----------------------------------------------+       |
+-------------------------------------------------------------------+
```
* **Backdrop Arsitektur Lithograph / Woodcut**:
  * Visual: Sketsa arsitektur monumental (Rumah Gadang Minang, Masjid Baiturrahman Aceh, Keraton Kasepuhan/Yogyakarta, Candi Bentar Bali) dengan teknik arsiran etsa tembaga (*cross-hatching copper engraving*).
  * Opasitas: 18% - 32% di atas latar hitam `#0A0A0A`, tidak boleh mengaburkan teks di depannya.
  * Tint Warna: Monokromatik sepia-gold (`#A88842`).
* **Floating Glass Bento Name Frame**:
  * Material: Dark smoked glassmorphism (`background: rgba(14, 14, 14, 0.75)`, `backdrop-filter: blur(16px)`).
  * Border: 1px continuous golden hairline.
  * Filigree Corners: Aksen floral etsa sudut 12px x 12px di 4 sudut frame.
* **Countdown Capsule Pill**:
  * Kontainer berbentuk kapsul horizontal ramping.
  * Angka menggunakan *tabular figures* / monospace serif agar tidak terjadi *horizontal jitter* ketika detik berkurang.
  * Separator antar unit menggunakan hairline divider vertikal 1px (`rgba(212, 175, 55, 0.2)`).

---

### 2.4. Content Bento Sections: Dark Luxury Grid
* **Surface Architecture**:
  * Background dasar: `#0D0D0D` hingga `#131313`.
  * Ambient Lighting: Radial gradient halus dari sudut kartu (`background: radial-gradient(circle at top left, rgba(212, 175, 55, 0.06) 0%, transparent 65%), #121212`).
* **Border Styling**:
  * Hairline 1px multi-stop gradient:
    ```css
    border: 1px solid transparent;
    background-image: linear-gradient(#121212, #121212), 
                      linear-gradient(135deg, rgba(247, 229, 169, 0.4) 0%, rgba(212, 175, 55, 0.1) 50%, rgba(133, 99, 20, 0.3) 100%);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    ```
* **Botanical Corner Flourishes**:
  * Ornamen vector sudut tipis (*hairline stroke 0.65px - 0.8px*) terukir di tiap sudut kartu bento, memancarkan cita rasa perhiasan kriya kraton.
* **Card Hierarchy Pairing**:
  * Modul Acara (Akad & Resepsi): 2-Column Bento split dengan aksen peta monokrom emas dan tombol "Save to Calendar".
  * Modul Kisah Cinta (Storyline): Vertical timeline dengan aksen benang emas putus-putus dan titik mutiara bercahaya.
  * Modul Rekening & Hadiah (Amplop Digital): Bento card kompak dengan nomor rekening bertipe tabular, tombol copy dengan animasi mikro 'Tersalin', dan QRIS berbingkai emas.
  * Modul RSVP & Doa: Dark form fields bergaris bawah emas (*underline input*) atau kapsul input ber-backdrop blur.

---

### 2.5. Anti-Pattern Visual: Larangan Mutlak
Desain Motion Art **HARUS MENGHINDARI** elemen-elemen berikut:
1. ❌ **Bentuk Geometris Kotak Kaku & Datar**: Dilarang menggunakan kotak abu-abu flat ala dashboard admin SaaS (Tailwind default gray-800 tanpa border emas/gradient).
2. ❌ **Busur Lengkung Sirkus / Canva Playful Shapes**: Dilarang memakai lengkungan warna pastel atau busur asimetris warna-warni seperti template undangan ulang tahun anak.
3. ❌ **Ilustrasi Kartun Vektor Flat**: Dilarang memasukkan kartun pengantin 2D tanpa tekstur arsir. Karakter harus berbasis fotografi artistik atau etsa litografi berbobot.
4. ❌ **Warna-Warni Norak / Neon RGB**: Dilarang memakai warna pink neon, biru terang, ungu saturasi tinggi, atau kuning mencolok. Palet wajib disiplin pada spektrum Royal Gold, Obsidian Void, Ivory Silk, dan Warm Muted Tones.
5. ❌ **Animasi Kasar / Bouncy**: Dilarang memakai efek animasi memantul (*bouncy spring / cartoon pop*). Seluruh transisi wajib bertempo anggun (*luxurious cinematic ease: cubic-bezier(0.22, 1, 0.36, 1)* berdurasi 0.8s - 1.4s).

---

## 3. DESIGN SYSTEM & TOKEN SPECIFICATION

### 3.1. Color Tokens (CSS Custom Properties & Tailwind Config)

```css
:root {
  /* Canvas & Obsidian Surfaces */
  --art-bg-void:           #070707; /* The infinite backdrop */
  --art-bg-base:           #0A0A0A; /* Primary view stage */
  --art-surface-bento:     #121212; /* Bento card background */
  --art-surface-elevated:  #171717; /* Hover / elevated bento */
  --art-surface-glass:     rgba(18, 18, 18, 0.72); /* Glassmorphic bento */
  --art-surface-glass-subtle: rgba(10, 10, 10, 0.45);

  /* Royal Gold Spectrum */
  --art-gold-champagne:    #F7E5A9; /* Highlight shimmer & accents */
  --art-gold-radiant:      #E6CA65; /* Secondary radiant gold */
  --art-gold-primary:      #D4AF37; /* Core Royal Imperial Gold */
  --art-gold-antique:      #A3832C; /* Deep antique copper gold */
  --art-gold-bronze:       #6B5418; /* Dark border shadow gold */
  
  /* Hairline & Alpha Borders */
  --art-border-gold-hairline: rgba(212, 175, 55, 0.28);
  --art-border-gold-subtle:   rgba(212, 175, 55, 0.12);
  --art-border-gold-intense:  rgba(247, 229, 169, 0.55);

  /* Ambient Glows */
  --art-glow-gold-sm:      0 0 16px rgba(212, 175, 55, 0.20);
  --art-glow-gold-md:      0 0 28px rgba(212, 175, 55, 0.35);
  --art-glow-gold-lg:      0 0 45px rgba(212, 175, 55, 0.50);

  /* Typography Colors */
  --art-text-ivory:        #F9F9F8; /* Primary title & body text */
  --art-text-silk-muted:   #B8B8B5; /* Secondary descriptive text */
  --art-text-gold-light:   #EED690; /* Featured script & titles */
  --art-text-gold-core:    #D4AF37; /* Sub-headers & captions */
  --art-text-dimmed:       #6E6E6B; /* Meta dates, copyright, STAN */
}
```

### 3.2. Typography Tokens & Pairing Matrix

| Role | Font Family | Weight | Letter-Spacing | Ukuran Mobile / Desktop | Karakter Penggunaan |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Monarch Script** | *Pinyon Script*, *Alex Brush*, *Great Vibes* | Regular (400) | Normal / `0.02em` | `36px` - `48px` / `54px` - `72px` | Nama mempelai, inisial monogram, basmalah/doa |
| **Imperial Display Serif** | *Cinzel Decorative*, *Cormorant Garamond* | Medium (500) / SemiBold (600) | `0.25em` - `0.45em` (Caps) | `11px` - `14px` / `13px` - `16px` | "THE WEDDING OF", judul section bento |
| **Editorial Body Serif** | *Cormorant Garamond*, *Playfair Display* | Regular (400) / Italic | `0.04em` | `15px` - `17px` / `17px` - `19px` | Ayat suci, kutipan cinta, deskripsi acara |
| **Technical Modern Sans** | *Plus Jakarta Sans*, *Montserrat* | Medium (500) / Regular (400) | `0.05em` | `12px` - `14px` / `13px` - `15px` | Jam acara, alamat, info rekening, label tombol |
| **Tabular Numbers** | *Cinzel*, *Cormorant Garamond (tnum)* | SemiBold (600) | `0.08em` | `20px` - `26px` / `28px` - `36px` | Countdown Timer, Tanggal Kalender, Nominal |

### 3.3. Spacing, Radius & Geometry Tokens
* **Spacing Grid System**: Berbasis kelipatan 4pt / 8pt.
  * Section Vertical Rhythm: `py-16` (64px) mobile, `py-24` (96px) desktop.
  * Card Internal Padding: `p-6` (24px) mobile, `p-8` (32px) desktop.
  * Bento Gap: `gap-4` (16px) mobile, `gap-6` (24px) desktop.
* **Border Radii**:
  * `--radius-pill`: `9999px` (Tombol CTA, Countdown Capsule, Filter Tags).
  * `--radius-bento`: `20px` (Main Bento Cards).
  * `--radius-sub-bento`: `12px` (Internal Bento Tile, Photo Thumbnail).
  * `--radius-arch-window`: `400px 400px 16px 16px` (Prewedding Window Gate).
* **Border Thickness Rules**:
  * Wajib **1px** pada semua batas container luar. Dilarang keras memakai border 2px ke atas karena akan membuat tampilan terkesan kasar (*clunky*).

---

## 4. PEDOMAN MOTIF KULTURAL UNTUK CULTURAL LACE PELMET

Untuk memberikan fleksibilitas lintas adat nusantara pada project Reno, berikut panduan spesifik per tradisi budaya:

```
+-------------------------------------------------------------------------------+
| BUDAYA     | MOTIF KUNCI              | KARAKTER GEOMETRIS & FILOSOFI        |
+-------------------------------------------------------------------------------+
| Minang     | Pucuk Rebung &           | Geometris segitiga berulang, runcing, |
|            | Itiak Pulang Patang      | kokoh, dan berirama rapat.            |
+-------------------------------------------------------------------------------+
| Jawa       | Lung-lungan & Modang     | Sulur dedaunan melengkung halus,      |
|            | Kawung Keraton           | anggun, mengalir seperti tarian bedhaya|
+-------------------------------------------------------------------------------+
| Sunda      | Megamendung &            | Gumpalan awan berlapis garis gradasi, |
|            | Rengganis Melati         | mistis, sejuk, dipadu ronce kembang.  |
+-------------------------------------------------------------------------------+
| Bali       | Patra Punggel &          | Ukiran daun berulir spiral tegas,     |
|            | Batun Poh Keketusan      | berbobot sakral, kental cita rasa pura|
+-------------------------------------------------------------------------------+
| Chinoiserie| Imperial Peony &         | Mahkota kelopak peony mengembang mulus|
|            | Ruyi Cloud Lattice       | dengan kisi-kisi awan simetris Dinasti|
+-------------------------------------------------------------------------------+
```

### 4.1. Rumus Implementasi Pelmet di CSS/HTML
```html
<header class="fixed top-0 left-0 right-0 z-50 pointer-events-none flex justify-center">
  <div class="w-full max-w-4xl h-24 md:h-32 bg-contain bg-top bg-repeat-x drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]"
       style="
         background-image: url('/assets/pelmets/canopy_lace_sunda.png');
         mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
         -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
       ">
  </div>
</header>
```

---

## 5. REKOMENDASI TAHAPAN EKSEKUSI (SOTO'S DESIGN HANDOFF)

1. **Asset Pipeline**:
   - Rapikan seluruh aset kanopi Sunda (`sunda_canopy_*.png`) yang ada di root workspace ke dalam folder `assets/pelmets/` sesuai standar Repositori Hygiene.
   - Siapkan SVG vector path untuk filigree corner ornaments 1px hairline emas.
2. **Component Token Integration**:
   - Suntikkan token CSS di atas ke dalam file Tailwind / Global CSS (`invitation-app/src/index.css`).
3. **Motion Choreography**:
   - Kolaborasi bersama lead motion developer untuk menyelaraskan entry animation: Pelmet drape fade-down (durasi 1.2s), Arch gate slow-scale 1.04 -> 1.00 (durasi 1.8s), dan glowing pulse pada CTA button.
