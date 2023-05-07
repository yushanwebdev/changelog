setTimeout(() => {
  throw new Error("Something went wrong");
}, 300);

process.on("uncaughtException", (err) => {
  console.log("Caught exception: ", err);
});
