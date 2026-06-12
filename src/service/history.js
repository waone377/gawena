import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import fs from "fs";
import path from "path";

/* Kelas untuk mengelola penyimpanan dan pembacaan riwayat proyek/model */
class History {
  /* Menyimpan data riwayat ke berkas fisik dengan format JSON rapi */
  static save(p, value) {
    try {
      const dir_p = path.dirname(p);
      /* Membuat folder induk rekursif jika belum ada */
      fs.mkdirSync(dir_p, { recursive: true });
      fs.writeFileSync(p, JSON.stringify(value, null, 4));
    } catch (err) {
      throw new Error(`save history gagal: ${err.message}`);
    }
  }

  /* Membaca berkas riwayat dan mengonfirmasi pengguna untuk menggunakannya kembali */
  static get(p, value) {
    try {
      try {
        fs.accessSync(p);
      } catch {
        const dir_p = path.dirname(p);
        /* Membuat folder dan menginisialisasi berkas riwayat jika belum ada */
        fs.mkdirSync(dir_p, { recursive: true });
        fs.writeFileSync(p, JSON.stringify(value, null, 4));
      }
      const isi = fs.readFileSync(p, "utf-8");
      const parse = JSON?.parse(isi) || null;
      return parse;
    } catch (err) {
      throw new Error(`baca history gagal: ${err.message}`);
    }
  }
}
export default History;
