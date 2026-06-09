import LLM from "./config.js";
import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import History from "../service/history.js";
import history_p from "../util/lokasi.js";

/* Fungsi utama untuk mengirim pesan ke API Gemini dan mengelola umpan balik */
async function mesinCall(prompt) {
  try {
    /* Melakukan inisialisasi model dan client AI */
    let { model, AI } = LLM();
    let message = prompt;
    /* Mengambil riwayat percakapan sebelumnya dari berkas riwayat */
    const h = History.get(history_p.historyModel, "[]");
    if (h.length !== 0) {
      Print.clear("total history: ", h.length / 2);
      /* Meminta konfirmasi apakah ingin menggunakan riwayat obrolan sebelumnya */
      const isHistory = Masukan.pilih("gunakan history?", ["y", "n"]);
      if (isHistory === "y") {
        /* Mengambil 4 pesan terakhir dari riwayat obrolan */
        model.history = h.slice(-4);
      }
    }
    /* Loop interaktif untuk mengirimkan pesan dan menerima revisi hasil */
    while (true) {
      Print.clear("gawena sedang mengerjakan...");
      /* Mengirimkan pesan prompt ke model Gemini */
      const response = await model.sendMessage({ message });
      const result = response.text;
      /* Membaca hasil JSON terstruktur dari respons AI */
      const { project, delets, laporan } = JSON.parse(result);
      Print.clear("laporan tugas:n", laporan);
      /* Menyimpan riwayat percakapan yang baru ke berkas riwayat */
      History.save(history_p.historyModel, model.history);
      /* Menawarkan revisi hasil apabila output belum sesuai harapan */
      const next = Masukan.pilih("refisi kembali hasil?", ["y", "n"]);
      if (next === "y") {
        const refisi = Masukan.wajib("apa yang ingin direvisi?> ");
        message = `konteknya refisi tugasmu:  ${refisi}`;
        continue;
      }
      /* Menyimpan cadangan output mentah terakhir */
      History.save(history_p.output, JSON.parse(result));
      return { project, delets };
    }
  } catch (err) {
    /* Menangani error selama proses pemanggilan mesin AI */
    throw new Error(`mesinCall: ${err.message}`);
  }
}
export default mesinCall;
