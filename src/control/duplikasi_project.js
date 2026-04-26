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

let history_p = "history/duplikasi.json";
async function duplikasi_project() {
  // ... memulai blok try-catch untuk penanganan error
  try {
    // ... mendapatkan riwayat operasi duplikasi sebelumnya
    const h = History.get(history_p, { set: false, target: "" });
    let target = h.target;
    // ... jika tidak ada riwayat yang valid, minta target directory dari pengguna
    if (!h.set) {
      target = targeter();
    }
    // ... mendapatkan path absolut dari target directory
    const repo = cwd(target);
    // ... membaca struktur direktori target dan menyimpannya sebagai markdown
    const markdown = directory(repo);
    // ... menyimpan target directory yang digunakan untuk riwayat
    History.save(history_p, { set: true, target });
    // ... memeriksa apakah prompt.txt valid untuk digunakan
    const p = promptConfirm();
    let prompt = p.text;
    // ... jika prompt.txt tidak valid atau tidak digunakan, minta input prompt secara langsung
    if (!p.cek) {
      prompt = Masukan.wajib("apa yang ingin dimodifikasi pada project?> ");
    }
    // ... memanggil API Gemini untuk duplikasi dan modifikasi project
    const { project, delets } = await mesinCall(
      "konteksnya duplikat serta modifikasi tugasmu: " + prompt + markdown,
    );
    // ... meminta nama direktori output untuk project baru
    const dir_out = Masukan.wajib("masukan nama project baru?> ");
    // ... menampilkan pesan bahwa project sedang diduplikasi
    Print.clear("sedang menduplikasi project...");
    // ... mengulang untuk setiap item dalam respons 'project' dari AI
    for (const eee of project) {
      const lokasi = path.join("output", dir_out, eee.lokasi);
      // ... menentukan jenis entitas (folder, config, file, dok) dan membuat/menulisnya
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
    // ... menampilkan pesan bahwa duplikasi project telah berhasil
    Print.log("duplikasi project success...");
  } catch (err) {
    // ... menangkap dan melempar kembali error jika terjadi masalah
    throw new Error(err.message);
  }
}
export default duplikasi_project;
