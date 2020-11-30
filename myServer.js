
//initializations 
const {express,morgan,bodyParser} = require(__dirname+"/lib/keys");
const passport = require("passport");
const app = express();
require("./lib/passport");
app.set("port",process.env.PORT || 8080); // set port as any aviable in the system

// templates engine
app.set('view engine','ejs');
app.set('views',__dirname+'/views');

//middlewares
app.use(morgan("dev")); // devdependency, see request to the server
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

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