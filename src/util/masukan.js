import promptSync from "prompt-sync";
/* Menginisialisasi modul input sinkronus untuk terminal */
const prompt = promptSync();

/* Kelas pembantu untuk menangani interaksi masukan pengguna melalui CLI */
class Masukan {
  /* Meminta masukan teks wajib dari pengguna yang tidak boleh kosong */
  static wajib(message) {
    let value;
    while (true) {
      const v = prompt(message);
      const t = v.toLowerCase().trim();
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

  /* Meminta masukan pilihan dari daftar opsi yang telah ditentukan sebelumnya */
  static pilih(message, opsi) {
    let value;
    while (true) {
      const v = prompt(message + "\nsilahkan " + "(" + opsi.join("/") + ")?: ");
      const t = v.toLowerCase().trim();
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

  /* Meminta masukan opsional dari pengguna secara bebas */
  static biasa(message) {
    const v = prompt(message);
    const t = v.toLowerCase().trim();
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
