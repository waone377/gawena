import fs from "fs";
import path from "path";

class Fs {
  // Menulis konten teks ke sebuah berkas secara sinkron
  static tulis(p, value) {
    try {
      const p_dir = path.dirname(p);
      // Membuat folder induk secara rekursif jika belum ada
      fs.mkdirSync(p_dir, { recursive: true });
      // Menulis data teks ke path target
      fs.writeFileSync(p, value);
    } catch (err) {
      throw new Error(`tulis file gagal: ${err.message}`);
    }
  }

  // Membaca isi berkas teks dan mengembalikannya secara sinkron
  static baca(p, value) {
    try {
      try {
        // Memeriksa aksesibilitas berkas target
        fs.accessSync(p);
      } catch {
        // Membuat direktori baru jika berkas tidak ditemukan saat dibaca
        try {
          const p_dir = path.dirname(p);
          fs.mkdirSync(p_dir);
          fs.writeFileSync(p, value);
        } catch {
          fs.writeFileSync(p, value);
        }
      }
      // Mengembalikan konten string dari berkas
      return fs.readFileSync(p, "utf-8");
    } catch (err) {
      throw new Error(`baca file gagal: ${err.message}`);
    }
  }

  // Menghapus berkas secara sinkron
  static hapus(p) {
    try {
      // Memastikan berkas ada sebelum dihapus
      fs.accessSync(p);
      fs.unlinkSync(p);
    } catch (err) {
      throw new Error(`hapus file gagal: ${err.message}`);
    }
  }
}

// Kelas utilitas untuk manipulasi operasi direktori
class Dir {
  // Membuat direktori folder secara rekursif
  static buat(p) {
    try {
      // Menjalankan perintah pembuatan folder sistem
      fs.mkdirSync(p, { recursive: true });
    } catch (err) {
      throw new Error(`buat folder gagal: ${err.message}`);
    }
  }

  // Menghapus direktori beserta seluruh isinya
  static hapus(p) {
    try {
      // Memastikan folder ada sebelum melakukan penghapusan
      fs.accessSync(p);
      fs.rmSync(p, { recursive: true, force: true });
    } catch (err) {
      throw new Error(`hapus folder gagal: ${err.message}`);
    }
  }
}

export { Fs, Dir };
