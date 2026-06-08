import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import { Fs } from "../util/file.js";

let prompt_p = "prompt.txt";
// Memproses verifikasi dan konfirmasi penggunaan berkas prompt.txt
function promptConfirm() {
  try {
    // Membaca isi teks dari berkas prompt.txt
    const text = Fs.baca(prompt_p, "");
    // Menanyakan pengguna apakah ingin menggunakan file prompt.txt
    const confirm = Masukan.pilih("gunakan prompt.txt?", ["y", "n"]);
    if (confirm === "y") {
      // Validasi isi prompt jika pengguna menyetujui namun berkas kosong
      if (!text) {
        Print.log("prompt.txt masih kosong!!!");
        return { cek: false, text };
      }
      // Menampilkan pratinjau isi teks berkas prompt
      Print.clear("isi prompt:\n", text, "\n-------");
      // Meminta konfirmasi akhir untuk menjalankan prompt
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
