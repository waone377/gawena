import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import { Fs } from "../util/file.js";

let prompt_p = "prompt.txt";
// ... fungsi untuk membaca dan mengonfirmasi penggunaan prompt dari file prompt.txt
function promptConfirm() {
  try {
    // ... membaca isi file prompt.txt
    const text = Fs.baca(prompt_p, "");
    // ... menanyakan pengguna apakah ingin menggunakan prompt.txt
    const confirm = Masukan.pilih("gunakan prompt.txt?", ["y", "n"]);
    if (confirm === "y") {
      // ... jika prompt.txt kosong, beri tahu pengguna
      if (!text) {
        Print.log("prompt.txt masih kosong!!!");
        return { cek: false, text };
      }
      // ... tampilkan isi prompt.txt
      Print.clear("isi prompt:\n", text, "\n-------");
      // ... minta konfirmasi lanjutan untuk menggunakan prompt
      const next = Masukan.pilih("lanjut?", ["y", "n"]);
      if (next === "y") {
        return { cek: true, text }; // ... kembalikan true jika digunakan
      } else {
        return { cek: false, text }; // ... kembalikan false jika tidak digunakan
      }
    }
    return { cek: false, text }; // ... kembalikan false jika prompt.txt tidak dipilih
  } catch (err) {
    throw new Error(`promptConfirm: ${err.message}`);
  }
}
export default promptConfirm;
