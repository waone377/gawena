import fs from "fs";
import path from "path";

class Fs {
  // ... metode untuk menulis konten ke sebuah file
  static tulis(p, value) {
    try {
      const p_dir = path.dirname(p);
      // ... membuat direktori induk jika belum ada
      fs.mkdirSync(p_dir, { recursive: true });
      // ... menulis konten ke file
      fs.writeFileSync(p, value);
    } catch (err) {
      throw new Error(`tulis file gagal: ${err.message}`);
    }
  }

  // ... metode untuk membaca konten dari sebuah file
  static baca(p, value) {
    try {
      try {
        // ... memeriksa apakah file ada
        fs.accessSync(p);
      } catch {
        // ... jika file tidak ada, buat direktori dan tulis file dengan nilai default
        try {
          const p_dir = path.dirname(p);
          fs.mkdirSync(p_dir);
          fs.writeFileSync(p, value);
        } catch {
          fs.writeFileSync(p, value); // ... jika pembuatan direktori gagal, coba tulis langsung
        }
      }
      // ... membaca dan mengembalikan isi file
      return fs.readFileSync(p, "utf-8");
    } catch (err) {
      throw new Error(`baca file gagal: ${err.message}`);
    }
  }

  // ... metode untuk menghapus sebuah file
  static hapus(p) {
    try {
      // ... memeriksa apakah file ada sebelum menghapus
      fs.accessSync(p);
      fs.unlinkSync(p);
    } catch (err) {
      throw new Error(`hapus file gagal: ${err.message}`);
    }
  }
}

// ... bagian class folder untuk operasi direktori
class Dir {
  // ... metode untuk membuat sebuah direktori
  static buat(p) {
    try {
      // ... membuat direktori secara rekursif
      fs.mkdirSync(p, { recursive: true });
    } catch (err) {
      throw new Error(`buat folder gagal: ${err.message}`);
    }
  }

  // ... metode untuk menghapus sebuah direktori (termasuk isinya)
  static hapus(p) {
    try {
      // ... memeriksa apakah direktori ada sebelum menghapus
      fs.accessSync(p);
      fs.rmSync(p, { recursive: true, force: true }); // ... force: true untuk menghapus tanpa prompt
    } catch (err) {
      throw new Error(`hapus folder gagal: ${err.message}`);
    }
  }
}

export { Fs, Dir };
