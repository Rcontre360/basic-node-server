/*
	This is the jsonRoutes.js file, it handles all get methods related to our 
	'rocketInfo.json'. It uses dynamic routing to handle all data in a single 
	function
*/
const express = require('express');
const router = express.Router();

//getting json file
var fs = require('fs'); 
var data = JSON.parse(fs.readFileSync('rocketInfo.json', 'utf8')); 

//dynamic routes for json file
router.get('/rockets',(req,res)=>{
	res.render('myRockets',{rocketName:"Rocket",rocketData:""})
})

router.get('/rockets/:name',(req,res,next)=>{
	//getting get path. ex rockets/C01 gets 'C01' string in 'name'.
	var name = req.params.name;
	//getting object represented by that name
  var user = data.filter(u => u.capsule_serial == name );	
  res.json(user[0])
})


module.exports = router;