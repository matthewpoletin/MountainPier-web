"use strict";

const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const router = require("./src/router");

const PORT = process.env["NODE_PORT"] ||/* parseInt(process.argv[2], 10) ||*/ 8080;
const app = express();

app.set("views", path.join(__dirname, "src", "template"));
app.set("view engine", "ejs");
app.set("view options", {
	rmWhitespace: true,
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(router);

app.listen(PORT, () => {
	console.log("DeveloperApp listen on port " + PORT);
});