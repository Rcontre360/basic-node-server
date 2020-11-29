//initialize
const {database,router,mysql,bodyParser} = require("../lib/keys");
router.use(bodyParser());
const mydb = mysql.createConnection(database);

//setting routes
router.get('/Login',(req,res)=>{
	res.render('Login')
});

router.post('/Login',(req,res)=>{
	const {email,password,name} = req.body;
	const user = {email,password,name};

	mydb.query("INSERT INTO users SET ?",user,(err,dbres)=>{
		if (err) throw err;
		console.log("Success");
		res.render("index");
	})

})

router.get('/newAccount',(req,res)=>{
	res.render('newAccount')
});


module.exports = router;