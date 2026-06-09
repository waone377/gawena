/* Kelas utilitas bantu pembantu untuk pencetakan teks pada konsol/terminal */
class Console {
  /* Membersihkan tampilan layar terminal lalu mencetak pesan barunya */
  static clear(...message) {
    console.clear();
    let msg;
    if (message.length > 0) {
      msg = message.join(" ");
    } else {
      msg = message[0];
    }
    console.log(msg);
  }

  /* Mencetak pesan log biasa ke terminal diikuti dengan baris baru */
  static log(...message) {
    let msg;
    if (message.length > 0) {
      msg = message.join("");
    } else {
      msg = message[0];
    }
    console.log(msg, "\n");
  }
}
export default Console;
