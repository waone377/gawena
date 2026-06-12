import promptSync from "prompt-sync";

/* Memanggil fungsi inisialisasi prompt-sync dari pustaka eksternal */
const prompt = promptSync();

class Masukan {
  static wajib(message) {
    let value;
    /* Melakukan perulangan untuk meminta input wajib dari pengguna */
    while (true) {
      /* Memanggil fungsi prompt untuk membaca masukan pengguna */
      const v = prompt(message);
      const t = v.toLowerCase().trim();
      /* Memeriksa kondisi jika masukan kosong */
      if (!t) {
        console.log("silakan masukkan terlebih dahulu!");
        continue;
      } else if (t === "exit") {
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

  static pilih(message, opsi) {
    let value;
    /* Melakukan perulangan untuk meminta pilihan masukan dari daftar opsi */
    while (true) {
      /* Memanggil fungsi prompt untuk membaca masukan pilihan pengguna */
      const v = prompt(message + "\nsilahkan " + "(" + opsi.join("/") + ")?: ");
      const t = v.toLowerCase().trim();
      /* Memeriksa kondisi jika masukan valid sesuai opsi yang tersedia */
      if (t && opsi.includes(t)) {
        value = t;
        break;
      } else if (t === "exit") {
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

  static biasa(message) {
    /* Memanggil fungsi prompt untuk membaca masukan opsional dari pengguna */
    const v = prompt(message);
    const t = v.toLowerCase().trim();
    /* Memeriksa kondisi jika pengguna memasukkan kata kunci keluar */
    if (t === "exit") {
      console.clear();
      console.log("program berhenti...");
      process.exit(1);
    }
    console.clear();
    return t;
  }
}
export default Masukan;
