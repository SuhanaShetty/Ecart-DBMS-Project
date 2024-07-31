const items_details=require('../controller/sellerdashboard_c')

const express=require('express');
const ejs=require("ejs");
const router=express.Router();
// const mongoose = require('mongoose');
const bodyParser=require("body-parser");
const multer = require("multer");
// const profileC=require('./controller/profileC.js')
const app=express();
// const Profile=require('./controller/profile.model.js');
//const profiles = require('./controller/profile.model.js');
// const profiles = require('./controller/profile.model.js');
app.use(bodyParser.urlencoded({
  extended:true
}));

router.get("/itemsdetails",async(req, res) => {
    console.log("hello this to check d..........")
      var d = await items_details.itemsdetails(req, res);
      console.log(d+"this is d..................");
      var n = d.length;
      console.log(n)
      res.render('shome', { layout: false,  items:d, items_id: " " });
      
 })
 router.get("/add_details",async(req,res)=>{
    res.render('addproduct');
    
    });



 router.post('/add_details',async(req,res)=>{
    const details=req.body
    console.log(details);
    const display=await items_details.addetails(req,res);
    console.log(display)
    
})



router.get("/itemsdetails_cus",async(req, res) => {
    console.log("hello this to check d..........")
      var d = await items_details.itemsdetails_cus(req, res);
      console.log(d+"this is d..................");
      var n = d.length;
      console.log(n)
      res.render('chome', { layout: false,  items:d, items_id: " " });
      
 })


 router.post("/itemsdetails_cart",async(req, res) => {
  console.log("hello this to cart...")
  console.log(req.body)
    var d = await items_details.itemdetails_cart(req, res);
    console.log(d+"this is d..................");
    // var n = d.length;
    // console.log(n)
    // res.render('chome', { layout: false,  items:d, items_id: " " });
    
})


router.get("/cart",async(req, res) => {
  console.log("hello view cart")
    var d = await items_details.cart(req, res);
    console.log(d+"this is d..................");
    var n = d.length;
    console.log(n)
    res.render('cartdetails', { layout: false,  items:d});
    
})

module.exports=router;