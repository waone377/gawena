import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import History from "../service/history.js";
import history_p from "../util/lokasi.js";

function history_clear() {
  try {
    /* Memanggil fungsi pembaca riwayat dari file service */
    const h = History.get(history_p.historyModel, "[]");
    /* Memeriksa kondisi jika riwayat tidak kosong */
    if (h.length !== 0) {
      /* Memanggil fungsi pembersihan layar dari file utilitas */
      Print.clear("total history: ", h.length / 2);
      /* Memanggil fungsi pemilihan opsi masukan dari file utilitas */
      const confirm = Masukan.pilih("hapus data history?> ", ["y", "n"]);
      /* Memeriksa kondisi jika pengguna setuju untuk menghapus */
      if (confirm === "y") {
        /* Memanggil fungsi penyimpan riwayat (IO CRUD) dari file service */
        History.save(history_p.historyModel, []);
        /* Memanggil fungsi pembersihan layar dari file utilitas */
        Print.clear("history success terhapus...");
      }
    } else {
      /* Memanggil fungsi pembersihan layar dari file utilitas */
      Print.clear("tidak ada history!!!");
    }
  } catch (err) {
    throw new Error(`history_clear: ${err.message}`);
  }
}
export default history_clear;
