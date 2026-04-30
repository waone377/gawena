import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import History from "../service/history.js";

import history_p from "../util/lokasi.js";
function history_clear() {
  // ... memulai blok try-catch untuk penanganan error
  try {
    // ... mendapatkan data history
    const h = History.get(history_p.historyModel, "[]");
    // ... jika ada history, tampilkan jumlahnya dan minta konfirmasi penghapusan
    if (h.length !== 0) {
      Print.clear("total history: ", h.length / 2);
      const confirm = Masukan.pilih("hapus data history?> ", ["y", "n"]);
      // ... jika konfirmasi 'y', hapus history
      if (confirm === "y") {
        History.save(history_p.historyModel, []);
        Print.clear("history success terhapus...");
      }
    } else {
      // ... jika tidak ada history, tampilkan pesan
      Print.clear("tidak ada history!!!");
    }
  } catch (err) {
    // ... menangkap dan melempar kembali error jika terjadi masalah
    throw new Error(`history_clear: ${err.message}`);
  }
}
export default history_clear;
