const express = require("express");
const app = express();
const path = require("path");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", routes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log("Server listening at port 5000");
})