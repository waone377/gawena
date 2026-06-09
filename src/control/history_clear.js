import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import History from "../service/history.js";
import history_p from "../util/lokasi.js";

/* Fungsi untuk membersihkan seluruh riwayat obrolan dengan model AI */
function history_clear() {
  try {
    /* Mendapatkan data riwayat model saat ini */
    const h = History.get(history_p.historyModel, "[]");
    /* Memeriksa apakah ada data riwayat yang tersimpan */
    if (h.length !== 0) {
      Print.clear("total history: ", h.length / 2);
      /* Meminta konfirmasi dari pengguna sebelum menghapus */
      const confirm = Masukan.pilih("hapus data history?> ", ["y", "n"]);
      if (confirm === "y") {
        /* Menyimpan array kosong untuk menghapus riwayat */
        History.save(history_p.historyModel, []);
        Print.clear("history success terhapus...");
      }
    } else {
      Print.clear("tidak ada history!!!");
    }
  } catch (err) {
    /* Menangani error pada proses pembersihan riwayat */
    throw new Error(`history_clear: ${err.message}`);
  }
}
export default history_clear;
