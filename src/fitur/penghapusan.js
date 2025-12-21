import { data, tulisFile } from "../util/files.js";
import Masukan from "../util/input.js";
import Print from "../util/tampilan.js";

async function penghapusan() {
  try {
    const { dataHistory } = await data();
    if (dataHistory.length > 0) {
      Print.clear("total riwayat -", dataHistory.length / 2);
      const konfirmasi = Masukan.pilih("hapus riwayat sebelumnya (y/n)?> ", [
        "y",
        "n",
      ]);
      if (konfirmasi === "y") {
        await tulisFile("history/riwayat.json", "[]");
        Print.clear("sukses semua riwayat telah dihapus!");
      }
    } else {
      Print.clear("daftar riwayat masih kosong!");
    }
  } catch (err) {
    throw new Error(`penghapusan() error: ${err.message}`);
  }
}

export default penghapusan;
