const bcrypt = require("bcryptjs");
const {body,validationResult} = require("express-validator");

const functions = {};

functions.encrypt = async (password)=>{
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password,salt);
}

functions.matchPassword = bcrypt.compare;

functions.validations = {
	email:body("email").
		isEmail()
		.normalizeEmail(),
	password:body("password").
		not().isEmpty()
		.trim().escape(),
	name:body("name").not().isEmpty()
		.trim().escape(),
	validationResult 
}

module.exports = functions;