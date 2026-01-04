import Print from "./util/tampilan.js";
import Masukan from "./util/input.js";
import pembuatan from "./fitur/pembuatan.js";
import perbaikan from "./fitur/perbaikan.js";
import duplikat from "./fitur/duplikat.js";
import penghapusan from "./fitur/penghapusan.js";
import setup from "./config/setup.js";

async function main() {
  try {
    await setup();
    while (true) {
      Print.clear(
        "SELAMAT DATANG!\nsilahkan pilih:\n1. buat projek\n2. perbaiki projek\n3. duplikat project \n4. hapus riwayat\n",
      );
      Print.log("ketik 'exit' untuk stop..");
      const pilih = Masukan.pilih("silakan pilih (1/2/3)?> ", [
        "1",
        "2",
        "3",
        "4",
      ]);
      switch (pilih) {
        case "1":
          await pembuatan();
          break;
        case "2":
          await perbaikan();
          break;
        case "3":
          await duplikat();
          break;
        case "4":
          await penghapusan();
          break;
      }
      const next = Masukan.pilih("lanjutkan program (y/n)?> ", ["y", "n"]);
      if (next === "y") continue;
      Print.log("program telah berhenti...");
      break;
    }
  } catch (err) {
    Print.clear("Oops error di main()\n terjadi error; \n", err.message);
  }
}
main();
