import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import { cwd } from "../service/lokasi.js";
import fs from "fs";

/* Fungsi untuk mendapatkan serta melakukan validasi keberadaan direktori proyek target */
function targeter() {
  try {
    let lokasi;
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
    return lokasi;
  } catch (err) {
    throw new Error(`targeter: ${err.message}`);
  }
}
export default targeter;
