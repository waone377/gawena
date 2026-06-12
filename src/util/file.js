import fs from "fs";
import path from "path";

class Fs {
  static tulis(p, value) {
    try {
      const p_dir = path.dirname(p);
      /* Memanggil fungsi pembuatan direktori sinkron (IO CRUD) dari pustaka bawaan */
      fs.mkdirSync(p_dir, { recursive: true });
      /* Memanggil fungsi penulisan berkas sinkron (IO CRUD) dari pustaka bawaan */
      fs.writeFileSync(p, value);
    } catch (err) {
      throw new Error(`tulis file gagal: ${err.message}`);
    }
  }

  static baca(p, value) {
    try {
      try {
        /* Memanggil fungsi akses berkas sinkron (IO CRUD) dari pustaka bawaan */
        fs.accessSync(p);
      } catch {
        try {
          const p_dir = path.dirname(p);
          /* Memanggil fungsi pembuatan direktori sinkron (IO CRUD) dari pustaka bawaan */
          fs.mkdirSync(p_dir);
          /* Memanggil fungsi penulisan berkas sinkron (IO CRUD) dari pustaka bawaan */
          fs.writeFileSync(p, value);
        } catch {
          /* Memanggil fungsi penulisan berkas sinkron (IO CRUD) dari pustaka bawaan */
          fs.writeFileSync(p, value);
        }
      }
      /* Memanggil fungsi pembacaan berkas sinkron (IO CRUD) dari pustaka bawaan */
      return fs.readFileSync(p, "utf-8");
    } catch (err) {
      throw new Error(`baca file gagal: ${err.message}`);
    }
  }

  static hapus(p) {
    try {
      /* Memanggil fungsi akses berkas sinkron (IO CRUD) dari pustaka bawaan */
      fs.accessSync(p);
      /* Memanggil fungsi penghapusan berkas sinkron (IO CRUD) dari pustaka bawaan */
      fs.unlinkSync(p);
    } catch (err) {
      throw new Error(`hapus file gagal: ${err.message}`);
    }
  }
}

class Dir {
  static buat(p) {
    try {
      /* Memanggil fungsi pembuatan direktori sinkron (IO CRUD) dari pustaka bawaan */
      fs.mkdirSync(p, { recursive: true });
    } catch (err) {
      throw new Error(`buat folder gagal: ${err.message}`);
    }
  }

  static hapus(p) {
    try {
      /* Memanggil fungsi akses berkas sinkron (IO CRUD) dari pustaka bawaan */
      fs.accessSync(p);
      /* Memanggil fungsi penghapusan direktori rekursif (IO CRUD) dari pustaka bawaan */
      fs.rmSync(p, { recursive: true, force: true });
    } catch (err) {
      throw new Error(`hapus folder gagal: ${err.message}`);
    }
  }
}

export { Fs, Dir };
