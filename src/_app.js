import buatkan_project from "./control/buatkan_project.js";
import perbaiki_project from "./control/perbaiki_project.js";
import duplikasi_project from "./control/duplikasi_project.js";
import undo_project from "./control/undo_project.js";
import history_clear from "./control/history_clear.js";
import Print from "./util/console.js";
import Masukan from "./util/masukan.js";
Print.clear("pilih service:");
Print.log("1. buatkan project");
Print.log("2. perbaiki project");
Print.log("3. duplikasi project");
Print.log("4. undo project");
Print.log("5. clear history");
const opsi = Masukan.pilih("service?", ["1", "2", "3", "4", "5"]);
switch (opsi) {
  case "1":
    buatkan_project();
    break;
  case "2":
    perbaiki_project();
    break;
  case "3":
    duplikasi_project();
    break;
  case "4":
    undo_project();
    break;
  case "5":
    history_clear();
    break;
}
