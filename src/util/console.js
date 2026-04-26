class Console {
  // ... metode untuk membersihkan layar konsol dan menampilkan pesan
  static clear(...message) {
    console.clear(); // ... membersihkan layar
    let msg;
    if (message.length > 0) {
      msg = message.join(" "); // ... menggabungkan pesan jika ada lebih dari satu argumen
    } else {
      msg = message[0];
    }
    console.log(msg); // ... menampilkan pesan
  }

  // ... metode untuk menampilkan pesan di konsol tanpa membersihkan layar
  static log(...message) {
    let msg;
    if (message.length > 0) {
      msg = message.join(""); // ... menggabungkan pesan tanpa spasi jika tidak ada spasi di argumen
    } else {
      msg = message[0];
    }
    console.log(msg); // ... menampilkan pesan
  }
}
export default Console;
