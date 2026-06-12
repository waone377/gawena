import LLM from "./config.js";
import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import History from "../service/history.js";
import history_p from "../util/lokasi.js";

async function mesinCall(prompt) {
  try {
    /* Memanggil fungsi konfigurasi model LLM dari file config */
    let { model, AI } = LLM();
    let message = prompt;
    /* Memanggil fungsi pembaca riwayat dari file service */
    const h = History.get(history_p.historyModel, "[]");
    /* Memeriksa kondisi jika panjang riwayat percakapan tidak kosong */
    if (h.length !== 0) {
      /* Memanggil fungsi pembersihan layar dari file utilitas */
      Print.clear("total history: ", h.length / 2);
      /* Memanggil fungsi pemilihan opsi masukan dari file utilitas */
      const isHistory = Masukan.pilih("gunakan history?", ["y", "n"]);
      /* Memeriksa kondisi jika pengguna memilih untuk menggunakan riwayat */
      if (isHistory === "y") {
        model.history = h.slice(-4);
      }
    }
    /* Melakukan perulangan untuk alur percakapan interaktif dengan model AI */
    while (true) {
      /* Memanggil fungsi pembersihan layar dari file utilitas */
      Print.clear("gawena sedang mengerjakan...");
      /* Memanggil metode sendMessage dari model AI untuk mendapatkan respons */
      const response = await model.sendMessage({ message });
      const result = response.text;
      const { project, delets, laporan } = JSON.parse(result);
      /* Memanggil fungsi pembersihan layar dari file utilitas */
      Print.clear("laporan tugas:n", laporan);
      /* Memanggil fungsi penyimpan riwayat (IO CRUD) dari file service */
      History.save(history_p.historyModel, model.history);
      /* Memanggil fungsi pemilihan opsi masukan dari file utilitas */
      const next = Masukan.pilih("refisi kembali hasil?", ["y", "n"]);
      /* Memeriksa kondisi jika pengguna ingin melakukan revisi */
      if (next === "y") {
        /* Memanggil fungsi masukan wajib dari file utilitas */
        const refisi = Masukan.wajib("apa yang ingin direvisi?> ");
        message = `konteknya refisi tugasmu:  ${refisi}`;
        continue;
      }
      /* Memanggil fungsi penyimpan riwayat (IO CRUD) dari file service untuk keluaran */
      History.save(history_p.output, JSON.parse(result));
      return { project, delets };
    }
  } catch (err) {
    throw new Error(`mesinCall: ${err.message}`);
  }
}
export default mesinCall;
