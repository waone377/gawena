import fs from "fs";
import path from "path";

class Fs {
  static tulis(p, value) {
    try {
      const p_dir = path.dirname(p);
      fs.mkdirSync(p_dir, { recursive: true });
      fs.writeFileSync(p, value);
    } catch (err) {
      throw new Error(`tulis file gagal: ${err.message}`);
    }
  }

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

  static hapus(p) {
    try {
      fs.accessSync(p);
      fs.unlinkSync(p);
    } catch (err) {
      throw new Error(`hapus file gagal: ${err.message}`);
    }
  }
}

// bagian class folder
class Dir {
  static buat(p) {
    try {
      fs.mkdirSync(p, { recursive: true });
    } catch (err) {
      throw new Error(`buat folder gagal: ${err.message}`);
    }
  }

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
