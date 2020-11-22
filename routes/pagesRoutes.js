/*
	This is the pagesRoutes.js it handles get request to our usual pages.
	It uses express.Router to handle the requests, also it exports it so that our main
	function can use it.
*/
const express = require('express');
const router = express.Router();

// get all pages
router.get('/',(req,res)=>{
	res.render('index');
});

router.get('/myServices',(req,res)=>{
	res.render('myServices')
});

router.get('/myAbout',(req,res)=>{
	res.render('myAbout')
});

router.get('/myContact',(req,res)=>{
	res.render('myContact')
});
//end get all pages


module.exports = router;