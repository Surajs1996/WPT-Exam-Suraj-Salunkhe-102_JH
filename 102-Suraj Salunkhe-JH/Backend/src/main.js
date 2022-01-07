const express = require("express");

const app = express();

app.use(express.json());

let cors = require("cors");
app.use(cors());

const { Message, ShowMessage } = require("./user.js");

app.get("/msg", async (req, res) => {
  let msg = await ShowMessage();
  res.json(msg);
});

app.post("/addmsg", async (req, res) => {
  const msg = req.body;
  await Message(msg);
  res.json({ message: "record Added" });
});

app.listen(3000, () => {
  console.log("Connection Successfull ");
});
