//require express
const express = require("express");
//require the router
const router = express.Router();
//require the shoes controller
const userController = require("../../../controllers/api/v1/users");

router.get("/", userController.getAllUsers);
router.post("/", userController.postUser);
router.put("/:id", userController.putUserPasswordById);
router.get("/:id", userController.getUserById); // Changed from router.put() to router.get()
router.post("/login", userController.login);

module.exports = router;