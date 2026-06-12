import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import { cwd } from "../service/lokasi.js";
import fs from "fs";
import History from "./history.js";
import history_p from "../util/lokasi.js";

function targeter() {
  try {
    /* Memanggil fungsi pembaca riwayat dari file service */
    const h = History.get(history_p.target, { target: "" });
    const data = h?.target || "";
    let lokasi;
    let confirm = "n";
    /* Memeriksa kondisi jika data riwayat target tidak kosong */
    if (data !== "") {
      /* Memanggil fungsi pembersihan layar dari file utilitas */
      Print.clear("ada riwayat target:\n", data);
      /* Memanggil fungsi pemilihan opsi masukan dari file utilitas */
      confirm = Masukan.pilih("gunakan itu?", ["y", "n"]);
    }
    /* Memeriksa kondisi jika pengguna memilih menggunakan riwayat */
    if (confirm === "y") {
      lokasi = data;
    } else {
      /* Melakukan perulangan untuk memvalidasi keberadaan direktori target */
      while (true) {
        /* Memanggil fungsi masukan wajib dari file utilitas */
        lokasi = Masukan.wajib("lokasi directory target dari?> home/");
        try {
          /* Memanggil fungsi akses sinkron (IO CRUD) dari pustaka filesystem bawaan */
          fs.accessSync(cwd(lokasi).replace("/music", "/Music"));
          break;
        } catch {
          /* Memanggil fungsi pembersihan layar dari file utilitas */
          Print.clear(cwd(lokasi), " tidak ditemukan!!!");
          continue;
        }
      }
    }
    /* Memanggil fungsi penyimpan riwayat (IO CRUD) dari file service */
    History.save(history_p.target, { target: lokasi });
    return lokasi;
  } catch (err) {
    throw new Error(`targeter: ${err.message}`);
  }
}
export default targeter;
