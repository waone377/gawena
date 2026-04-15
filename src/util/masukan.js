import promptSync from "prompt-sync";
const prompt = promptSync();
class Masukan {
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
