import express from 'express'
import router from './router';

const app = express();

app.get("/", (req, res) => {
  console.log("hello from Express");
  res.status(200);
  res.json({
    message: "Hello",
  });
});

app.use(router)

export default app
