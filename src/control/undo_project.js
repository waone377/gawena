import { Fs, Dir } from "../util/file.js";
import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import path from "path";
import History from "../service/history.js";

import history_p from "../util/lokasi.js";
async function undo_project() {
  // Membungkus proses pemulihan (undo) proyek dengan penanganan error
  try {
    // Mengambil cadangan struktur proyek terakhir dari riwayat JSON
    const { dir, project } = History.get(history_p.projectJson, {
      dir: "",
      project: [],
      delets: [],
      laporan: "",
    });
    // Menghentikan program jika tidak ada data proyek yang dapat dipulihkan
    if (project.length === 0) {
      Print.clear("file", history_p.projectJson, "kosong!!!");
      process.exit(1);
    }
    // Menampilkan lokasi proyek dan meminta konfirmasi pemulihan
    Print.clear("project lokasi:\n", dir);
    const next = Masukan.pilih("lanjut pulihkan?", ["y", "n"]);
    if (next === "n") process.exit(1);
    // Menampilkan pesan indikator pemulihan proyek
    Print.clear("sedang memulihkan project...");
    // Memulihkan setiap berkas dan direktori ke kondisi cadangan
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
    // Menampilkan pesan sukses pemulihan proyek
    Print.log("pemulihan project success...");
  } catch (err) {
    // Melempar error jika proses pemulihan gagal
    throw new Error(err.message);
  }
}
export default undo_project;
