const express = require("express");
const router = express.Router();
const controller = require("./controller.js");

router.get("/finduser/:email", controller.findUser);
router.post("/adduser", controller.addUser);

module.exports = router;