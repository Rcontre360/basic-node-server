const bcrypt = require("bcryptjs");

const functions = {};

functions.encrypt = async (password)=>{
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password,salt);
}

functions.matchPassword = bcrypt.compare;

module.exports = functions;