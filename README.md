# Gawena - Alat Otomatisasi Pembuatan & Manajemen Kode Program

Gawena adalah sebuah alat berbasis command-line yang menggunakan kekuatan model Google Gemini untuk membantu Anda dalam proses pengembangan perangkat lunak. Alat ini dirancang untuk mengotomatiskan tugas-tugas umum seperti pembuatan proyek baru, perbaikan kode, duplikasi proyek, serta manajemen riwayat perubahan.

## Fitur Utama

*   **Buat Proyek Baru:** Hasilkan struktur proyek lengkap dari awal berdasarkan deskripsi yang Anda berikan kepada AI.
*   **Perbaiki Proyek:** Perbaiki bug, tambahkan fitur, atau modifikasi kode pada proyek yang sudah ada berdasarkan instruksi.
*   **Duplikasi & Modifikasi Proyek:** Salin seluruh struktur proyek yang ada, lalu terapkan modifikasi spesifik menggunakan AI.
*   **Undo Project:** Kembalikan perubahan pada proyek ke kondisi sebelumnya melalui sistem riwayat.
*   **Bersihkan Riwayat:** Hapus log riwayat operasi untuk menjaga kebersihan data.

## Teknologi yang Digunakan

*   **Node.js:** Lingkungan runtime untuk eksekusi skrip.
*   **Google Gemini API:** Model AI untuk pemrosesan bahasa alami dan pembuatan kode.
*   **fast-glob:** Untuk pemindaian direktori.
*   **prompt-sync:** Untuk interaksi pengguna melalui command-line.

## Prasyarat

Sebelum menjalankan Gawena, pastikan Anda telah menginstal:

*   **Node.js** (versi 18 atau lebih tinggi direkomendasikan).
*   Kunci **API Google Gemini** yang valid.

## Instalasi

1.  **Clone repositori** (jika Anda mengkloning repositori ini).
2.  **Instal dependensi** menggunakan npm atau yarn:

    ```bash
    npm install
    # atau
    yarn install
    ```

## Konfigurasi

Gawena memerlukan beberapa variabel lingkungan untuk beroperasi, terutama kunci API Google Gemini Anda. Buat file `.env` di direktori root proyek (jika belum ada) dan tambahkan konfigurasi berikut:

```env
# Ganti dengan kunci API Gemini Anda yang sebenarnya
API_KEY_GEMINI="YOUR_GEMINI_API_KEY"

# Model yang digunakan (sesuaikan jika perlu)
MODEL="gemini-1.5-flash-latest"

# Parameter konfigurasi model
TEMPERATURE="0.7"
PEMIKIRAN="10000" # Dalam token
MAX_OUTPUT="8192"
```

## Penggunaan

Jalankan aplikasi melalui script utama:

```bash
node src/_app.js
```

Anda akan disajikan menu layanan. Ikuti instruksi di layar untuk memilih layanan dan memberikan input yang diperlukan.

### Contoh Alur Kerja (Membuat Proyek Baru)

1.  Jalankan `node src/_app.js`.
2.  Pilih opsi `1. buatkan project`.
3.  Masukkan deskripsi proyek yang ingin Anda buat (misal: "buatkan saya sebuah aplikasi CLI sederhana untuk manajemen task menggunakan Node.js dengan fitur CRUD").
4.  Masukkan nama direktori output untuk proyek baru Anda (misal: `my-new-cli-app`).
5.  Alat akan memanggil API Gemini dan menghasilkan struktur proyek dalam direktori output yang ditentukan.

### Format Output AI

AI dirancang untuk merespons dalam format JSON terstruktur yang mencakup:
*   `project`: Daftar file dan folder yang dibuat/dimodifikasi.
*   `delets`: Daftar file dan folder yang dihapus.
*   `laporan`: Ringkasan teknis dari perubahan yang dilakukan.

Format ini diatur oleh skema yang ketat untuk memastikan konsistensi dan kemudahan pemrosesan oleh alat.

## Lisensi

Proyek ini dirilis di bawah lisensi [ISC](https://opensource.org/licenses/ISC).
