import promptSync from "prompt-sync";
const prompt = promptSync();

class Masukan {
  // Meminta input wajib dari pengguna di konsol (tidak boleh kosong)
  static wajib(message) {
    let value;
    while (true) {
      const v = prompt(message);
      const t = v.toLowerCase().trim();
      // Validasi agar pengguna tidak mengirimkan input kosong
      if (!t) {
        console.log("silakan masukkan terlebih dahulu!");
        continue;
      } else if (t === "exit") {
        // Menangani perintah keluar dari program jika mengetik 'exit'
        console.clear();
        console.log("program berhenti...");
        process.exit(1);
      } else {
        value = t;
        break;
      }
    }
    console.clear();
    return value;
  }

  // Meminta pengguna memilih opsi dari daftar pilihan yang diberikan
  static pilih(message, opsi) {
    let value;
    while (true) {
      const v = prompt(message + "\nsilahkan " + "(" + opsi.join("/") + ")?: ");
      const t = v.toLowerCase().trim();
      // Memastikan input pengguna sesuai dengan opsi yang tersedia
      if (t && opsi.includes(t)) {
        value = t;
        break;
      } else if (t === "exit") {
        // Menangani penutupan paksa jika pengguna memilih exit
        console.clear();
        console.log("program berhenti...");
        process.exit(1);
      } else {
        console.log(`Pilih antara ${opsi.join("/")} silahkan!`);
      }
    }
    console.clear();
    return value;
  }

  // Meminta masukan opsional dari pengguna tanpa validasi ketat
  static biasa(message) {
    const v = prompt(message);
    const t = v.toLowerCase().trim();
    if (t === "exit") {
      // Keluar dari program secara aman jika pengguna menginput exit
      console.clear();
      console.log("program berhenti...");
      process.exit(1);
    }
    console.clear();
    return t;
  }
}
export default Masukan;
