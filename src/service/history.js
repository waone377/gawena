import { Fs, Dir } from "../util/file.js";
import path from "path";

class History {
  static save(jalur_file, nilai_data) {
    try {
      const direktori_induk = path.dirname(jalur_file);
      /* Memanggil fungsi pembuatan direktori (IO CRUD) dari file utilitas */
      Dir.buat(direktori_induk);
      /* Memanggil fungsi penulisan berkas (IO CRUD) dari file utilitas */
      Fs.tulis(jalur_file, JSON.stringify(nilai_data, null, 4));
    } catch (error_proses) {
      throw new Error(`save history gagal: ${error_proses.message}`);
    }
  }

  static get(jalur_file, nilai_default) {
    try {
      const direktori_induk = path.dirname(jalur_file);
      /* Memanggil fungsi pembuatan direktori (IO CRUD) dari file utilitas */
      Dir.buat(direktori_induk);
      /* Memanggil fungsi pembaca berkas (IO CRUD) dari file utilitas */
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
