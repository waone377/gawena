import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import { cwd } from "../service/lokasi.js";
import fs from "fs";

// Meminta masukan lokasi direktori target yang valid dari pengguna
function targeter() {
  try {
    let lokasi;
    // Loop interaktif hingga pengguna memasukkan direktori yang valid
    while (true) {
      lokasi = Masukan.wajib("lokasi directory target dari?> home/");
      // Memverifikasi keberadaan direktori target secara sinkron
      try {
        fs.accessSync(cwd(lokasi).replace("/music", "/Music"));
        break;
      } catch {
        // Menampilkan pesan kesalahan jika direktori tidak valid
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
