import configGenAi from "./configurasi.js";
import { tulisFile, data } from "../util/files.js";
import Masukan from "../util/input.js";
import Print from "../util/tampilan.js";
const panduanPath = "src/dok/dokumentasi.txt";
const panduanName = "sumber panduan";

async function genAi(prompt) {
  let pakeHistory = "y";
  let isHistory = false;
  let pakePanduan = "n";
  let msg = [{ text: "" }];
  let history = [];
  let tambahan = true;
  let result = null;

  try {
    const { AI, model } = await configGenAi(isHistory);

    const { dataHistory } = await data();
    while (true) {
      if (tambahan) {
        msg[0].text = prompt;
        if (dataHistory.length > 0) {
          Print.clear("item history -", dataHistory.length / 2);
          pakeHistory = Masukan.pilih("gunakan history sebelumnya (y/n)?> ", [
            "y",
            "n",
          ]);
          if (pakeHistory === "y") isHistory = true;
        }
        pakePanduan = Masukan.pilih("gunakan file panduan (y/n)?> ", [
          "y",
          "n",
        ]);
        if (pakePanduan === "y") {
          Print.clear("mencerna panduan...");
          const eee = await AI.files.upload({
            file: panduanPath,
            displayName: panduanName,
          });
          msg.push({
            fileData: {
              mimeType: eee.mimeType,
              fileUri: eee.uri,
            },
          });
        }
      }

      Print.clear("memproses permintaan silakan tunggu...");
      const respons = await model.sendMessage({ message: msg });
      result = JSON.parse(respons.text);
      const resData = JSON.stringify(result, null, 2);
      Print.clear("Laporan:\n***\n", result.text, "\n***");
      history.push({
        role: "user",
        parts: msg,
      });
      history.push({
        role: "model",
        parts: [{ text: resData }],
      });
      const isKoreksi = Masukan.pilih("koreksi kembali hasil (y/n)?> ", [
        "y",
        "n",
      ]);
      if (isKoreksi === "n") {
        break;
      } else {
        const q = Masukan.wajib("apa yang ingin di betulkan?> ");
        msg[0].text = `outputnya masih kurang ${q} silakan revisi kembali`;
        isHistory = true;
        tambahan = false;
      }
    }

    const out = [...dataHistory, ...history];
    await tulisFile("history/riwayat.json", JSON.stringify(out, null, 4));
    return result || null;
  } catch (err) {
    throw new Error(`genAi() error: ${err.message}`);
  }
}

export default genAi;
