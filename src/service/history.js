import { Fs, Dir } from "../util/file.js";
import path from "path";

// Kelas untuk mengelola penyimpanan dan pembacaan riwayat proyek/model
class History {
  // Menyimpan data riwayat ke berkas fisik dengan format JSON rapi
  static save(jalur_file, nilai_data) {
    try {
      const direktori_induk = path.dirname(jalur_file);
      // Membuat folder induk rekursif jika belum ada menggunakan class Dir
      Dir.buat(direktori_induk);
      // Menulis data ke file menggunakan class Fs
      Fs.tulis(jalur_file, JSON.stringify(nilai_data, null, 4));
    } catch (error_proses) {
      throw new Error(`save history gagal: ${error_proses.message}`);
    }
  }

  // Membaca berkas riwayat dan mengonfirmasi pengguna untuk menggunakannya kembali
  static get(jalur_file, nilai_default) {
    try {
      const direktori_induk = path.dirname(jalur_file);
      // Memastikan folder induk ada terlebih dahulu menggunakan class Dir
      Dir.buat(direktori_induk);
      // Membaca atau menginisialisasi file jika belum ada menggunakan class Fs
      const isi_konten = Fs.baca(
        jalur_file,
        JSON.stringify(nilai_default, null, 4),
      );
      const data_parse = JSON.parse(isi_konten);
      return data_parse;
    } catch (error_proses) {
      throw new Error(`baca history gagal: ${error_proses.message}`);
    }
  }
}

export default History;
