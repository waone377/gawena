import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import { Fs } from "../util/file.js";
let prompt_p = "prompt.txt";
function promptConfirm() {
  try {
    const text = Fs.baca(prompt_p, "");
    const confirm = Masukan.pilih("gunakan prompt.txt?", ["y", "n"]);
    if (confirm === "y") {
      if (!text) {
        Print.log("prompt.txt masih kosong!!!");
        return { cek: false, text };
      }
      Print.clear("isi prompt:\n", text, "\n-------");
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
