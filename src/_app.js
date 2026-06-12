import buatkan_project from "./control/buatkan_project.js";
import perbaiki_project from "./control/perbaiki_project.js";
import duplikasi_project from "./control/duplikasi_project.js";
import undo_project from "./control/undo_project.js";
import history_clear from "./control/history_clear.js";
import Print from "./util/console.js";
import Masukan from "./util/masukan.js";

/* Memanggil fungsi pembersihan layar dari file utilitas */
Print.clear("pilih service:");
/* Memanggil fungsi pencetakan log dari file utilitas */
Print.log("1. buatkan project");
/* Memanggil fungsi pencetakan log dari file utilitas */
Print.log("2. perbaiki project");
/* Memanggil fungsi pencetakan log dari file utilitas */
Print.log("3. duplikasi project");
/* Memanggil fungsi pencetakan log dari file utilitas */
Print.log("4. undo project");
/* Memanggil fungsi pencetakan log dari file utilitas */
Print.log("5. clear history");

/* Memanggil fungsi pemilihan masukan dari file utilitas */
const opsi = Masukan.pilih("service?", ["1", "2", "3", "4", "5"]);

/* Memeriksa kondisi pilihan layanan yang dipilih oleh pengguna */
switch (opsi) {
  case "1":
    /* Memanggil fungsi kontrol untuk membuat proyek baru */
    buatkan_project();
    break;
  case "2":
    /* Memanggil fungsi kontrol untuk memperbaiki proyek */
    perbaiki_project();
    break;
  case "3":
    /* Memanggil fungsi kontrol untuk menduplikasi proyek */
    duplikasi_project();
    break;
  case "4":
    /* Memanggil fungsi kontrol untuk membatalkan perubahan proyek */
    undo_project();
    break;
  case "5":
    /* Memanggil fungsi kontrol untuk membersihkan riwayat */
    history_clear();
    break;
}
