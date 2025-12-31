import path from "path";
import {
  cekAda,
  buatFolder,
  hapusFolder,
  hapusFile,
  tulisFile,
  data,
} from "../util/files.js";
import Print from "../util/tampilan.js";
import Masukan from "../util/input.js";
async function generateRepo(source, mode) {
  try {
    const { dataTarget } = await data();
    const lokasi = path.join(path.resolve("."), "output");
    let base = "";
    if (mode === "pembuatan") {
      const nameRepo = Masukan.wajib("masukkan nama repository?> ");
      base = path.join(lokasi, nameRepo);
      await buatFolder(base);
    }
    if (mode === "perbaikan") {
      const opsi = Masukan.pilih(
        "pilih penyimpanan:\n1. timpa repository\n2. buat repository\nsilahkan pilih (1/2)?> ",
        ["1", "2"],
      );
      if (opsi === "2") {
        const nameRepo = Masukan.wajib("masukkan nama repository?> ");
        base = path.join(lokasi, nameRepo);
        await buatFolder(base);
      }
      base = dataTarget;
    }
    const dir = base.split("/").pop();
    Print.clear(mode, "\nvolder:", dir, "\npath:", base, "\n===");
    if (source.delets.length > 0 && mode === "perbaikan") {
      for (const e of source.delets) {
        const p = path.normalize(path.join(path.resolve(base), e.lokasi));
        switch (e.jenis) {
          case "folder":
            await hapusFolder(p);
            Print.log("menghapus folder", e.lokasi);
            break;
          case "file":
            await hapusFile(p);
            Print.log("menghapus file", e.lokasi);
            break;
          default:
            Print.log(
              "ada satu source yang tidak valid untuk dihapus!",
              e.lokasi,
            );
            break;
        }
      }
    }
    // di luar kondisi delets
    if (source.repo.length > 0) {
      for (const e of source.repo) {
        const p = path.normalize(path.join(path.resolve(base), e.lokasi));
        switch (e.jenis) {
          case "folder":
            await buatFolder(p);
            Print.log("membuat folder", e.lokasi);
            break;
          case "file":
            await tulisFile(p, e.konten);
            Print.log("membuat file", e.lokasi);
            break;
          case "config":
            await tulisFile(p, e.konten);
            Print.log("membuat file", e.lokasi);
            break;
          case "dok":
            await tulisFile(p, e.konten);
            Print.log("membuat file", e.lokasi);
            break;
          default:
            Print.log(
              "ada satu source yang tidak valid untuk dibuat!",
              e.lokasi,
            );
            break;
        }
      }
    }
    Print.log("sukses", mode, "telah dilakukan..");
    await tulisFile("history/output.json", JSON.stringify(source, null, 4));
  } catch (err) {
    throw new Error(`generateRepo() error: ${err.message}`);
  }
}
export default generateRepo;
