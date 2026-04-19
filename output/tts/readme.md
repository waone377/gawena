# Contoh Penggunaan Socket.IO dengan TTS

Proyek ini mendemonstrasikan cara menggunakan Socket.IO untuk komunikasi real-time antara server Node.js dan klien web, serta menambahkan fitur Text-to-Speech (TTS) bawaan browser untuk membacakan pesan yang masuk.

## Fitur

- Koneksi WebSocket menggunakan Socket.IO.
- Pengiriman dan penerimaan pesan secara real-time.
- **Text-to-Speech (TTS) bawaan browser:** Pesan yang diterima akan dibacakan secara otomatis jika browser mendukung Web Speech API.

## Instalasi

1. Clone repository ini.
2. Navigasi ke direktori proyek: `cd nama-repo-anda`
3. Instal dependensi: `npm install`

## Menjalankan

Jalankan server menggunakan perintah:
`npm start`

Buka browser Anda dan kunjungi `http://localhost:3000`.

## Dependensi

- Node.js
- npm atau yarn
- Browser yang mendukung Web Speech API (untuk fitur TTS)
