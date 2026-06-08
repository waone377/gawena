import LLM from "./config.js";
import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import History from "../service/history.js";

import history_p from "../util/lokasi.js";
async function mesinCall(prompt) {
  // Membungkus panggilan API Gemini dengan penanganan error
  try {
    // Menginisialisasi model LLM
    let { model, AI } = LLM();
    let history = model.history;
    let message = prompt;
    // Mengambil riwayat percakapan model sebelumnya
    const h = History.get(history_p.historyModel, "[]");
    if (h.length !== 0) {
      Print.clear("total history: ", h.length / 2);
      // Meminta konfirmasi apakah pengguna ingin melanjutkan riwayat percakapan
      const isHistory = Masukan.pilih("gunakan history?", ["y", "n"]);
      if (isHistory === "y") {
        model.history = h.slice(-4);
      }
    }
    // Loop interaktif untuk mengirim permintaan dan memproses revisi hasil
    while (true) {
      Print.clear("gawena sedang mengerjakan...");
      // Mengirim pesan prompt ke model Gemini
      const response = await model.sendMessage({ message });
      const result = response.text;
      // Mendekode respons JSON dari AI
      const { project, delets, laporan } = JSON.parse(result);
      Print.clear("laporan tugas:n", laporan);
      // Menyimpan riwayat percakapan terbaru
      History.save(history_p.historyModel, model.history);
      // Meminta masukan apakah pengguna ingin merevisi hasil pengerjaan
      const next = Masukan.pilih("refisi kembali hasil?", ["y", "n"]);
      // Memproses revisi dengan memperbarui pesan prompt berikutnya
      if (next === "y") {
        const refisi = Masukan.wajib("apa yang ingin direvisi?> ");
        message = `konteknya refisi tugasmu:  ${refisi}`;
        continue;
      }
      // Menyimpan hasil akhir ke file output jika tidak ada revisi
      History.save(history_p.output, JSON.parse(result));
      return { project, delets };
    }
  } catch (err) {
    // Melempar error jika terjadi kesalahan komunikasi API
    throw new Error(`mesinCall: ${err.message}`);
  }
}
export default mesinCall;
