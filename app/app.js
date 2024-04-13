"use strict";

//모듈
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const morgan = require("morgan");

const app = express();

const accessLogStream = require("./src/config/log")

//라우팅
const home = require("./src/routes/home");

//앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");
//__dirname = app.js가 있는 폴더 위치 반환
app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());
//URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않음
app.use(bodyParser.urlencoded({ extended: true}));
app.use(morgan("dev"));
app.use(morgan("common", { stream: accessLogStream }));

app.use("/", home); // use -> 미들 웨어를 등록해주는 메서드.

module.exports = app;

