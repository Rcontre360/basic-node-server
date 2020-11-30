//initialize
const {database,router,mysql,bodyParser,passport} = require("../lib/keys");
const mydb = mysql.createConnection(database);
router.use(bodyParser());

//setting routes
router.get('/singup',(req,res)=>{
	res.render('singup')
});

router.post('/singup', passport.authenticate("singup", {
	successRedirect:"/rockets",
	failureRedirect:"/"
}));


router.get('/newAccount',(req,res)=>{
	res.render('newAccount')
});


module.exports = router;