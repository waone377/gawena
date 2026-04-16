import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import { cwd } from "../service/lokasi.js";
import fs from "fs";
function targeter() {
  try {
    let lokasi;
    while (true) {
      lokasi = Masukan.wajib("lokasi directory target dari?> home/");
      try {
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
