const express = require("express");
const router = express.Router();
const controller = require("./controller.js");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get("/finduser/:email", controller.findUser);
router.post("/adduser", controller.addUser);
router.post("/updateprofile/:useruid", controller.updateProfile);
router.post("/sell", controller.sell);
router.get("/personallistings/:selleruid", controller.getPersonalListings);
router.post("/upload", upload.single('myFile'), controller.uploadTest);

module.exports = router;