import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import fs from "fs";
import path from "path";
class History {
  static save(p, value) {
    try {
      const dir_p = path.dirname(p);
      fs.mkdirSync(dir_p, { recursive: true });
      fs.writeFileSync(p, JSON.stringify(value, null, 4));
    } catch (err) {
      throw new Error(`save history gagal: ${err.message}`);
    }
  }
  static get(p, value) {
    try {
      try {
        fs.accessSync(p);
      } catch {
        const dir_p = path.dirname(p);
        fs.mkdirSync(dir_p, { recursive: true });
        fs.writeFileSync(p, JSON.stringify(value, null, 4));
      }
      const isi = fs.readFileSync(p, "utf-8");
      const parse = JSON?.parse(isi) || null;
      let back = parse;
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
