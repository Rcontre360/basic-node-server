//initialize
const {
	database,
	router,
	mysql,
	passport
} = require("../lib/keys");
const {validations,isLoggedIn,matchPassword} = require("../lib/functions");

const mydb = mysql.createConnection(database);

//setting routes
router.get('/singup',(req,res)=>{
	res.render('singup')
});

router.get("/singin",(req,res)=>{
	res.render("singin");
})

router.get("/profile",isLoggedIn,(req,res)=>{
	const nxtUser = req.user[0];
	nxtUser.password = 
	res.render("profile",{user:req.user[0],changeUserValues:false})
})

router.get("/logout",isLoggedIn,(req,res)=>{
	req.logOut();
	res.redirect("singin")
})

router.post("/modifyUserData",(req,res)=>{
	const userInfo =  req.body;
	const oldUser = req.user[0];
	console.log(userInfo)

	if (userInfo.givenPassword!=undefined){
		if (matchPassword(userInfo.givenPassword,oldUser.password))
			res.render("profile",{user:req.user[0],changeUserValues:true});
	} else {

		if (userInfo.name == "") userInfo.name = oldUser.name;
		if (userInfo.email == "") userInfo.email = oldUser.email;
		if (userInfo.password == "") userInfo.password = oldUser.password;

		let sql = "UPDATE users SET ?"
		mydb.query(sql,userInfo,(err,dbres)=>{
			if (err) {
				console.log(err)
				res.redirect("/");
			}
			res.redirect("/")
		})

	}
})

router.post('/singup',
	validations.name,
	validations.password,
	validations.email,
	passport.authenticate("singup", {
		successRedirect:"/rockets",
		failureRedirect:"/"
	})
);

router.post("/singin",
	validations.name,
	validations.password,
	(req,res,next)=>{
		const err = validations.validationResult(req)
		if (!err.isEmpty()){
			res.render("/");
		}
		passport.authenticate("singin", {
			successRedirect:"/rockets",
			failureRedirect:"/"
		})(req,res,next);
	}
);


module.exports = router;