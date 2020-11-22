/*
ServerSide:
	myServer.js
	rocketInfo.json

	public:

	routes:
		jsonRoutes.js
		pagesRoutes.js

	views:
		index.ejs
		myAbout.ejs
		myContact.ejs
		myRocket.ejs
		myServices.ejs

		templates:
			footer.ejs
			head.ejs
			navbar.ejs
	
	This is myServer.js file. Basically is our 'main' function, it handles everything.
	It sets up ejs engine to make our page dynamic, also it uses a little middleware 
	function to handle our 404 page.

*/
const express = require("express")
const app = express();
const PORT = 8080;

// templates engine
app.set('view engine','ejs');
app.set('views',__dirname+'/views');

//Setting routes in 'routes' folder
app.use(express.static(__dirname+"/public"));
app.use('/',require(__dirname+'/routes/pagesRoutes'));
app.use('/',require(__dirname+'/routes/jsonRoutes'));

//set 404 page
app.use((req,res,next)=>{
	res.status(404).render('my404')
})



app.listen(PORT,()=>{
	console.log("listening at port 8080.");
});