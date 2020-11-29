const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const fs = require('fs'); 

module.exports = {

	database:{
		host : 'localhost',
		user : 'root',
		password: 'r8112965',
		database: 'appDatabase'
	},
	express,
	router,
	mysql,
	bodyParser,
	morgan,
	fs

}