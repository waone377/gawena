import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import { cwd } from "../service/lokasi.js";
import fs from "fs";

// ... fungsi untuk mendapatkan direktori target dari pengguna
function targeter() {
  try {
    let lokasi;
    // ... loop sampai mendapatkan lokasi direktori yang valid
    while (true) {
      lokasi = Masukan.wajib("lokasi directory target dari?> home/");
      // ... mencoba mengakses direktori target, sesuaikan path jika perlu
      try {
        fs.accessSync(cwd(lokasi).replace("/music", "/Music"));
        break; // ... keluar dari loop jika direktori ditemukan
      } catch {
        // ... jika direktori tidak ditemukan, tampilkan pesan error dan ulangi
        Print.clear(cwd(lokasi), " tidak ditemukan!!!");
        continue;
      }
    }
    return lokasi; // ... kembalikan lokasi direktori yang valid
  } catch (err) {
    throw new Error(`targeter: ${err.message}`);
  }
}
export default targeter;
