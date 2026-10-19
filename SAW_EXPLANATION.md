# Penjelasan Matematis Algoritma Simple Additive Weighting (SAW)
## Sistem Pendukung Keputusan Pemilihan Guru Terbaik — Bimbingan Belajar Nurul Fikri

---

## 1. Pendahuluan
Metode **Simple Additive Weighting (SAW)** sering dikenal juga sebagai metode penjumlahan terbobot. Konsep dasar metode SAW adalah mencari penjumlahan terbobot dari rating kinerja pada setiap alternatif pada semua atribut/kriteria.

Metode SAW membutuhkan proses **normalisasi matriks keputusan ($X$)** ke suatu skala yang dapat diperbandingkan ($R$) dengan semua rating alternatif yang ada.

---

## 2. Formulasi Matematis SAW

### A. Pembentukan Matriks Keputusan ($X$)
Misalkan terdapat $m$ alternatif guru ($A_1, A_2, \dots, A_m$) dan $n$ kriteria penilaian ($C_1, C_2, \dots, C_n$).
Matriks keputusan $X$ berukuran $m \times n$ didefinisikan sebagai:

$$
X = \begin{pmatrix}
x_{11} & x_{12} & \dots & x_{1n} \\
x_{21} & x_{22} & \dots & x_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
x_{m1} & x_{m2} & \dots & x_{mn}
\end{pmatrix}
$$

Di mana:
- $x_{ij}$ adalah nilai kinerja alternatif guru ke-$i$ terhadap kriteria ke-$j$.

---

### B. Tahap Normalisasi Matriks ($R$)
Formula normalisasi untuk elemen matriks ternormalisasi $r_{ij}$ adalah:

1. **Untuk Kriteria Atribut Keuntungan (Benefit)**:
   $$r_{ij} = \frac{x_{ij}}{\max_i(x_{ij})}$$
   *Artinya: Semakin besar nilai $x_{ij}$, semakin baik kinerjanya.*

2. **Untuk Kriteria Atribut Biaya (Cost)** (bila digunakan):
   $$r_{ij} = \frac{\min_i(x_{ij})}{x_{ij}}$$
   *Artinya: Semakin kecil nilai $x_{ij}$, semakin baik kinerjanya. Sistem menerapkan pengamanan agar penyebut $x_{ij} \neq 0$.*

Di mana:
- $r_{ij}$ adalah nilai rating kinerja ternormalisasi dari alternatif $A_i$ pada atribut $C_j$.
- $\max_i(x_{ij})$ adalah nilai maksimum dari kriteria ke-$j$.
- $\min_i(x_{ij})$ adalah nilai minimum dari kriteria ke-$j$.

---

### C. Pembobotan Kriteria ($W$)
Setiap kriteria $C_j$ memiliki bobot preferensi $W_j$.
Jika total bobot mentah $\sum_{j=1}^n \text{bobot}_j \neq 1$, maka bobot dinormalisasi menjadi:

$$w_j = \frac{\text{bobot}_j}{\sum_{k=1}^n \text{bobot}_k}$$

Sehingga:
$$\sum_{j=1}^n w_j = 1.0$$

---

### D. Perhitungan Nilai Preferensi ($V_i$)
Nilai preferensi untuk setiap alternatif guru ($V_i$) dihitung dengan rumus:

$$V_i = \sum_{j=1}^n (w_j \times r_{ij})$$

Di mana:
- $V_i$ adalah nilai preferensi (skor akhir) untuk alternatif guru ke-$i$.
- $w_j$ adalah bobot ternormalisasi kriteria ke-$j$.
- $r_{ij}$ adalah rating kinerja ternormalisasi alternatif ke-$i$ pada kriteria ke-$j$.

Nilai $V_i$ yang lebih besar mengindikasikan bahwa alternatif guru $A_i$ lebih direkomendasikan.

---

## 3. Studi Kasus dan Contoh Hitungan Manual Rinci (Hand Calculation)

Dataset di bawah ini diambil dari data simulasi resmi sistem Bimbel Nurul Fikri yang memuat **5 Guru Alternatif** dan **8 Kriteria Benefit**.

### 1. Data Alternatif Guru
- **$A_1$ (G-001)**: Ahmad Fauzi, M.Pd. (Matematika Saintek)
- **$A_2$ (G-002)**: Siti Nurhaliza, S.Si. (Fisika)
- **$A_3$ (G-003)**: Budi Santoso, S.Pd. (Kimia)
- **$A_4$ (G-004)**: Dewi Lestari, S.S. (Bahasa Inggris)
- **$A_5$ (G-005)**: Rizky Pratama, M.Kom. (Biologi & TPS)

### 2. Kriteria dan Bobot
Seluruh 8 kriteria bertipe **Benefit**:
- $C_1$: Kehadiran — Bobot: 10 ($w_1 = 0.10$)
- $C_2$: Kedisiplinan — Bobot: 10 ($w_2 = 0.10$)
- $C_3$: Kualitas Mengajar — Bobot: 10 ($w_3 = 0.10$)
- $C_4$: Penguasaan Materi — Bobot: 40 ($w_4 = 0.40$)
- $C_5$: Persiapan Mengajar — Bobot: 8 ($w_5 = 0.08$)
- $C_6$: Kemampuan Komunikasi — Bobot: 8 ($w_6 = 0.08$)
- $C_7$: Pengelolaan Kelas — Bobot: 7 ($w_7 = 0.07$)
- $C_8$: Hasil Belajar Siswa — Bobot: 7 ($w_8 = 0.07$)
- **Total Bobot** = 100 ($w_{\text{total}} = 1.00$)

---

### 3. Matriks Keputusan Mentah ($X$)

| Kode Alternatif | Guru | C1 | C2 | C3 | C4 | C5 | C6 | C7 | C8 |
|:---:|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| $A_1$ | Ahmad Fauzi, M.Pd. | 95 | 92 | 94 | 98 | 90 | 92 | 88 | 94 |
| $A_2$ | Siti Nurhaliza, S.Si. | 90 | 88 | 90 | 90 | 86 | 88 | 85 | 88 |
| $A_3$ | Budi Santoso, S.Pd. | 85 | 82 | 80 | 82 | 78 | 80 | 76 | 78 |
| $A_4$ | Dewi Lestari, S.S. | 80 | 78 | 75 | 76 | 74 | 78 | 72 | 75 |
| $A_5$ | Rizky Pratama, M.Kom. | 88 | 86 | 85 | 86 | 82 | 85 | 80 | 82 |
| **Max ($x_j$)** | | **95** | **92** | **94** | **98** | **90** | **92** | **88** | **94** |
| **Min ($x_j$)** | | **80** | **78** | **75** | **76** | **74** | **78** | **72** | **75** |

---

### 4. Normalisasi Matriks ($R$)
Karena semua kriteria berjenis **Benefit**, maka rumus yang digunakan:
$$r_{ij} = \frac{x_{ij}}{\max(x_j)}$$

#### Perhitungan tiap sel:
- **Untuk $A_1$ (Ahmad Fauzi)**:
  - $r_{11} = \frac{95}{95} = 1.0000$
  - $r_{12} = \frac{92}{92} = 1.0000$
  - $r_{13} = \frac{94}{94} = 1.0000$
  - $r_{14} = \frac{98}{98} = 1.0000$
  - $r_{15} = \frac{90}{90} = 1.0000$
  - $r_{16} = \frac{92}{92} = 1.0000$
  - $r_{17} = \frac{88}{88} = 1.0000$
  - $r_{18} = \frac{94}{94} = 1.0000$

- **Untuk $A_2$ (Siti Nurhaliza)**:
  - $r_{21} = \frac{90}{95} = 0.9474$
  - $r_{22} = \frac{88}{92} = 0.9565$
  - $r_{23} = \frac{90}{94} = 0.9574$
  - $r_{24} = \frac{90}{98} = 0.9184$
  - $r_{25} = \frac{86}{90} = 0.9556$
  - $r_{26} = \frac{88}{92} = 0.9565$
  - $r_{27} = \frac{85}{88} = 0.9659$
  - $r_{28} = \frac{88}{94} = 0.9362$

- **Untuk $A_3$ (Budi Santoso)**:
  - $r_{31} = \frac{85}{95} = 0.8947$
  - $r_{32} = \frac{82}{92} = 0.8913$
  - $r_{33} = \frac{80}{94} = 0.8511$
  - $r_{34} = \frac{82}{98} = 0.8367$
  - $r_{35} = \frac{78}{90} = 0.8667$
  - $r_{36} = \frac{80}{92} = 0.8696$
  - $r_{37} = \frac{76}{88} = 0.8636$
  - $r_{38} = \frac{78}{94} = 0.8298$

- **Untuk $A_4$ (Dewi Lestari)**:
  - $r_{41} = \frac{80}{95} = 0.8421$
  - $r_{42} = \frac{78}{92} = 0.8478$
  - $r_{43} = \frac{75}{94} = 0.7979$
  - $r_{44} = \frac{76}{98} = 0.7755$
  - $r_{45} = \frac{74}{90} = 0.8222$
  - $r_{46} = \frac{78}{92} = 0.8478$
  - $r_{47} = \frac{72}{88} = 0.8182$
  - $r_{48} = \frac{75}{94} = 0.7979$

- **Untuk $A_5$ (Rizky Pratama)**:
  - $r_{51} = \frac{88}{95} = 0.9263$
  - $r_{52} = \frac{86}{92} = 0.9348$
  - $r_{53} = \frac{85}{94} = 0.9043$
  - $r_{54} = \frac{86}{98} = 0.8776$
  - $r_{55} = \frac{82}{90} = 0.9111$
  - $r_{56} = \frac{85}{92} = 0.9239$
  - $r_{57} = \frac{80}{88} = 0.9091$
  - $r_{58} = \frac{82}{94} = 0.8723$

---

### 5. Tabel Matriks Normalisasi ($R$)

| Alternatif | C1 | C2 | C3 | C4 | C5 | C6 | C7 | C8 |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **$A_1$** | 1.0000 | 1.0000 | 1.0000 | 1.0000 | 1.0000 | 1.0000 | 1.0000 | 1.0000 |
| **$A_2$** | 0.9474 | 0.9565 | 0.9574 | 0.9184 | 0.9556 | 0.9565 | 0.9659 | 0.9362 |
| **$A_3$** | 0.8947 | 0.8913 | 0.8511 | 0.8367 | 0.8667 | 0.8696 | 0.8636 | 0.8298 |
| **$A_4$** | 0.8421 | 0.8478 | 0.7979 | 0.7755 | 0.8222 | 0.8478 | 0.8182 | 0.7979 |
| **$A_5$** | 0.9263 | 0.9348 | 0.9043 | 0.8776 | 0.9111 | 0.9239 | 0.9091 | 0.8723 |

---

### 6. Perhitungan Skor Preferensi Akhir ($V_i$)

$$V_i = \sum_{j=1}^8 (w_j \times r_{ij})$$

Di mana vektor bobot:
$$W = [0.10,\ 0.10,\ 0.10,\ 0.40,\ 0.08,\ 0.08,\ 0.07,\ 0.07]$$

#### Evaluasi perhitungan per alternatif:

- **$V_1$ (Ahmad Fauzi)**:
  $$V_1 = (0.10 \times 1.0) + (0.10 \times 1.0) + (0.10 \times 1.0) + (0.40 \times 1.0) + (0.08 \times 1.0) + (0.08 \times 1.0) + (0.07 \times 1.0) + (0.07 \times 1.0)$$
  $$V_1 = 0.10 + 0.10 + 0.10 + 0.40 + 0.08 + 0.08 + 0.07 + 0.07 = \mathbf{1.0000}$$

- **$V_2$ (Siti Nurhaliza)**:
  $$V_2 = (0.10 \times 0.9474) + (0.10 \times 0.9565) + (0.10 \times 0.9574) + (0.40 \times 0.9184) + (0.08 \times 0.9556) + (0.08 \times 0.9565) + (0.07 \times 0.9659) + (0.07 \times 0.9362)$$
  $$V_2 = 0.0947 + 0.0957 + 0.0957 + 0.3674 + 0.0764 + 0.0765 + 0.0676 + 0.0655 = \mathbf{0.9396}$$

- **$V_5$ (Rizky Pratama)**:
  $$V_5 = (0.10 \times 0.9263) + (0.10 \times 0.9348) + (0.10 \times 0.9043) + (0.40 \times 0.8776) + (0.08 \times 0.9111) + (0.08 \times 0.9239) + (0.07 \times 0.9091) + (0.07 \times 0.8723)$$
  $$V_5 = 0.0926 + 0.0935 + 0.0904 + 0.3510 + 0.0729 + 0.0739 + 0.0636 + 0.0611 = \mathbf{0.8991}$$

- **$V_3$ (Budi Santoso)**:
  $$V_3 = (0.10 \times 0.8947) + (0.10 \times 0.8913) + (0.10 \times 0.8511) + (0.40 \times 0.8367) + (0.08 \times 0.8667) + (0.08 \times 0.8696) + (0.07 \times 0.8636) + (0.07 \times 0.8298)$$
  $$V_3 = 0.0895 + 0.0891 + 0.0851 + 0.3347 + 0.0693 + 0.0696 + 0.0605 + 0.0581 = \mathbf{0.8558}$$

- **$V_4$ (Dewi Lestari)**:
  $$V_4 = (0.10 \times 0.8421) + (0.10 \times 0.8478) + (0.10 \times 0.7979) + (0.40 \times 0.7755) + (0.08 \times 0.8222) + (0.08 \times 0.8478) + (0.07 \times 0.8182) + (0.07 \times 0.7979)$$
  $$V_4 = 0.0842 + 0.0848 + 0.0798 + 0.3102 + 0.0658 + 0.0678 + 0.0573 + 0.0559 = \mathbf{0.8057}$$

---

### 7. Hasil Akhir Perangkingan

Mengurutkan nilai $V_i$ dari tertinggi ke terendah:

| Peringkat | ID Guru | Nama Guru | Mata Pelajaran | Nilai Preferensi ($V$) | Status Rekomendasi |
|:---:|:---:|:---|:---|:---:|:---|
| **1** | G-001 | **Ahmad Fauzi, M.Pd.** | Matematika Saintek | **1.0000** | Sangat Direkomendasikan (Peringkat 1) |
| **2** | G-002 | **Siti Nurhaliza, S.Si.** | Fisika | **0.9396** | Direkomendasikan (Top 3) |
| **3** | G-005 | **Rizky Pratama, M.Kom.** | Biologi & TPS | **0.8991** | Direkomendasikan (Top 3) |
| **4** | G-003 | **Budi Santoso, S.Pd.** | Kimia | **0.8558** | Cukup |
| **5** | G-004 | **Dewi Lestari, S.S.** | Bahasa Inggris | **0.8057** | Cukup |

---

## 4. Verifikasi dan Validasi Matematis
Perhitungan manual di atas telah diverifikasi dengan modul komputasi `sawCalculation.js` pada sistem.
Hasil perhitungan matematis manual dan komputasi sistem terbukti **100% konsisten dan identik** hingga 4 digit di belakang koma.
