import { Fs, Dir } from "../util/file.js";
import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import path from "path";
import History from "../service/history.js";
import history_p from "../util/lokasi.js";

async function undo_project() {
  try {
    /* Memanggil fungsi pembaca riwayat proyek dari file service */
    const { dir, project } = History.get(history_p.projectJson, {
      dir: "",
      project: [],
      delets: [],
      laporan: "",
    });
    /* Memeriksa kondisi jika panjang daftar proyek bernilai kosong */
    if (project.length === 0) {
      /* Memanggil fungsi pembersihan layar dari file utilitas */
      Print.clear("file", history_p.projectJson, "kosong!!!");
      process.exit(1);
    }
    /* Memanggil fungsi pembersihan layar dari file utilitas */
    Print.clear("project lokasi:\n", dir);
    /* Memanggil fungsi pemilihan opsi masukan dari file utilitas */
    const next = Masukan.pilih("lanjut pulihkan?", ["y", "n"]);
    /* Memeriksa kondisi jika pengguna membatalkan pemulihan */
    if (next === "n") process.exit(1);
    /* Memanggil fungsi pembersihan layar dari file utilitas */
    Print.clear("sedang memulihkan project...");
    /* Melakukan perulangan untuk memulihkan setiap entitas proyek */
    for (const eee of project) {
      const lokasi = path.join(dir, eee.lokasi);
      /* Memeriksa kondisi berdasarkan jenis entitas proyek */
      switch (eee.jenis) {
        case "folder":
          /* Memanggil fungsi pembuatan direktori (IO CRUD) dari file utilitas */
          Dir.buat(lokasi);
          /* Memanggil fungsi pencetakan log dari file utilitas */
          Print.log(eee.jenis, " ", lokasi, " success dipulihkan");
          break;
        case "config":
          /* Memanggil fungsi penulisan berkas (IO CRUD) dari file utilitas */
          Fs.tulis(lokasi, eee.konten);
          /* Memanggil fungsi pencetakan log dari file utilitas */
          Print.log(eee.jenis, " ", lokasi, " success dipulihkan");
          break;
        case "file":
          /* Memanggil fungsi penulisan berkas (IO CRUD) dari file utilitas */
          Fs.tulis(lokasi, eee.konten);
          /* Memanggil fungsi pencetakan log dari file utilitas */
          Print.log(eee.jenis, " ", lokasi, " success dipulihkan");
          break;
        case "dok":
          /* Memanggil fungsi penulisan berkas (IO CRUD) dari file utilitas */
          Fs.tulis(lokasi, eee.konten);
          /* Memanggil fungsi pencetakan log dari file utilitas */
          Print.log(eee.jenis, " ", lokasi, " success dipulihkan");
          break;
        default:
          /* Memanggil fungsi pencetakan log dari file utilitas */
          Print.log(eee.jenis, " ", lokasi, " failed dipulihkan!");
          break;
      }
    }
    /* Memanggil fungsi pencetakan log dari file utilitas */
    Print.log("pemulihan project success...");
  } catch (err) {
    throw new Error(err.message);
  }
}
export default undo_project;
