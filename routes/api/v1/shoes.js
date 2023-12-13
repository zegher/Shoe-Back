//require express
const express = require("express");
//require the router
const router = express.Router();
//require the shoes controller
const shoesController = require("../../../controllers/api/v1/shoes");

router.post("/", shoesController.createShoe);
router.get("/", shoesController.getAllShoes);

module.exports = router;