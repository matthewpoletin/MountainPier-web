"use strict";

const express = require("express");

const IndexController = require("./controller/indexController");
const UserController = require("./controller/userController");
const ErrorController = require("./controller/errorController");

const router = express.Router({caseSensitive: false});

// TODO: fix controllers based on their requirements
// Guest & user roles
router.get("/", IndexController.getIndex.bind(IndexController));
router.get("/join", UserController.getUsers.bind(UserController));
router.get("/signup", UserController.getUsers.bind(UserController));
router.get("/settings", UserController.getUsers.bind(UserController));
router.get("/about", IndexController.getIndex.bind(IndexController));
router.get("/users/:username", UserController.getUsers.bind(UserController));
router.get("/users/:username/friends", UserController.getUsers.bind(UserController));
router.get("/game", UserController.getUsers.bind(UserController));
router.get("/game/:name", UserController.getUsers.bind(UserController));

// Admin role only
router.get("/admin/users", UserController.getUsers.bind(UserController));

// Developer role only
// router.get("/developer/games", DeveloperController.getGames.bind(DeveloperController));

router.get("*", ErrorController.get404.bind(ErrorController));

module.exports = router;
