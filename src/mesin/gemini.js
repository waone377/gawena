import LLM from "./config.js";
import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import History from "../service/history.js";

let history_p = "history/output.json";
async function mesinCall(prompt) {
  // ... memulai blok try-catch untuk penanganan error
  try {
    // ... menginisialisasi model LLM
    let { model, AI } = LLM();
    let history = model.history;
    let message = prompt;
    // ... memeriksa riwayat percakapan sebelumnya dari file history umum
    const h = History.get("history/history.json", "[]");
    if (h.length !== 0) {
      Print.clear("total history: ", h.length / 2);
      // ... menanyakan pengguna apakah ingin menggunakan riwayat percakapan
      const isHistory = Masukan.pilih("gunakan history?", ["y", "n"]);
      if (isHistory === "y") {
        model.history = h; // ... menggunakan riwayat jika dipilih
      }
    }
    // ... loop untuk mengirim pesan dan menerima respons (memungkinkan revisi)
    while (true) {
      Print.clear("gawena sedang mengerjakan...");
      // ... mengirim pesan ke model AI
      const response = await model.sendMessage({ message });
      const result = response.text;
      // ... mem-parsing respons JSON dari AI
      const { project, delets, laporan } = JSON.parse(result);
      Print.clear("laporan tugas:n", laporan);
      // ... menyimpan riwayat percakapan saat ini
      History.save("history/history.json", model.history);
      // ... menanyakan pengguna apakah ingin merevisi hasil
      const next = Masukan.pilih("refisi kembali hasil?", ["y", "n"]);
      // ... jika ingin merevisi, minta input revisi dan lanjutkan loop
      if (next === "y") {
        const refisi = Masukan.wajib("apa yang ingin direvisi?> ");
        message = `konteknya refisi tugasmu:  ${refisi}`;
        continue;
      }
      // ... jika tidak ingin merevisi, simpan hasil akhir dan kembalikan
      History.save(history_p, JSON.parse(result));
      return { project, delets };
    }
  } catch (err) {
    // ... menangkap dan melempar kembali error jika terjadi masalah
    throw new Error(`mesinCall: ${err.message}`);
  }
}
export default mesinCall;
