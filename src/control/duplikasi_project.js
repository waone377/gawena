import mesinCall from "../mesin/gemini.js";
import directory from "../service/directory.js";
import { Fs, Dir } from "../util/file.js";
import promptConfirm from "../service/prompt.js";
import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import { cwd } from "../service/lokasi.js";
import History from "../service/history.js";
import targeter from "../service/target.js";
import path from "path";

import history_p from "../util/lokasi.js";
async function duplikasi_project() {
  // Membungkus proses duplikasi proyek dengan penanganan error
  try {
    // Mengambil riwayat target direktori duplikasi sebelumnya
    const h = History.get(history_p.duplikasi, { set: false, target: "" });
    let target = h.target;
    // Jika tidak ada riwayat target, minta input direktori target dari pengguna
    if (!h.set) {
      target = targeter();
    }
    // Menyimpan direktori target terpilih ke dalam riwayat
    History.save(history_p.duplikasi, { set: true, target });
    // Mendapatkan path absolut dari direktori target
    const repo = cwd(target);
    // Membaca struktur direktori target dan mengubahnya menjadi format markdown
    const markdown = directory(repo);
    // Memeriksa dan memproses konfirmasi berkas prompt.txt
    const p = promptConfirm();
    let prompt = p.text;
    // Jika prompt.txt tidak aktif, minta deskripsi modifikasi secara manual
    if (!p.cek) {
      prompt = Masukan.wajib("apa yang ingin dimodifikasi pada project?> ");
    }
    prompt =
      "konteksnya duplikat tugasmu: '" +
      prompt.trim() +
      "'\nberikut project yang diduplikasinya silahkan:\n" +
      markdown;
    // Memanggil LLM untuk menduplikasi serta memodifikasi proyek
    const { project, delets } = await mesinCall(prompt);
    // Meminta nama direktori keluaran untuk proyek hasil duplikasi
    const dir_out = Masukan.wajib("masukan nama project baru?> ");
    // Menampilkan status progres duplikasi proyek
    Print.clear("sedang menduplikasi project...");
    // Iterasi untuk membuat struktur proyek baru di direktori output
    for (const eee of project) {
      const lokasi = path.join("output", dir_out, eee.lokasi);
      // Memproses pembuatan entitas folder, config, file, atau dokumen
      switch (eee.jenis) {
        case "folder":
          Dir.buat(lokasi);
          Print.log(eee.jenis, " ", lokasi, " success created");
          break;
        case "config":
          Fs.tulis(lokasi, eee.konten);
          Print.log(eee.jenis, " ", lokasi, " success created");
          break;
        case "file":
          Fs.tulis(lokasi, eee.konten);
          Print.log(eee.jenis, " ", lokasi, " success created");
          break;
        case "dok":
          Fs.tulis(lokasi, eee.konten);
          Print.log(eee.jenis, " ", lokasi, " success created");
          break;
        default:
          Print.log(eee.jenis, " ", lokasi, " failed created!");
          break;
      }
    }
    // Menampilkan pesan sukses setelah proses duplikasi selesai
    Print.log("duplikasi project success...");
  } catch (err) {
    // Menangkap dan melempar kembali error jika terjadi masalah
    throw new Error(err.message);
  }
}
export default duplikasi_project;
