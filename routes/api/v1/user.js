//require express
const express = require("express");
//require the router
const router = express.Router();
//require the shoes controller
const userController = require("../../../controllers/api/v1/users");

router.get("/", userController.getAllUsers);

module.exports = router;