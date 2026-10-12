# Cetak Biru Motion Art Minang Rumah Gadang

## 1. Bedah Masalah Visual Lama

| Elemen | Gejala "Aneh" | Penyebabnya |
|---|---|---|
| Gonjong | Terlihat seperti "topi kerucut" simetris kaku | Digambar sebagai segitiga sederhana; aslinya gonjong itu **kurva parabolik asimetris** yang meruncing ke atas, dengan ujung melengkung ke luar seperti tanduk kerbau |
| Tali gantungan / "sirkus" | Garis-garis vertikal/diagonal acak menyerupai tali tenda | Seharusnya tidak ada tali sembarang — yang ada adalah **tali timba** (tali penyeimbang) yang hanya muncul di varian gonjong tertentu, dan bukan elemen dekoratif utama |
| Jendela kotak datar | Terlihat seperti jendela rumah modern | Jendela gadang otentik itu **banir/tingkap** — persegi dengan bingkai ukiran lebar, kadang berbentuk persegi panjang vertikal dengan kisi ukiran, bukan bidang datar polos |
| Tiang panggung | Terlihat seperti tiang beton biasa | Tiang gadang = **tiang tonggak tuo** yang dibungkus ukiran, dengan **gaba-gaba/panggung** bawah berlantai papan dan tangga gonjong di depan |

Kesalahan terbesar visual lama: **proporsi kompresi** — atap digambar terlalu pendek dan lebar sehingga gonjong kehilangan "julang"-nya; badan rumah terlalu kotak sehingga efek "lantiak" (melebar ke atas) hilang.

## 2. Proporsi Arsitektur Otentik (Gajah Maharam / Baanjuang)

Bayangkan canvas **W:H = 16:9**. Gunakan grid relatif 0–1000 (x) × 0–1000 (y):

- **Atap (40–45% tinggi total):** Gajah Maharam punya 5–7 gonjong; gonjong tengah tertinggi. Atap ijuk berlapis: 3–5 lapis sirap, warna dasar hitam pekat (#14100C) dengan highlight emas (#D4A017) di tiap garis lapis.
- **Kurva gonjong parabolik:** Dari eave (ujung atap bawah) naik ke puncak dengan kurva `y = a·x²` yang dipercepat di ujung — puncak **melengkung ke luar** (seperti tanduk kerbau). Rasio tinggi gonjong : lebar bentang ≈ 1 : 1.6 untuk gonjong tengah, 1 : 2.2 untuk gonjong samping.
- **Badan rumah (lantiak):** Dinding miring keluar ke atas — lebar bawah (lantai) misal 520 unit, lebar atas (perabung) 640 unit. Sudut kemiringan ≈ 8–12° dari vertikal. Ini yang memberi kesan "megah mengembang".
- **Tiang panggung:** Tinggi kolong 25–30% dari tinggi badan rumah. Tiang digambar dengan ukiran vertikal (bukan tiang polos) + tangga depan 5–7 anak tangga.

## 3. Ornamen & Ukiran + Palet Marawa

**Empat ukiran wajib (pilih yang cocok per panel dinding):**
1. **Kaluak Paku** — sulur pakis melingkar, untuk bingkai jendela & lis atas dinding.
2. **Pucuk Rebung** — segitiga rebung berulang (zig-zag runcing), untuk border horizontal badan rumah.
3. **Itiak Pulang Patang** — motif itik beriring (garis lengkung berurutan), untuk panel dinding bawah.
4. **Carano** — motif bunga/bintang 8 kelopak simetris, untuk center panel & puncak tiang.

**Palet Marawa (strict):**
- Hitam arang: `#0F0C09`
- Merah Marawa (crimson): `#A31621`
- Kuning Emas: `#D4A017` (highlight `#F5D76E`)
- Aturan: ukiran selalu **emas di atas hitam**, aksen merah hanya di background panel & lis dalam — tidak lebih dari 20% area.

## 4. Suasana Latar Panggung Malam

Layer dari belakang ke depan (untuk motion parallax):
1. **Langit:** gradien malam `#0A1028` → `#1B2A4A`, bintang sparse (80–120 titik, twinkle animasi).
2. **Siluet gunung:** Gunung Marapi (kerucut) di kiri, Singgalang (punggung ganda) di kanan — warna `#0D1526`, kabut Bukit Barisan: 2–3 band ellipse blur putih transparan 12–18% yang **bergerak lambat horizontal** (drift 20–40 px per loop).
3. **Pohon beringin / rangkiang kembar:** siluet `#0A0E1A` di kiri-kanan frame; rangkiang digambar mini dengan atap gonjong sendiri (echo visual yang kuat).
4. **Lampu teplok/damar:** 6–10 titik cahaya `#FFB545` dengan halo radial (radius 40–60 px, falloff), flicker animasi ±8% intensitas. Refleksi cahaya di lantai panggung.
5. **Rumah Gadang** di tengah sebagai hero, dengan rim light emas tipis di kontur gonjong (garis 2 px `#F5D76E` opacity 60%).

## 5. Formula Teknis Generator (Python PIL / SVG)

**Koordinat gonjong (bezier kubik, canvas 1920×1080):**
```python
# Gonjong tengah: puncak (960,180), eave kiri (560,560), eave kanan (1360,560)
gonjong = [("M", 560, 560),
           ("C", 700, 540, 840, 420, 940, 260),   # sisi kiri naik parabolik
           ("C", 965, 200, 975, 190, 985, 185),   # puncak melengkung keluar
           ("C", 1050, 220, 1200, 420, 1360, 560),# sisi kanan turun
           ("Z",)]
```
- Kontrol point: 70–75% dari segmen garis lurus harus ditarik ke arah puncak agar kurva "runcing julang", bukan membulat.
- Lapisan ijuk: duplikasi path gonjong dengan offset y +40/+80/+120 px, stroke `#D4A017` 2 px, fill none — beri efek berlapis.

**Gradien palet Marawa (PIL):**
```python
from PIL import Image, ImageDraw
def marawa_gradient(w, h):
    img = Image.new("RGB", (w, h))
    top, bottom = (15,12,9), (163,22,33)  # hitam -> merah marawa
    for y in range(h):
        t = y / h
        px = tuple(int(top[i] + (bottom[i]-top[i]) * t**1.4) for i in range(3))
        ImageDraw.Draw(img).line([(0,y),(w,y)], fill=px)
    return img
# Emas ditambahkan sebagai overlay ukiran, bukan bagian gradien.
```

**Detail dinding ukir (SVG pattern):**
```xml
<pattern id="pucukRebung" width="60" height="40" patternUnits="userSpaceOnUse">
  <path d="M0,40 L15,8 L30,40 Z M30,40 L45,8 L60,40 Z" fill="#D4A017"/>
  <rect width="60" height="40" fill="none" stroke="#A31621" stroke-width="2"/>
</pattern>
<pattern id="kaluakPaku" width="80" height="60" patternUnits="userSpaceOnUse">
  <path d="M10,50 Q10,15 40,15 Q65,15 65,40 Q65,55 50,55 Q40,55 40,45"
        fill="none" stroke="#D4A017" stroke-width="3"/>
</pattern>
```
- Terapkan `pucukRebung` sebagai border atas/bawah badan rumah (height 40 px), `kaluakPaku` untuk bingkai jendela, `Itiak Pulang Patang` sebagai path lengkung berulang `Q` di panel bawah.
- Dinding lantiak: path trapesium terbalik, fill = marawa_gradient, stroke emas 3 px.

**Checklist render akhir:** gonjong runcing julang ✓ | lantiak terlihat dari depan ✓ | ukiran emas-di-hitam ✓ | merah ≤ 20% ✓ | rim light gonjong ✓ | kabut drift + teplok flicker (motion) ✓

Selamat berkarya — kalau mau, gue bisa bikinin skrip generator lengkapnya tinggal jalan.
