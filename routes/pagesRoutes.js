
const {router} = require("../lib/keys");

// get all pages
router.get('/',(req,res)=>{
	res.render('index');
});
//end get all pages


module.exports = router;