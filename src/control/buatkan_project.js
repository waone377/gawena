import mesinCall from "../mesin/gemini.js";
import { Fs, Dir } from "../util/file.js";
import promptConfirm from "../service/prompt.js";
import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import path from "path";

async function buatkan_project() {
  // ... memulai blok try-catch untuk penanganan error
  try {
    // ... memeriksa apakah prompt.txt valid untuk digunakan
    const p = promptConfirm();
    let prompt = p.text;
    // ... jika prompt.txt tidak valid atau tidak digunakan, minta input prompt secara langsung
    if (!p.cek) {
      prompt = Masukan.wajib("project seperti apa?> ");
    }
    // ... memanggil API Gemini untuk membuat struktur project berdasarkan prompt
    const { project } = await mesinCall(
      "konteksnya buat dari awal tugasmu: " + prompt,
    );
    // ... meminta nama direktori output untuk project baru
    const dir = Masukan.wajib("masukan nama project hasil?> output/");
    // ... menampilkan pesan bahwa project sedang dibuat
    Print.clear("sedang membuat project...");
    // ... mengulang untuk setiap item dalam respons 'project' dari AI
    for (const eee of project) {
      const lokasi = path.join("output", dir, eee.lokasi);
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
    // ... menampilkan pesan bahwa pembuatan project telah berhasil
    Print.log("pembuatan project success...");
  } catch (err) {
    // ... menangkap dan melempar kembali error jika terjadi masalah
    throw new Error(err.message);
  }
}
export default buatkan_project;
