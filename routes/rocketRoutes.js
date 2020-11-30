//initialization
const {database,router,mysql,fs} = require("../lib/keys");
const mydb = mysql.createConnection(database);

//getting json file
var data = JSON.parse(fs.readFileSync('rocketInfo.json', 'utf8')); 

mydb.connect((err)=>{
	if (err) throw err;

	let sql = "SELECT * FROM rockets";
	mydb.query(sql,(err,res)=>{
		if (err) throw err;	

		if (res[0]!=null) return; // if database has already all rockets

		let insert = "INSERT INTO rockets(rocketID,rocketJSON) VALUES(";
		for (var key in data){

			let rocketID = "'"+ data[key].capsule_serial+"'";
			let object = ",'"+ JSON.stringify(data[key])+"'";

			mydb.query(insert+rocketID+object+");", (err,res)=>{
				if (err) throw err;
			});
		}

	})

});

//dynamic routes for database file
router.get('/rockets',(req,res)=>{
	res.render('myRockets',{rocketName:"Rocket",rocketData:""})
})

router.get('/rockets/:name',(req,res,next)=>{
	var rocketID = req.params.name;

	let sql = "SELECT * FROM rockets WHERE ?";
	console.log(sql);

	mydb.query(sql, {rocketID}, (dberr,dbres) => {
		if (dberr) throw dberr;
		console.log(JSON.parse(dbres[0].rocketJSON));
		res.json(JSON.parse(dbres[0].rocketJSON));
	})	
})

module.exports = router;