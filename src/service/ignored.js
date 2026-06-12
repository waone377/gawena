import History from "./history.js";
import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import history_p from "../util/lokasi.js";
/* mendapatkan riwayat config ignore dan menanyakan*/
function getIgnored(target) {
  try {
    /* membaca dan mendapatkan data config */
    const h = History.get(history_p.ignore, [{ target, ignored: [] }]);
    /* mencari data sesuai target */
    const data = h.find((e) => e.target === target.trim());
    let ignored = [];
    let confirm = "n";
    /* cek data apa ada */
    if (data) {
      Print.clear("ada riwayat config:\n", data.ignored);
      /* menanyakan apa ingin gunakan riwayat*/
      confirm = Masukan.pilih("gunakan itu?", ["y", "n"]);
      ignored = data.ignored;
    }
    return { h, confirm, ignored };
  } catch (err) {
    throw new Error("getIgnored " + err.message);
  }
}
export default getIgnored;
