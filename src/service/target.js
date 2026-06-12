import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import { cwd } from "../service/lokasi.js";
import fs from "fs";

import History from "./history.js";
import history_p from "../util/lokasi.js";
/* Fungsi untuk mendapatkan serta melakukan validasi keberadaan direktori proyek target */
function targeter() {
  try {
    const h = History.get(history_p.target, { target: "" });
    const data = h?.target || "";
    let lokasi;
    let confirm = "n";
    /* mengecek ada atau tidak riwayat target*/
    if (data !== "") {
      Print.clear("ada riwayat target:\n", data);
      confirm = Masukan.pilih("gunakan itu?", ["y", "n"]);
    }
    if (confirm === "y") {
      lokasi = data;
    } else {
      /* Melakukan looping hingga pengguna memasukkan path direktori yang benar-benar ada */
      while (true) {
        lokasi = Masukan.wajib("lokasi directory target dari?> home/");
        try {
          /* Memeriksa akses direktori target fisik */
          fs.accessSync(cwd(lokasi).replace("/music", "/Music"));
          break;
        } catch {
          Print.clear(cwd(lokasi), " tidak ditemukan!!!");
          continue;
        }
      }
    }
    /* menyimpan riwayat target */
    History.save(history_p.target, { target: lokasi });
    return lokasi;
  } catch (err) {
    throw new Error(`targeter: ${err.message}`);
  }
}
export default targeter;
