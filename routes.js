const express = require("express");
const router = express.Router();
const controller = require("./controller.js");

router.get("/finduser/:email", controller.findUser);
router.post("/adduser", controller.addUser);
router.post("/updateprofile/:useruid", controller.updateProfile);
router.post("/sell", controller.sell);
router.get("/personallistings/:selleruid", controller.getPersonalListings);

module.exports = router;