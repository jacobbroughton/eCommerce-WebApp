const express = require("express");
const app = express();
const path = require("path");

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log("Server listening at port 3000");
})