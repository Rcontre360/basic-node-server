
const {database,mysql,passport} = require("../lib/keys");
const functions = require("../lib/functions");
const localStrategy = require("passport-local").Strategy;
const mydb = mysql.createPool(database);

passport.use("singup",new localStrategy({
	usernameField:"name",
	passwordField:"password",
	passReqToCallback: true
},async (req,name,password,done)=> {

	const {email} = req.body;
	const user = {email,password,name};
	
	user.password = await functions.encrypt(password);
	const res = await mydb.query("INSERT INTO users SET ?",[user],(err,res)=>{
		user.id = res.insertId;
		return done(null,user);
	});
}));


passport.serializeUser((user,done)=>{
	done(null,user.id);
});

passport.deserializeUser(async (id,done)=>{
	await mydb.query("SELECT * FROM users WHERE userID = ?",{id},
		(err,res)=>{
			console.log(res);
			done(null,res[0]);
		})
})










