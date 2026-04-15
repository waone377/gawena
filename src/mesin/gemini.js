import LLM from "./config.js";
import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import History from "../service/history.js";
let history_p = "history/output.json";
async function mesinCall(prompt) {
  try {
    let { model, AI } = LLM();
    let history = model.history;
    let message = prompt;
    const h = History.get("history/history.json", "[]");
    if (h.length !== 0) {
      Print.clear("total history: ", h.length / 2);
      const isHistory = Masukan.pilih("gunakan history?", ["y", "n"]);
      if (isHistory === "y") {
        model.history = h;
      }
    }
    while (true) {
      Print.clear("gawena sedang mengerjakan...");
      const response = await model.sendMessage({ message });
      const result = response.text;
      const { project, delets, laporan } = JSON.parse(result);
      Print.clear("laporan tugas:n", laporan);
      History.save("history/history.json", model.history);
      const next = Masukan.pilih("refisi kembali hasil?", ["y", "n"]);
      if (next === "y") {
        const refisi = Masukan.wajib("apa yang ingin direvisi?> ");
        message = `konteknya refisi tugasmu:  ${refisi}`;
        continue;
      }
      History.save(history_p, JSON.parse(result));
      return { project, delets };
    }
  } catch (err) {
    throw new Error(`mesinCall: ${err.message}`);
  }
}
export default mesinCall;
