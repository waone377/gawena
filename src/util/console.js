class Console {
  // Membersihkan layar konsol dan menampilkan pesan baru
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

  // Menampilkan pesan di konsol tanpa membersihkan layar sebelumnya
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
