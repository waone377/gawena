import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import { Fs } from "../util/file.js";

/* Menentukan path berkas prompt teks default */
let prompt_p = "prompt.txt";

/* Fungsi konfirmasi ketersediaan instruksi dari berkas prompt.txt */
function promptConfirm() {
  try {
    /* Membaca isi berkas prompt */
    const text = Fs.baca(prompt_p, "");
    const confirm = Masukan.pilih("gunakan prompt.txt?", ["y", "n"]);
    if (confirm === "y") {
      /* Memeriksa jika isi berkas kosong */
      if (!text) {
        Print.log("prompt.txt masih kosong!!!");
        return { cek: false, text };
      }
      Print.clear("isi prompt:\n", text, "\n-------");
      /* Menanyakan persetujuan eksekusi dengan isi prompt yang dibaca */
      const next = Masukan.pilih("lanjut?", ["y", "n"]);
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
