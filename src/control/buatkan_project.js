import mesinCall from "../mesin/gemini.js";
import { Fs, Dir } from "../util/file.js";
import promptConfirm from "../service/prompt.js";
import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import path from "path";

/* Fungsi utama untuk membuat proyek baru menggunakan kecerdasan buatan */
async function buatkan_project() {
  try {
    /* Mengonfirmasi penggunaan template prompt yang sudah ada */
    const p = promptConfirm();
    let prompt = p.text;
    /* Jika tidak menggunakan prompt.txt, meminta input langsung dari pengguna */
    if (!p.cek) {
      prompt = Masukan.wajib("project seperti apa?> ");
    }
    /* Memanggil mesin kecerdasan buatan Gemini untuk memproses pembuatan proyek */
    const { project } = await mesinCall(
      "konteksnya membuat tugasmu: " + prompt,
    );
    /* Menentukan direktori keluaran proyek baru */
    const dir = Masukan.wajib("masukan nama project hasil?> output/");
    Print.clear("sedang membuat project...");
    /* Melakukan iterasi untuk setiap item proyek yang dihasilkan */
    for (const eee of project) {
      const lokasi = path.join("output", dir, eee.lokasi);
      /* Memproses pembuatan berdasarkan jenis item (folder, file, config, dok) */
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
    Print.log("pembuatan project success...");
  } catch (err) {
    /* Menangani error dan meneruskannya ke tingkat atas */
    throw new Error(err.message);
  }
}
export default buatkan_project;
