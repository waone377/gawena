import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import { Fs } from "../util/file.js";

let prompt_p = "prompt.txt";

function promptConfirm() {
  try {
    /* Memanggil fungsi pembaca berkas (IO CRUD) dari file utilitas */
    const text = Fs.baca(prompt_p, "");
    /* Memanggil fungsi pemilihan opsi masukan dari file utilitas */
    const confirm = Masukan.pilih("gunakan prompt.txt?", ["y", "n"]);
    /* Memeriksa kondisi jika pengguna setuju menggunakan berkas prompt */
    if (confirm === "y") {
      /* Memeriksa kondisi jika berkas prompt kosong */
      if (!text) {
        /* Memanggil fungsi pencetakan log dari file utilitas */
        Print.log("prompt.txt masih kosong!!!");
        return { cek: false, text };
      }
      /* Memanggil fungsi pembersihan layar dari file utilitas */
      Print.clear("isi prompt:\n", text, "\n-------");
      /* Memanggil fungsi pemilihan opsi masukan dari file utilitas */
      const next = Masukan.pilih("lanjut?", ["y", "n"]);
      /* Memeriksa kondisi jika pengguna setuju melanjutkan */
      if (next === "y") {
        return { cek: true, text };
      } else {
        return { cek: false, text };
      }
    }
    return { cek: false, text };
  } catch (err) {
    throw new Error(`promptConfirm: ${err.message}`);
  }
}
export default promptConfirm;
