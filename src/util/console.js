class Console {
  static clear(...message) {
    console.clear();
    let msg;
    /* Memeriksa kondisi jika ada argumen pesan yang diberikan */
    if (message.length > 0) {
      msg = message.join(" ");
    } else {
      msg = message[0];
    }
    console.log(msg);
  }

  static log(...message) {
    let msg;
    /* Memeriksa kondisi jika ada argumen pesan yang diberikan */
    if (message.length > 0) {
      msg = message.join("");
    } else {
      msg = message[0];
    }
    console.log(msg, "\n");
  }
}
export default Console;
