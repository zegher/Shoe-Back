//require express
const express = require("express");
//require the router
const router = express.Router();
//require the shoes controller
const shoesController = require("../../../controllers/api/v1/shoes");

router.post("/", shoesController.createShoe);
router.get("/", shoesController.getAllShoes);
router.get("/:id", shoesController.getShoeById);
router.delete("/:id", shoesController.deleteShoeById);
router.put("/:id", shoesController.putShoeById);

router.put('/:id', shoesController.updateStatus);

module.exports = router;