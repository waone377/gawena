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
  try {
    /* Memanggil fungsi pembaca target proyek dari file service */
    const target = targeter();
    /* Memanggil fungsi konversi lokasi absolut dari file service */
    const repo = cwd(target);
    /* Memanggil fungsi pembaca struktur direktori dari file service */
    const markdown = directory(repo);
    /* Memanggil fungsi konfirmasi prompt dari file service */
    const p = promptConfirm();
    let prompt = p.text;
    /* Memeriksa kondisi jika berkas prompt tidak disetujui */
    if (!p.cek) {
      /* Memanggil fungsi masukan wajib dari file utilitas */
      prompt = Masukan.wajib("apa yang ingin dimodifikasi pada project?> ");
    }
    prompt =
      "konteksnya menduplikasi tugasmu: '" +
      prompt.trim() +
      "'\nberikut project yang diduplikasinya silahkan:\n" +
      markdown;
    /* Memanggil fungsi mesin AI dari file mesin untuk menduplikasi proyek */
    const { project, delets } = await mesinCall(prompt);
    /* Memanggil fungsi masukan wajib dari file utilitas untuk nama proyek baru */
    const dir_out = Masukan.wajib("masukan nama project baru?> ");
    /* Memanggil fungsi pembersihan layar dari file utilitas */
    Print.clear("sedang menduplikasi project...");
    /* Melakukan perulangan untuk memproses setiap entitas proyek yang diduplikasi */
    for (const eee of project) {
      const lokasi = path.join("output", dir_out, eee.lokasi);
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
    Print.log("duplikasi project success...");
  } catch (err) {
    throw new Error(err.message);
  }
}
export default duplikasi_project;
