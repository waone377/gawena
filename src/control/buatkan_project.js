import mesinCall from "../mesin/gemini.js";
import { Fs, Dir } from "../util/file.js";
import promptConfirm from "../service/prompt.js";
import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import path from "path";

async function buatkan_project() {
  try {
    /* Memanggil fungsi konfirmasi prompt dari file service */
    const p = promptConfirm();
    let prompt = p.text;
    /* Memeriksa kondisi jika berkas prompt tidak disetujui */
    if (!p.cek) {
      /* Memanggil fungsi masukan wajib dari file utilitas */
      prompt = Masukan.wajib("project seperti apa?> ");
    }
    /* Memanggil fungsi mesin AI dari file mesin untuk memproses pembuatan proyek */
    const { project } = await mesinCall(
      "konteksnya membuat tugasmu: " + prompt,
    );
    /* Memanggil fungsi masukan wajib dari file utilitas untuk nama proyek */
    const dir = Masukan.wajib("masukan nama project hasil?> output/");
    /* Memanggil fungsi pembersihan layar dari file utilitas */
    Print.clear("sedang membuat project...");
    /* Melakukan perulangan untuk memproses setiap entitas proyek yang dihasilkan */
    for (const eee of project) {
      const lokasi = path.join("output", dir, eee.lokasi);
      /* Memeriksa kondisi berdasarkan jenis entitas proyek */
      switch (eee.jenis) {
        case "folder":
          /* Memanggil fungsi pembuatan direktori (IO CRUD) dari file utilitas */
          Dir.buat(lokasi);
          /* Memanggil fungsi pencetakan log dari file utilitas */
          Print.log(eee.jenis, " ", lokasi, " success created");
          break;
        case "config":
          /* Memanggil fungsi penulisan berkas (IO CRUD) dari file utilitas */
          Fs.tulis(lokasi, eee.konten);
          /* Memanggil fungsi pencetakan log dari file utilitas */
          Print.log(eee.jenis, " ", lokasi, " success created");
          break;
        case "file":
          /* Memanggil fungsi penulisan berkas (IO CRUD) dari file utilitas */
          Fs.tulis(lokasi, eee.konten);
          /* Memanggil fungsi pencetakan log dari file utilitas */
          Print.log(eee.jenis, " ", lokasi, " success created");
          break;
        case "dok":
          /* Memanggil fungsi penulisan berkas (IO CRUD) dari file utilitas */
          Fs.tulis(lokasi, eee.konten);
          /* Memanggil fungsi pencetakan log dari file utilitas */
          Print.log(eee.jenis, " ", lokasi, " success created");
          break;
        default:
          /* Memanggil fungsi pencetakan log dari file utilitas */
          Print.log(eee.jenis, " ", lokasi, " failed created!");
          break;
      }
    }
    /* Memanggil fungsi pencetakan log dari file utilitas */
    Print.log("pembuatan project success...");
  } catch (err) {
    throw new Error(err.message);
  }
}
export default buatkan_project;
