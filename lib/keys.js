const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const morgan = require("morgan");
const fs = require('fs'); 
const passport = require("passport");
const validator = require('express-validator');
const session = require("express-session");
const mysqlSession = require("express-mysql-session");

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
	morgan,
	fs,
	passport,
	validator,
	session,
	mysqlSession

}