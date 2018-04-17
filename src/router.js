"use strict";

const express = require("express");
const UserController = require("./controller/userController");

const router = express.Router();
const cookieDomain = process.env["NODE_ENV"] === "development" ? "localhost" : "mountainpier.ru";

const userController = new UserController({domain: cookieDomain});

router.get("/users", userController.getUsers.bind(userController));

module.exports = router;