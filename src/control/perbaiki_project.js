import mesinCall from "../mesin/gemini.js";
import directory from "../service/directory.js";
import { Fs, Dir } from "../util/file.js";
import promptConfirm from "../service/prompt.js";
import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import { absolute, cwd } from "../service/lokasi.js";
import History from "../service/history.js";
import targeter from "../service/target.js";

let history_p = "history/perbaiki.json";
async function perbaiki_project() {
  // ... memulai blok try-catch untuk penanganan error
  try {
    // ... mendapatkan riwayat operasi perbaikan sebelumnya
    const h = History.get(history_p, { set: false, target: "" });
    let target = h.target;
    // ... jika tidak ada riwayat yang valid, minta target directory dari pengguna
    if (!h.set) {
      target = targeter();
    }
    // ... mendapatkan path absolut dari target directory
    const repo = cwd(target);
    // ... membaca struktur direktori target dan menyimpannya sebagai markdown
    const markdown = directory(repo);
    // ... menyimpan target directory yang digunakan untuk riwayat
    History.save(history_p, { set: true, target });
    // ... memeriksa apakah prompt.txt valid untuk digunakan
    const p = promptConfirm();
    let prompt = p.text;
    // ... jika prompt.txt tidak valid atau tidak digunakan, minta input prompt secara langsung
    if (!p.cek) {
      prompt = Masukan.wajib("apa yang ingin diperbaiki pada project?> ");
    }
    // ... memanggil API Gemini untuk memperbaiki project
    const { project, delets } = await mesinCall(
      "konteksnya perbaiki tugasmu: " + prompt + markdown,
    );
    // ... menampilkan pesan bahwa project sedang diperbaiki
    Print.clear("sedang memperbaiki project...");
    // ... jika ada item yang dihapus dalam respons AI
    if (delets.length !== 0) {
      // ... mengulang untuk menghapus file/folder yang ditandai untuk dihapus
      for (const eee of delets) {
        const lokasi = absolute(target, eee.lokasi);
        switch (eee.jenis) {
          case "folder":
            Dir.hapus(lokasi);
            Print.log(eee.jenis, " ", lokasi, " success deleted");
            break;
          case "file":
            Fs.hapus(lokasi);
            Print.log(eee.jenis, " ", lokasi, " success deleted");
            break;
          default:
            Print.log(eee.jenis, " ", lokasi, " failed deleted");
            break;
        }
      }
      Print.log("penghapusan selesai...");
    }
    // ... mengulang untuk membuat/memodifikasi file/folder
    for (const eee of project) {
      const lokasi = absolute(target, eee.lokasi);
      switch (eee.jenis) {
        case "folder":
          Dir.buat(lokasi);
          Print.log(eee.jenis, " ", lokasi, " success updated");
          break;
        case "config":
          Fs.tulis(lokasi, eee.konten);
          Print.log(eee.jenis, " ", lokasi, " success updated");
          break;
        case "file":
          Fs.tulis(lokasi, eee.konten);
          Print.log(eee.jenis, " ", lokasi, " success updated");
          break;
        case "dok":
          Fs.tulis(lokasi, eee.konten);
          Print.log(eee.jenis, " ", lokasi, " success updated");
          break;
        default:
          Print.log(eee.jenis, " ", lokasi, " failed updated!");
          break;
      }
    }
    // ... menampilkan pesan bahwa perbaikan project telah berhasil
    Print.log("perbaikan project success...");
  } catch (err) {
    // ... menangkap dan melempar kembali error jika terjadi masalah
    throw new Error(err.message);
  }
}
export default perbaiki_project;
