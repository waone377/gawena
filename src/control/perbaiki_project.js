import mesinCall from "../mesin/gemini.js";
import directory from "../service/directory.js";
import { Fs, Dir } from "../util/file.js";
import promptConfirm from "../service/prompt.js";
import Print from "../util/console.js";
import Masukan from "../util/masukan.js";
import { absolute, cwd } from "../service/lokasi.js";
import History from "../service/history.js";
import targeter from "../service/target.js";
import history_p from "../util/lokasi.js";

/* Fungsi utama untuk memperbaiki bug atau memodifikasi kode pada proyek yang ada */
async function perbaiki_project() {
  try {
    /* Memeriksa riwayat target proyek yang pernah diperbaiki sebelumnya */
    const target = targeter();
    /* Mendapatkan path absolut dari proyek target */
    const repo = cwd(target);
    /* Membaca direktori target ke format teks markdown */
    const markdown = directory(repo);
    /* Membaca konfirmasi prompt dari berkas eksternal */
    const p = promptConfirm();
    let prompt = p.text;
    /* Meminta input manual jika tidak menggunakan berkas prompt */
    if (!p.cek) {
      prompt = Masukan.wajib("apa yang ingin diperbaiki pada project?> ");
    }
    /* Memformat instruksi perbaikan untuk mesin AI */
    prompt =
      "konteksnya memperbaiki tugasmu: '" +
      prompt.trim() +
      "'\nberikut project yang diperbaikinya silahkan:\n" +
      markdown;
    /* Menjalankan pemanggilan AI untuk mendapatkan file yang diubah/dihapus */
    const { project, delets } = await mesinCall(prompt);
    Print.clear("sedang memperbaiki project...");
    /* Menghapus file atau folder yang terdaftar di dalam array delets */
    if (delets.length !== 0) {
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
    /* Memperbarui atau menulis ulang berkas-berkas proyek baru */
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
    Print.log("perbaikan project success...");
  } catch (err) {
    /* Menangani kegagalan proses perbaikan proyek */
    throw new Error(err.message);
  }
}
export default perbaiki_project;
