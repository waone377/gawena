import mesinCall from "../mesin/gemini.js";
import { Fs, Dir } from "../util/file.js";
import promptConfirm from "../service/prompt.js";
import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import path from "path";

async function buatkan_project() {
  // Membungkus proses pembuatan proyek dengan try-catch untuk penanganan error
  try {
    // Memeriksa dan mengonfirmasi penggunaan file prompt.txt
    const p = promptConfirm();
    let prompt = p.text;
    // Jika prompt.txt tidak digunakan, minta input manual dari pengguna
    if (!p.cek) {
      prompt = Masukan.wajib("project seperti apa?> ");
    }
    // Memanggil API Gemini untuk menghasilkan struktur proyek baru
    const { project } = await mesinCall(
      "konteksnya buat dari awal tugasmu: " + prompt,
    );
    // Meminta input nama direktori hasil output proyek
    const dir = Masukan.wajib("masukan nama project hasil?> output/");
    // Menampilkan status progres pembuatan berkas
    Print.clear("sedang membuat project...");
    // Iterasi untuk memproses setiap entitas proyek yang dikembalikan oleh AI
    for (const eee of project) {
      const lokasi = path.join("output", dir, eee.lokasi);
      // Membuat folder atau menulis file sesuai dengan jenis entitasnya
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
    // Menampilkan pesan sukses setelah seluruh berkas berhasil dibuat
    Print.log("pembuatan project success...");
  } catch (err) {
    // Melempar error ke tingkat yang lebih tinggi jika terjadi kegagalan
    throw new Error(err.message);
  }
}
export default buatkan_project;
