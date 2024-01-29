const express = require("express");
const cors = require("cors");
const http = require("http");

const app = express();
app.use(cors());

let counter = 0;

const headers = {
  "Content-Type": "text/event-stream",
  Connection: "keep-alive",
  "Cache-Control": "no-cache",
  "Access-Control-Allow-Origin": "http://localhost:3002",
  "Access-Control-Allow-Credentials": "true",
};

const hostname = "127.0.0.1";
const port = 8000;

app.get("/subscribe", (req, res) => {
  console.log("request received");
  res.writeHead(200, headers);

  setInterval(async () => {
    // send notification
    res.write("event: notification\n");
    res.write(
      `data: ${JSON.stringify({
        text: counter,
        date: new Date().toDateString(),
      })}\n\n`
    );
    // send message
    res.write("event: message\n");
    res.write(
      `data: ${JSON.stringify({
        message: "Hello, world!",
      })}\n\n`
    );
    counter++;
  }, 2000);
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
