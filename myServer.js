
//initializations 
const {express,morgan,bodyParser} = require(__dirname+"/lib/keys");
const app = express();
app.set("port",process.env.PORT || 8080); // set port as any aviable in the system

// templates engine
app.set('view engine','ejs');
app.set('views',__dirname+'/views');

//Setting routes in 'routes' folder
app.use(express.static(__dirname+"/public"));
app.use('/',require(__dirname+'/routes/pagesRoutes'));
app.use('/',require(__dirname+'/routes/jsonRoutes'));
app.use('/',require(__dirname+'/routes/userRoutes'));

//middlewares 
app.use((req,res,next)=>{   //set 404 page
	res.status(404).render('my404')
})
app.use(morgan("dev")); // devdependency, see request to the server
app.use(bodyParser.json());

app.listen(app.get("port"),()=>{
	console.log("listening at port 8080.");
});