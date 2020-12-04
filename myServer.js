
//initializations 
const {
	express,
	morgan,
	session,
	mysqlSession,
	database
} = require(__dirname+"/lib/keys");

const passport = require("passport");
require("./lib/passport");
const app = express();

app.set("port",process.env.PORT || 8080); // set port as any aviable in the system

// templates engine
app.set('view engine','ejs');
app.set('views',__dirname+'/views');

//middlewares
app.use(session({
	secret:"Rcontre360",
	resave:false,
	saveUninitialized:false,
	//store: new mysqlSession(database)
}))
app.use(morgan("dev")); // devdependency, see request to the server
app.use(express.urlencoded());
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//global variables 
app.use((req,res,next)=>{
	app.locals.user = req.user;
	next();
})

//Setting routes in 'routes' folder
app.use(express.static(__dirname+"/public"));
app.use('/',require(__dirname+'/routes/pagesRoutes'));
app.use('/',require(__dirname+'/routes/rocketRoutes'));
app.use('/',require(__dirname+'/routes/userRoutes'));


app.use((req,res,next)=>{   //set 404 page
	res.status(404).render('my404')
})

app.listen(app.get("port"),()=>{
	console.log("listening at port 8080.");
});