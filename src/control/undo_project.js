import { Fs, Dir } from "../util/file.js";
import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import path from "path";
import History from "../service/history.js";

let history_p = "history/repository.json";
async function undo_project() {
  // ... memulai blok try-catch untuk penanganan error
  try {
    // ... mendapatkan data riwayat pemulihan project
    const { dir, project } = History.get(history_p, {
      dir: "",
      project: [],
      delets: [],
      laporan: "",
    });
    // ... jika tidak ada project dalam history, tampilkan pesan error dan keluar
    if (project.length === 0) {
      Print.clear("file history/directory.json kosong!!!");
      process.exit(1);
    }
    // ... meminta konfirmasi untuk melanjutkan pemulihan
    const next = Masukan.pilih("lanjut pulihkan?", ["y", "n"]);
    if (next === "n") process.exit(1);
    // ... menampilkan pesan bahwa pemulihan sedang berlangsung
    Print.clear("sedang memulihkan project...");
    // ... mengulang untuk memulihkan setiap item project dari history
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
    // ... menampilkan pesan bahwa pemulihan project telah berhasil
    Print.log("pemulihan project success...");
  } catch (err) {
    // ... menangkap dan melempar kembali error jika terjadi masalah
    throw new Error(err.message);
  }
}
export default undo_project;
