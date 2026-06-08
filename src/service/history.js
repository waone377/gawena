import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import fs from "fs";
import path from "path";

class History {
  // Menyimpan data objek ke dalam berkas riwayat berformat JSON
  static save(p, value) {
    try {
      const dir_p = path.dirname(p);
      // Memastikan direktori folder induk file riwayat sudah dibuat
      fs.mkdirSync(dir_p, { recursive: true });
      // Menulis data JSON ke dalam file dengan format berindentasi
      fs.writeFileSync(p, JSON.stringify(value, null, 4));
    } catch (err) {
      throw new Error(`save history gagal: ${err.message}`);
    }
  }

  // Membaca data dari file riwayat JSON atau menginisialisasinya dengan nilai default
  static get(p, value) {
    try {
      try {
        // Memeriksa keberadaan file riwayat target
        fs.accessSync(p);
      } catch {
        // Membuat file default jika file riwayat belum tersedia
        const dir_p = path.dirname(p);
        fs.mkdirSync(dir_p, { recursive: true });
        fs.writeFileSync(p, JSON.stringify(value, null, 4));
      }
      // Membaca isi berkas riwayat secara sinkron
      const isi = fs.readFileSync(p, "utf-8");
      const parse = JSON?.parse(isi) || null;
      let back = parse;
      // Menawarkan penggunaan riwayat lama jika flag 'set' bernilai true
      if (parse.set) {
        Print.clear("ada riwayat:");
        console.dir(parse);
        const confirm = Masukan.pilih("gunakan itu?", ["y", "n"]);
        if (confirm === "y") {
          back = parse;
        } else {
          parse.set = false;
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
