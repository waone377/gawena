import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import fs from "fs";
import path from "path";

class History {
  // ... metode untuk menyimpan data ke file history
  static save(p, value) {
    try {
      const dir_p = path.dirname(p);
      // ... membuat direktori jika belum ada
      fs.mkdirSync(dir_p, { recursive: true });
      // ... menulis data JSON ke file
      fs.writeFileSync(p, JSON.stringify(value, null, 4));
    } catch (err) {
      throw new Error(`save history gagal: ${err.message}`);
    }
  }

  // ... metode untuk membaca data dari file history
  static get(p, value) {
    try {
      try {
        // ... memeriksa apakah file ada
        fs.accessSync(p);
      } catch {
        // ... jika file tidak ada, buat direktori dan tulis file default
        const dir_p = path.dirname(p);
        fs.mkdirSync(dir_p, { recursive: true });
        fs.writeFileSync(p, JSON.stringify(value, null, 4));
      }
      // ... membaca isi file
      const isi = fs.readFileSync(p, "utf-8");
      const parse = JSON?.parse(isi) || null;
      let back = parse;
      // ... jika data yang dibaca memiliki properti 'set', tanyakan pengguna apakah ingin menggunakannya
      if (parse.set) {
        Print.clear("ada riwayat:");
        console.dir(parse);
        const confirm = Masukan.pilih("gunakan itu?", ["y", "n"]);
        if (confirm === "y") {
          back = parse; // ... gunakan riwayat jika dikonfirmasi
        } else {
          parse.set = false; // ... jika tidak, tandai sebagai tidak digunakan
          back = parse;
        }
      }
      return back;
    } catch (err) {
      throw new Error(`baca history gagal: ${err.message}`);
    }
  }
}
export default History;
