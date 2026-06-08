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
async function perbaiki_project() {
  // Membungkus proses perbaikan proyek dengan penanganan error
  try {
    // Mengambil riwayat target direktori perbaikan sebelumnya
    const h = History.get(history_p.perbaiki, { set: false, target: "" });
    let target = h.target;
    // Minta direktori target dari pengguna jika belum ditentukan di riwayat
    if (!h.set) {
      target = targeter();
    }
    // Menyimpan direktori target terpilih ke file riwayat
    History.save(history_p.perbaiki, { set: true, target });
    // Mendapatkan path absolut dari direktori target
    const repo = cwd(target);
    // Membaca struktur direktori target dan mengubahnya menjadi format markdown
    const markdown = directory(repo);
    // Memproses konfirmasi penggunaan file prompt.txt
    const p = promptConfirm();
    let prompt = p.text;
    // Minta input instruksi perbaikan manual jika prompt.txt tidak digunakan
    if (!p.cek) {
      prompt = Masukan.wajib("apa yang ingin diperbaiki pada project?> ");
    }
    // menulis prompt ke riwayat
    prompt =
      "konteksnya perbaiki tugasmu: '" +
      prompt.trim() +
      "'\nberikut project yang diperbaikinya silahkan:\n" +
      markdown;
    // Memanggil API Gemini untuk melakukan perbaikan proyek
    const { project, delets } = await mesinCall(promptprompt);
    // Menampilkan status progres perbaikan proyek
    Print.clear("sedang memperbaiki project...");
    // Memeriksa dan memproses penghapusan berkas jika diminta oleh AI
    if (delets.length !== 0) {
      // Menghapus file atau folder yang ditandai untuk dihapus
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
    // Menulis atau memperbarui setiap file/folder hasil perbaikan dari AI
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
    // Menampilkan laporan sukses perbaikan proyek
    Print.log("perbaikan project success...");
  } catch (err) {
    // Menangkap dan melempar kembali error
    throw new Error(err.message);
  }
}
export default perbaiki_project;
