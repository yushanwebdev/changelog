// blocking
const fs = require("fs/promises");
const path = require("path");

async function read() {
  const result = fs.readFile(path.join(__dirname, "package.json"), "utf-8");

  return result;
}

read().then((file) => console.log("result", file));
console.log("hi");
