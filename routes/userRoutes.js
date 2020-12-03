//initialize
const {
	database,
	router,
	mysql,
	passport
} = require("../lib/keys");
const {validations} = require("../lib/functions");

const mydb = mysql.createConnection(database);

//setting routes
router.get('/singup',(req,res)=>{
	res.render('singup')
});

router.get("/singin",(req,res)=>{
	res.render("singin");
})

router.get("/profile",(req,res)=>{
	res.render("profile",{user:req.user[0]})
})

router.get("/logout",(req,res)=>{
	req.logOut();
	res.redirect("singin")
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