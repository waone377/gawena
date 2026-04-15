import mesinCall from "../mesin/gemini.js";
import { Fs, Dir } from "../util/file.js";
import promptConfirm from "../service/prompt.js";
import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import path from "path";
async function buatkan_project() {
  try {
    const p = promptConfirm();
    let prompt = p.text;
    if (!p.cek) {
      prompt = Masukan.wajib("project seperti apa?> ");
    }
    const { project } = await mesinCall(
      "konteksnya buat dari awal tugasmu: " + prompt,
    );
    const dir = Masukan.wajib("masukan nama project hasil?> output/");
    Print.clear("sedang membuat project...");
    for (const eee of project) {
      const lokasi = path.join("output", dir, eee.lokasi);
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
export default buatkan_project;
