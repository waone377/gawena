import path from "path";
import { cekAda, tulisFile, buatFolder } from "../util/files.js";
const folder = "history";
const dataSetup = {
  "target.json": "{}",
  "riwayat.json": "[]",
  "output.json": "{}",
};
async function setup() {
  try {
    try {
      await cekAda(folder);
    } catch {
      await buatFolder(folder);
    }
    for (const [name, value] of Object.entries(dataSetup)) {
      const p = path.join(folder, name);
      try {
        await cekAda(p);
      } catch {
        await tulisFile(p, value);
      }
    }
  } catch (err) {
    throw new Error(`setup() error: ${err.message}`);
  }
}
export default setup;
