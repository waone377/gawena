class Print {
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
  static log(...message) {
    let msg;
    if (message.length > 0) {
      msg = message.join(" ");
    } else {
      msg = message[0];
    }
    console.log(msg);
  }
}
export default Print;
