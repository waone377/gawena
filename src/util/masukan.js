import promptSync from "prompt-sync";
const prompt = promptSync();

class Masukan {
  // ... metode untuk meminta input wajib dari pengguna
  static wajib(message) {
    let value;
    while (true) {
      const v = prompt(message);
      const t = v.toLowerCase().trim();
      // ... memeriksa apakah input kosong
      if (!t) {
        console.log("silakan masukkan terlebih dahulu!");
        continue;
      } else if (t === "exit") {
        // ... menangani input 'exit'
        console.clear();
        console.log("program berhenti...");
        process.exit(1);
      } else {
        value = t; // ... menyimpan input yang valid
        break;
      }
    }
    console.clear(); // ... membersihkan layar setelah input
    return value;
  }

  // ... metode untuk meminta pengguna memilih dari daftar opsi
  static pilih(message, opsi) {
    let value;
    while (true) {
      const v = prompt(message + "\nsilahkan " + "(" + opsi.join("/") + ")?: ");
      const t = v.toLowerCase().trim();
      // ... memeriksa apakah input ada dalam daftar opsi
      if (t && opsi.includes(t)) {
        value = t; // ... menyimpan pilihan yang valid
        break;
      } else if (t === "exit") {
        // ... menangani input 'exit'
        console.clear();
        console.log("program berhenti...");
        process.exit(1);
      } else {
        console.log(`Pilih antara ${opsi.join("/")} silahkan!`); // ... menampilkan pesan error jika pilihan tidak valid
      }
    }
    console.clear(); // ... membersihkan layar setelah input
    return value;
  }

  // ... metode untuk mendapatkan input biasa dari pengguna (tidak wajib, tidak ada validasi khusus)
  static biasa(message) {
    const v = prompt(message);
    const t = v.toLowerCase().trim();
    if (t === "exit") {
      // ... menangani input 'exit'
      console.clear();
      console.log("program berhenti...");
      process.exit(1);
    }
    console.clear(); // ... membersihkan layar setelah input
    return t;
  }
}
export default Masukan;
