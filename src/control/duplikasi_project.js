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

/* Fungsi utama untuk menduplikasi dan memodifikasi proyek yang ada */
async function duplikasi_project() {
  try {
    /* Membaca riwayat target proyek yang pernah diduplikasi */
    const h = History.get(history_p.duplikasi, { set: false, target: "" });
    let target = h.target;
    /* Jika tidak ada riwayat, meminta target baru dari pengguna */
    if (!h.set) {
      target = targeter();
    }
    /* Menyimpan riwayat target saat ini */
    History.save(history_p.duplikasi, { set: true, target });
    /* Mendapatkan lokasi absolut direktori target */
    const repo = cwd(target);
    /* Membaca struktur direktori target ke bentuk format markdown */
    const markdown = directory(repo);
    /* Mengonfirmasi penggunaan prompt dari file eksternal */
    const p = promptConfirm();
    let prompt = p.text;
    /* Jika tidak menggunakan prompt.txt, meminta input dari pengguna */
    if (!p.cek) {
      prompt = Masukan.wajib("apa yang ingin dimodifikasi pada project?> ");
    }
    /* Mengonstruksi instruksi akhir untuk dikirimkan ke mesin AI */
    prompt =
      "konteksnya menduplikasi tugasmu: '" +
      prompt.trim() +
      "'\nberikut project yang diduplikasinya silahkan:\n" +
      markdown;
    /* Memanggil mesin AI untuk menghasilkan struktur proyek baru */
    const { project, delets } = await mesinCall(prompt);
    /* Meminta nama direktori output baru dari pengguna */
    const dir_out = Masukan.wajib("masukan nama project baru?> ");
    Print.clear("sedang menduplikasi project...");
    /* Membuat seluruh struktur berkas dan folder hasil duplikasi */
    for (const eee of project) {
      const lokasi = path.join("output", dir_out, eee.lokasi);
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
    Print.log("duplikasi project success...");
  } catch (err) {
    /* Menangani kesalahan eksekusi duplikasi */
    throw new Error(err.message);
  }
}
export default duplikasi_project;
