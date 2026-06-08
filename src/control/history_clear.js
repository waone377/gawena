import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import History from "../service/history.js";

import history_p from "../util/lokasi.js";
function history_clear() {
  // Membungkus proses pembersihan riwayat dengan penanganan error
  try {
    // Mengambil data riwayat percakapan model
    const h = History.get(history_p.historyModel, "[]");
    // Jika riwayat tidak kosong, tampilkan jumlahnya dan minta konfirmasi
    if (h.length !== 0) {
      Print.clear("total history: ", h.length / 2);
      const confirm = Masukan.pilih("hapus data history?> ", ["y", "n"]);
      // Menghapus data riwayat jika pengguna mengonfirmasi ya
      if (confirm === "y") {
        History.save(history_p.historyModel, []);
        Print.clear("history success terhapus...");
      }
    } else {
      // Menampilkan pesan jika tidak ada riwayat yang tersimpan
      Print.clear("tidak ada history!!!");
    }
  } catch (err) {
    // Melempar error jika terjadi kegagalan pembersihan riwayat
    throw new Error(`history_clear: ${err.message}`);
  }
}
export default history_clear;
