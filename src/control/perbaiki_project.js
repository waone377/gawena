import mesinCall from "../mesin/gemini.js";
import directory from "../service/directory.js";
import { Fs, Dir } from "../util/file.js";
import promptConfirm from "../service/prompt.js";
import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import { absolute, cwd } from "../service/lokasi.js";
import History from "../service/history.js";
import targeter from "../service/target.js";
let history_p = "history/perbaiki.json";
async function perbaiki_project() {
  try {
    const h = History.get(history_p, { set: false, target: "" });
    let target = h.target;
    if (!h.set) {
      target = targeter();
    }
    const repo = cwd(target);
    const markdown = directory(repo);
    History.save(history_p, { set: true, target });
    const p = promptConfirm();
    let prompt = p.text;
    if (!p.cek) {
      prompt = Masukan.wajib("apa yang ingin diperbaiki pada project?> ");
    }
    const { project, delets } = await mesinCall(
      "konteksnya perbaiki tugasmu: " + prompt + markdown,
    );
    Print.clear("sedang memperbaiki project...");
    if (delets.length !== 0) {
      for (const eee of delets) {
        const lokasi = absolute(target, eee.lokasi);
        switch (eee.jenis) {
          case "folder":
            Dir.hapus(lokasi);
            Print.log(eee.jenis, " ", lokasi, " success deleted");
            break;
          case "file":
            Fs.hapus(lokasi);
            Print.log(eee.jenis, " ", lokasi, " success deleted");
            break;
          default:
            Print.log(eee.jenis, " ", lokasi, " failed deleted");
            break;
        }
      }
      Print.log("penghapusan selesai...");
    }
    for (const eee of project) {
      const lokasi = absolute(target, eee.lokasi);
      switch (eee.jenis) {
        case "folder":
          Dir.buat(lokasi);
          Print.log(eee.jenis, " ", lokasi, " success updated");
          break;
        case "config":
          Fs.tulis(lokasi, eee.konten);
          Print.log(eee.jenis, " ", lokasi, " success updated");
          break;
        case "file":
          Fs.tulis(lokasi, eee.konten);
          Print.log(eee.jenis, " ", lokasi, " success updated");
          break;
        case "dok":
          Fs.tulis(lokasi, eee.konten);
          Print.log(eee.jenis, " ", lokasi, " success updated");
          break;
        default:
          Print.log(eee.jenis, " ", lokasi, " failed updated!");
          break;
      }
    }
    Print.log("perbaikan project success...");
  } catch (err) {
    throw new Error(err.message);
  }
}
export default perbaiki_project;
