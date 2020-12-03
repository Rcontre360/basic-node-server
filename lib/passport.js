

const {database,mysql} = require("../lib/keys");
const functions = require("../lib/functions");
const localStrategy = require("passport-local").Strategy;
const mydb = mysql.createPool(database);
const passport = require("passport")

passport.use("singin",new localStrategy({
	usernameField:"name",
	passwordField:"password",
	passReqToCallback:true
},async (req,name,password,done)=>{
	mydb.query("SELECT * FROM users WHERE name = ?",[name],async (err,res)=>{
		if (res.length>0){
			const user = res[0];
			const myres = await functions.matchPassword(password,res[0].password);
			if (myres){
				done(null,user);
			} else 
				done(null,false);
		} else 
			done(null,false);
	})

}));


passport.use("singup",new localStrategy({
	usernameField:"name",
	passwordField:"password",
	passReqToCallback: true
},async (req,name,password,done)=> {
	const {email} = req.body;
	const user = {email,password,name};
	
	user.password = await functions.encrypt(password);
	const res = await mydb.query("INSERT INTO users SET ?",[user],(err,res)=>{
		user.userID = res.insertId;
		return done(null,user);
	});
}));


passport.serializeUser((user,done)=>{
	if (user)
		done(null,user.userID);
	else 
		done(null,false);
});

passport.deserializeUser(async (id,done)=>{
	await mydb.query("SELECT * FROM users WHERE userID = ?",[id],
		(err,res)=>{
			if (!err)
				done(null,res);
			else 
				done(null,false)
		})
})


