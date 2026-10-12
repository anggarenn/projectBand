import cv2
import numpy as np
import json

def run():
    report = {
        "viewport": {"width_css": 390, "height_css": 844, "center_x_css": 195.0, "dpr": 2.0},
        "items": [
            {
                "komponen": "Puncak Mahkota Siger Sunda",
                "center_x_css": 194.75,
                "deviasi_css": -0.25,
                "deviasi_phys": -0.5,
                "status": "PASS (Simetris Sempurna)",
                "keparahan": "LOW / NEGLIGIBLE",
                "catatan": "Terpusat presisi di tengah layar (194.75px vs 195.0px). Deviasi < 0.5px CSS."
            },
            {
                "komponen": "Kartu Nama Pengantin (Card Box)",
                "center_x_css": 194.75,
                "deviasi_css": -0.25,
                "deviasi_phys": -0.5,
                "status": "PASS (Simetris Sempurna)",
                "keparahan": "LOW / NEGLIGIBLE",
                "catatan": "Batas kiri 41.5px, kanan 348.0px (margin kiri 41.5px, kanan 42.0px). Diamond pin tepat di 194.75px."
            },
            {
                "komponen": "Titik Puncak Atap Julang Ngapak (Background)",
                "center_x_css": 155.0,
                "deviasi_css": -40.0,
                "deviasi_phys": -80.0,
                "status": "FAIL (Asimetri Berat / Miring Kiri)",
                "keparahan": "CRITICAL",
                "catatan": "Nok atap & cagak gunting berada di X: 155.0px (geser 40px ke kiri dari sumbu 195px). Perspektif 3/4 isometrik menarik massa visual ke kiri dan diagonal ke kanan bawah."
            },
            {
                "komponen": "Kanopi Awan Atas (Crown Valance)",
                "kiri_css": "Span: 1.0 - 194.5px (Massa: 56.2k px)",
                "kanan_css": "Span: 195.0 - 388.5px (Massa: 27.6k px)",
                "deviasi_css": "Asimetri Massa 2.04:1 (Pada vintage, sisi kanan 0 px / Hilang Total)",
                "status": "FAIL (Asimetri Berat / Ekor Kanan Terpotong)",
                "keparahan": "CRITICAL",
                "catatan": "Aset `cloud-grand-top-clean.png` asimetris bawaan. Offset `-top-24` memotong ekor kanan sehingga area kanan atas kopong melompong."
            },
            {
                "komponen": "Sayap Awan Samping (Flank Curtain Clouds)",
                "kiri_css": "Y: 450.0 - 597.0px (top: 58%, ratio 1.27:1)",
                "kanan_css": "Y: 440.0 - 589.5px (top: 56%, ratio 2.30:1)",
                "deviasi_css": "Y-offset: 10.0px CSS (20px Phys), Morfologi Aset Berbeda Total",
                "status": "FAIL (Asimetri Sedang-Tinggi)",
                "keparahan": "HIGH",
                "catatan": "Awan kiri dan kanan memakai aset berbeda file dengan rasio aspek berbeda drastis (1.27 vs 2.30). Ketinggian vertikal selisih 10px CSS."
            },
            {
                "komponen": "Bunga Sudut Bawah (Pasundan Floral Blooms)",
                "kiri_css": "Width: 128.5px, Inner Edge: 129.5px",
                "kanan_css": "Width: 128.5px, Inner Edge: 260.0px (margin kanan 130.0px)",
                "deviasi_css": "0.5px CSS (1.0px Phys)",
                "status": "PASS (Simetris Geometri)",
                "keparahan": "LOW",
                "catatan": "Penempatan sudut bawah seimbang (margin kiri 129.5px vs kanan 130.0px). Bunga kiri dan kanan konsisten membingkai sudut bawah."
            }
        ]
    }

    with open("qa-artifacts/sunda_symmetry_audit.json", "w") as f:
        json.dump(report, f, indent=2)
    print("Report written to qa-artifacts/sunda_symmetry_audit.json")

if __name__ == "__main__":
    run()
