import { Fs, Dir } from "../util/file.js";
import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import path from "path";
import History from "../service/history.js";
import history_p from "../util/lokasi.js";

/* Fungsi utama untuk memulihkan perubahan proyek ke kondisi cadangan sebelumnya */
async function undo_project() {
  try {
    /* Mendapatkan data proyek cadangan terakhir dari riwayat */
    const { dir, project } = History.get(history_p.projectJson, {
      dir: "",
      project: [],
      delets: [],
      laporan: "",
    });
    /* Validasi jika tidak ada data proyek yang dapat dipulihkan */
    if (project.length === 0) {
      Print.clear("file", history_p.projectJson, "kosong!!!");
      process.exit(1);
    }
    Print.clear("project lokasi:\n", dir);
    /* Menanyakan konfirmasi pemulihan kepada pengguna */
    const next = Masukan.pilih("lanjut pulihkan?", ["y", "n"]);
    if (next === "n") process.exit(1);
    Print.clear("sedang memulihkan project...");
    /* Menulis kembali setiap folder dan file ke direktori asalnya */
    for (const eee of project) {
      const lokasi = path.join(dir, eee.lokasi);
      switch (eee.jenis) {
        case "folder":
          Dir.buat(lokasi);
          Print.log(eee.jenis, " ", lokasi, " success dipulihkan");
          break;
        case "config":
          Fs.tulis(lokasi, eee.konten);
          Print.log(eee.jenis, " ", lokasi, " success dipulihkan");
          break;
        case "file":
          Fs.tulis(lokasi, eee.konten);
          Print.log(eee.jenis, " ", lokasi, " success dipulihkan");
          break;
        case "dok":
          Fs.tulis(lokasi, eee.konten);
          Print.log(eee.jenis, " ", lokasi, " success dipulihkan");
          break;
        default:
          Print.log(eee.jenis, " ", lokasi, " failed dipulihkan!");
          break;
      }
    }
    Print.log("pemulihan project success...");
  } catch (err) {
    /* Menangani error pada alur pemulihan proyek */
    throw new Error(err.message);
  }
}
export default undo_project;
