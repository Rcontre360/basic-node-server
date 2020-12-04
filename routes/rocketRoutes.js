//initialization
const {database,router,mysql,fs} = require("../lib/keys");
const {isLoggedIn} = require("../lib/functions")
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
router.get('/rockets',isLoggedIn,(req,res)=>{
	res.render('myRockets',{rocketName:"Rocket",rocketData:""})
})

router.get('/rockets/:name',isLoggedIn,(req,res,next)=>{
	var rocketID = req.params.name;

	let sql = "SELECT * FROM rockets WHERE ?";
	
	mydb.query(sql, {rocketID}, (dberr,dbres) => {
		if (dberr || dbres==undefined || dbres[0]==undefined) 
			res.send(dberr);
		else
			res.json(JSON.parse(dbres[0].rocketJSON));
	})
});

router.get("/userRockets",isLoggedIn,(req,res)=>{
	let sql = "SELECT rocketJSON FROM rockets WHERE rocketID IN (";
	sql += "SELECT rocketID FROM selectedRockets WHERE userID = ";
	sql += req.user[0].userID+");";

	let retObject = {allRockets:[]};

	mydb.query(sql,async (err,dbres)=>{
		if (!err){
			for (var k in dbres){
				const rocket = JSON.parse(dbres[k].rocketJSON);
				retObject.allRockets.push(rocket)
			}
			res.render("userRockets",retObject);
		} 
	});
});

router.get("/userRockets/delete/:id",isLoggedIn,(req,res)=>{
	const rocketID = req.params.id;
	let sql = "DELETE FROM selectedRockets WHERE rocketID = '"+rocketID;
	sql += "' and userID = "+req.user[0].userID+";";

	mydb.query(sql,(err,dbres)=>{
		res.redirect("/userRockets");
	});
})

router.post("/rockets/addRocket",isLoggedIn,(req,res)=>{

	let sql = "INSERT INTO selectedRockets SET ?";
	const data = {
		rocketID:req.body.id,
		userID:req.user[0].userID
	}
	mydb.query(sql,data,(err,dbres)=>{
		if (err) res.send(err)
	})

});

module.exports = router;