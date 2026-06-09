import fs from "fs";
import path from "path";

/* Kelas utilitas untuk manipulasi operasi berkas (I/O) */
class Fs {
  /* Menulis string atau konten langsung ke berkas fisik dan membuat direktori secara rekursif jika belum ada */
  static tulis(p, value) {
    try {
      const p_dir = path.dirname(p);
      fs.mkdirSync(p_dir, { recursive: true });
      fs.writeFileSync(p, value);
    } catch (err) {
      throw new Error(`tulis file gagal: ${err.message}`);
    }
  }

  /* Membaca isi teks berkas fisik, jika berkas tidak ada maka akan otomatis dibuat baru terlebih dahulu */
  static baca(p, value) {
    try {
      try {
        fs.accessSync(p);
      } catch {
        try {
          const p_dir = path.dirname(p);
          fs.mkdirSync(p_dir);
          fs.writeFileSync(p, value);
        } catch {
          fs.writeFileSync(p, value);
        }
      }
      return fs.readFileSync(p, "utf-8");
    } catch (err) {
      throw new Error(`baca file gagal: ${err.message}`);
    }
  }

  /* Menghapus berkas fisik yang ditentukan dari media penyimpanan */
  static hapus(p) {
    try {
      fs.accessSync(p);
      fs.unlinkSync(p);
    } catch (err) {
      throw new Error(`hapus file gagal: ${err.message}`);
    }
  }
}

/* Kelas utilitas untuk manajemen struktur folder/direktori */
class Dir {
  /* Membuat folder direktori baru beserta folder induknya secara rekursif */
  static buat(p) {
    try {
      fs.mkdirSync(p, { recursive: true });
    } catch (err) {
      throw new Error(`buat folder gagal: ${err.message}`);
    }
  }

  /* Menghapus folder beserta seluruh berkas dan sub-folder di dalamnya secara rekursif */
  static hapus(p) {
    try {
      fs.accessSync(p);
      fs.rmSync(p, { recursive: true, force: true });
    } catch (err) {
      throw new Error(`hapus folder gagal: ${err.message}`);
    }
  }
}

export { Fs, Dir };
