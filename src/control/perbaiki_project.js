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
  try {
    /* Memanggil fungsi pembaca target proyek dari file service */
    const target = targeter();
    /* Memanggil fungsi konversi lokasi absolut dari file service */
    const repo = cwd(target);
    /* Memanggil fungsi pembaca struktur direktori dari file service */
    const markdown = directory(repo);
    /* Memanggil fungsi konfirmasi prompt dari file service */
    const p = promptConfirm();
    let prompt = p.text;
    /* Memeriksa kondisi jika berkas prompt tidak disetujui */
    if (!p.cek) {
      /* Memanggil fungsi masukan wajib dari file utilitas */
      prompt = Masukan.wajib("apa yang ingin diperbaiki pada project?> ");
    }
    prompt =
      "konteksnya memperbaiki tugasmu: '" +
      prompt.trim() +
      "'\nberikut project yang diperbaikinya silahkan:\n" +
      markdown;
    /* Memanggil fungsi mesin AI dari file mesin untuk memproses perbaikan */
    const { project, delets } = await mesinCall(prompt);
    /* Memanggil fungsi pembersihan layar dari file utilitas */
    Print.clear("sedang memperbaiki project...");
    /* Memeriksa kondisi jika ada berkas yang perlu dihapus */
    if (delets.length !== 0) {
      /* Melakukan perulangan untuk setiap berkas yang akan dihapus */
      for (const eee of delets) {
        /* Memanggil fungsi penghasil lokasi absolut dari file service */
        const lokasi = absolute(target, eee.lokasi);
        /* Memeriksa kondisi berdasarkan jenis entitas yang akan dihapus */
        switch (eee.jenis) {
          case "folder":
            /* Memanggil fungsi penghapusan direktori (IO CRUD) dari file utilitas */
            Dir.hapus(lokasi);
            /* Memanggil fungsi pencetakan log dari file utilitas */
            Print.log(eee.jenis, " ", lokasi, " success deleted");
            break;
          case "file":
            /* Memanggil fungsi penghapusan berkas (IO CRUD) dari file utilitas */
            Fs.hapus(lokasi);
            /* Memanggil fungsi pencetakan log dari file utilitas */
            Print.log(eee.jenis, " ", lokasi, " success deleted");
            break;
          default:
            /* Memanggil fungsi pencetakan log dari file utilitas */
            Print.log(eee.jenis, " ", lokasi, " failed deleted");
            break;
        }
      }
      /* Memanggil fungsi pencetakan log dari file utilitas */
      Print.log("penghapusan selesai...");
    }
    /* Melakukan perulangan untuk memproses penulisan ulang setiap entitas proyek */
    for (const eee of project) {
      /* Memanggil fungsi penghasil lokasi absolut dari file service */
      const lokasi = absolute(target, eee.lokasi);
      /* Memeriksa kondisi berdasarkan jenis entitas proyek */
      switch (eee.jenis) {
        case "folder":
          /* Memanggil fungsi pembuatan direktori (IO CRUD) dari file utilitas */
          Dir.buat(lokasi);
          /* Memanggil fungsi pencetakan log dari file utilitas */
          Print.log(eee.jenis, " ", lokasi, " success updated");
          break;
        case "config":
          /* Memanggil fungsi penulisan berkas (IO CRUD) dari file utilitas */
          Fs.tulis(lokasi, eee.konten);
          /* Memanggil fungsi pencetakan log dari file utilitas */
          Print.log(eee.jenis, " ", lokasi, " success updated");
          break;
        case "file":
          /* Memanggil fungsi penulisan berkas (IO CRUD) dari file utilitas */
          Fs.tulis(lokasi, eee.konten);
          /* Memanggil fungsi pencetakan log dari file utilitas */
          Print.log(eee.jenis, " ", lokasi, " success updated");
          break;
        case "dok":
          /* Memanggil fungsi penulisan berkas (IO CRUD) dari file utilitas */
          Fs.tulis(lokasi, eee.konten);
          /* Memanggil fungsi pencetakan log dari file utilitas */
          Print.log(eee.jenis, " ", lokasi, " success updated");
          break;
        default:
          /* Memanggil fungsi pencetakan log dari file utilitas */
          Print.log(eee.jenis, " ", lokasi, " failed updated!");
          break;
      }
    }
    /* Memanggil fungsi pencetakan log dari file utilitas */
    Print.log("perbaikan project success...");
  } catch (err) {
    throw new Error(err.message);
  }
}
export default perbaiki_project;
