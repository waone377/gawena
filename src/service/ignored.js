import History from "./history.js";
import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import history_p from "../util/lokasi.js";

function getIgnored(target) {
  try {
    /* Memanggil fungsi pembaca riwayat dari file service */
    const h = History.get(history_p.ignore, [{ target, ignored: [] }]);
    /* Memanggil metode find untuk mencocokkan target di dalam daftar */
    const data = h.find((e) => e.target === target.trim());
    let ignored = [];
    let confirm = "n";
    /* Memeriksa kondisi jika data pengecualian tidak kosong */
    if (data.ignored.length !== 0) {
      /* Memanggil fungsi pembersihan layar dari file utilitas */
      Print.clear("ada riwayat config ignore:\n", data.ignored);
      /* Memanggil fungsi pemilihan opsi masukan dari file utilitas */
      confirm = Masukan.pilih("gunakan itu?", ["y", "n"]);
      ignored = data.ignored;
    }
    return { h, confirm, ignored };
  } catch (err) {
    throw new Error("getIgnored " + err.message);
  }
}
export default getIgnored;
