import { Fs, Dir } from "../util/file.js";
import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import path from "path";
import History from "../service/history.js";
let history_p = "history/repository.json";
async function undo_project() {
  try {
    const { dir, project } = History.get(history_p, {
      dir: "",
      project: [],
      delets: [],
      laporan: "",
    });
    if (project.length === 0) {
      Print.clear("file history/directory.json kosong!!!");
      process.exit(1);
    }
    const next = Masukan.pilih("lanjut pulihkan?", ["y", "n"]);
    if (next === "n") process.exit(1);
    Print.clear("sedang memulihkan project...");
    for (const eee of project) {
      const lokasi = path.join(dir, eee.lokasi);
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
    throw new Error(err.message);
  }
}
export default undo_project;
