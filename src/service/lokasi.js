import path from "path";
function absolute(audit_dir, p) {
  try {
    const home = path.join(process.env.HOME, audit_dir);
    const finaly = path.join(home, p);
    return finaly;
  } catch (err) {
    throw new Error(`absolute: ${err.message}`);
  }
}
function cwd(p, t) {
  try {
    if (t === 0) {
      const resolve = path.resolve(p);
      const clear = resolve.replace("/emulated/0", "");
      const finaly = path.join(process.env.HOME, clear);
      return finaly;
    }
    return path.join(process.env.HOME, p);
  } catch (err) {
    throw new Error(`cwd: ${err.message}`);
  }
}
function potong(monitor_dir, p) {
  try {
    const monitor_array = monitor_dir.split("/");
    const dir = monitor_array.pop();
    const p_array = p.split("/");
    const finaly = p_array.slice(p_array.indexOf(dir) + 1);
    return finaly.join("/");
  } catch (err) {
    throw new Error(`potong: ${err.message}`);
  }
}
export { absolute, cwd, potong };
