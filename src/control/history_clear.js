import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import History from "../service/history.js";
let history_p = "history/history.json";
function history_clear() {
  try {
    const h = History.get(history_p, "[]");
    if (h.length !== 0) {
      Print.clear("total history: ", h.length / 2);
      const confirm = Masukan.pilih("hapus data history?> ", ["y", "n"]);
      if (confirm === "y") {
        History.save(history_p, []);
        Print.clear("history success terhapus...");
      }
    } else {
      Print.clear("tidak ada history!!!");
    }
  } catch (err) {
    throw new Error(`history_clear: ${err.message}`);
  }
}
export default history_clear;
