# Gawena: Generator & Refactor Kode Cerdas Berbasis AI

Gawena adalah sebuah alat baris perintah (CLI) untuk membantu developer mempercepat alur kerja mereka, baik dalam membuat struktur proyek baru dari awal maupun melakukan refactoring pada proyek yang sudah ada berdasarkan instruksi, dengan bertenaga mesin model Gemini.

## Fitur Utama

- **Pembuatan Proyek Baru**: Hasilkan seluruh struktur folder dan file untuk proyek baru (misalnya, "buatkan saya API server Express dengan TypeScript") hanya dengan satu perintah.
- **Refactoring & Perbaikan Proyek**: Analisis kode proyek yang ada dan terapkan perubahan, tambahkan fitur baru, atau perbaiki bug sesuai instruksi Anda.
- **Duplikasi & Modifikasi Proyek**: Buat salinan lengkap proyek yang ada, terapkan modifikasi, dan simpan sebagai proyek baru.
- **Pembacaan Proyek Selektif**: Kontrol penuh atas file mana yang dianalisis oleh AI, dengan mode inklusi (hanya baca yang dipilih) atau eksklusi (abaikan yang dipilih).
- **Riwayat Percakapan Berkonteks**: Menyimpan dan menggunakan kembali riwayat interaksi dengan AI, memungkinkan Anda untuk melakukan koreksi berulang hingga hasil yang diinginkan tercapai.
- **Konfigurasi Fleksibel**: Mudah untuk mengkonfigurasi model AI, temperature, dan parameter lainnya melalui file `.env`.
- **Dukungan Prompt Eksternal**: Gunakan file `prompt.txt` untuk instruksi yang lebih panjang dan kompleks, ideal untuk tugas yang rumit.

## Prasyarat

- [Node.js](https://nodejs.org/) (versi 18.x atau lebih tinggi)
- API Key dari [Google AI Studio](https://aistudio.google.com/app/apikey)

## Instalasi & Konfigurasi

Ikuti langkah-langkah berikut untuk menjalankan Gen-Kode di mesin lokal Anda.

**1. Clone Repositori**

```bash
git clone https://github.com/waone377/gawena.git
cd gawena
```

**2. Instal Dependensi**

```bash
npm install
```

**3. Konfigurasi Environment Variable**

Buat file baru bernama `.env` di root direktori proyek. Salin konten di bawah ini dan isi nilainya sesuai dengan konfigurasi Anda.

```env
GEMINI_API=?
MODEL=gemini-2.5-pro
TEMPERATURE=0.9
PEMIKIRAN=23000
MAX_OUTPUT=19000
```

- `GEMINI_API`: Kunci API Anda dari Google AI Studio. **Wajib diisi.**
- `MODEL`: Model Gemini yang ingin Anda gunakan. `gemini-2.5-flash-lite` atau `gemini-2.5-pro` adalah pilihan yang solid dan direkomendasikan.
- `TEMPERATURE`: Mengontrol kreativitas output (0.0 - 2.0). Nilai yang lebih tinggi (misalnya, 0.9) menghasilkan output yang lebih beragam, sementara nilai yang lebih rendah (misalnya, 0.2) lebih fokus dan deterministik.
- `PEMIKIRAN`: Alokasi token untuk proses "berpikir" internal model sebelum menghasilkan respons.
- `MAX_OUTPUT`: Jumlah maksimum token yang dapat dihasilkan oleh model dalam satu respons.

## Cara Penggunaan

Jalankan aplikasi dari terminal:

```bash
npm start
```

Anda akan disambut dengan menu utama untuk memilih mode operasi.

### Mode 1: Membuat Project Baru

Ideal untuk memulai proyek dari nol berdasarkan deskripsi konseptual.

1.  Pilih menu `1`.
2.  Tentukan apakah akan menggunakan `prompt.txt` untuk deskripsi yang detail atau mengetik langsung di terminal.
3.  Setelah AI memproses permintaan, masukkan nama untuk folder proyek baru.
4.  Proyek akan dibuat di dalam direktori `output/<nama-proyek>`.

### Mode 2: Memperbaiki Project

Digunakan untuk memodifikasi, menambah fitur, atau memperbaiki kode pada proyek yang sudah ada.

1.  Pilih menu `2`.
2.  Masukkan path ke direktori proyek yang akan diperbaiki. Aplikasi akan mengingat path terakhir yang Anda gunakan.
3.  **Pilih Mode Pembacaan Source**:
    - **Inklusi (Sertakan)**: Mode ini hanya akan menganalisis file/folder yang Anda tentukan secara spesifik. Berguna untuk perbaikan yang sangat terfokus.
    - **Eksklusi (Kecualikan)**: Mode ini akan membaca seluruh proyek dan mengabaikan file/folder yang Anda tentukan. Direkomendasikan untuk pemahaman konteks yang lebih luas.
4.  Berikan instruksi perbaikan, baik melalui `prompt.txt` atau input langsung.
5.  Setelah AI memberikan solusi, pilih mode penyimpanan:
    - **Timpa project asli**: Menerapkan perubahan langsung ke proyek sumber.
    - **Membuat project baru**: Menyimpan versi yang telah diperbaiki sebagai proyek baru di dalam direktori `output/`.

### Mode 3: Duplikat Project

Gunakan mode ini untuk membuat salinan lengkap dari proyek yang sudah ada, sekaligus menerapkan modifikasi berdasarkan instruksi Anda.

1.  Pilih menu `3`.
2.  Masukkan path ke direktori proyek yang akan diduplikat. Aplikasi akan mengingat path terakhir yang Anda gunakan.
3.  Tentukan apakah akan menggunakan `prompt.txt` untuk deskripsi modifikasi yang detail atau mengetik langsung di terminal.
4.  Setelah AI memproses permintaan, masukkan nama untuk folder proyek hasil duplikasi dan modifikasi baru.
5.  Proyek akan dibuat di dalam direktori `output/<nama-proyek-baru>`.

### Mode 4: Hapus Riwayat

Opsi ini akan menghapus semua riwayat percakapan yang tersimpan di `history/riwayat.json` untuk memulai sesi baru yang bersih.

## Struktur Proyek

- `src/_app.js`: Titik masuk utama aplikasi, mengelola alur menu utama.
- `src/config/`: Direktori untuk file konfigurasi statis.
  - `ignore.js`: Daftar default file, folder, dan ekstensi yang diabaikan saat membaca proyek.
- `src/dok/`: Berisi file teks yang digunakan sebagai instruksi sistem untuk AI.
  - `intruksi.txt`: Instruksi inti peran dan format output AI.
- `src/fitur/`: Modul yang mengelola fitur utama aplikasi.
  - `pembuatan.js`: Mengelola logika untuk mode "Membuat Project Baru".
  - `perbaikan.js`: Mengelola logika untuk mode "Memperbaiki Project".
  - `duplikat.js`: Mengelola logika untuk mode "Duplikat Project".
  - `penghapusan.js`: Mengelola logika untuk mode "Hapus Riwayat".
- `src/mesin/`: Modul inti untuk interaksi dengan AI Gemini.
  - `configurasi.js`: Menginisialisasi model Google Gemini dengan konfigurasi dari `.env`.
  - `gemini.js`: Mengirim permintaan ke model AI, mengelola riwayat sesi, dan menangani koreksi.
  - `schema.js`: Mendefinisikan skema JSON yang diharapkan dari respons AI.
- `src/service/`: Modul untuk logika bisnis spesifik.
  - `generate_repo.js`: Menerapkan output JSON dari AI ke sistem file (membuat/menghapus file/folder).
  - `read_repo.js`: Membaca struktur dan konten proyek target menjadi format markdown.
- `src/util/`: Modul utilitas pembantu.
  - `files.js`: Menangani operasi file system seperti membaca, menulis, dan menghapus.
  - `input.js`: Mengelola interaksi dengan pengguna di terminal.
  - `tampilan.js`: Mengelola output ke terminal.
- `history/`: (Dibuat saat runtime) Direktori untuk menyimpan data sesi.
  - `riwayat.json`: Menyimpan riwayat percakapan dengan AI.
  - `target.json`: Menyimpan path direktori terakhir yang digunakan dalam mode perbaikan.
  - `output.json`: Menyimpan output JSON mentah terakhir dari AI.
- `output/`: Direktori default tempat proyek baru atau yang diperbaiki disimpan.
- `package.json`: Mendefinisikan metadata proyek, dependensi, dan skrip.
- `prompt.txt`: Tempat untuk menulis instruksi/prompt yang panjang atau kompleks untuk AI.
- `.gitignore`: Mengabaikan file dan folder yang tidak perlu dilacak oleh Git.
- `readme.md`: Dokumentasi proyek ini.

## Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT. Ini berarti Anda bebas menggunakan, menyalin, memodifikasi, menggabungkan, menerbitkan, mendistribusikan, mensublisensikan, dan/atau menjual salinan perangkat lunak, selama Anda menyertakan pemberitahuan hak cipta dan izin asli dalam semua salinan atau bagian penting dari perangkat lunak.
