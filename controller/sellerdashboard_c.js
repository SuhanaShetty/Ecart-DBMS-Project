const express=require('express');
const pool=require('../database')
const ejs=require("ejs");
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

module.exports.itemsdetails = async (req, res) => {
    try {
     console.log("hello welcome..................")
      var items_details = await pool.query("select * from product where seller_id=1");
      console.log(items_details.rows);
      console.log("hello..................")
      console.log(items_details.rows[0].item_id+"hello")
      return items_details.rows;
    }
    catch (e) {
      console.error(e)
      res.json({
        errors: 'Invalid'
      });
  
    }
  }


  module.exports.addetails=async(req,res)=>{
    try{
        console.log("Items Details Submission");
        let {seller_id,product_id,name,description,price,quantity }=req.body;
        console.log({
            seller_id,product_id,name,description,price,quantity
        })
        pool.query('INSERT INTO product (seller_id,product_id,product_name,description,price,quantity)values($1,$2,$3,$4,$5,$6)',[seller_id,product_id,name,description,price,quantity]);
        console.log("Submission Successful");
        res.redirect('/itemsdetails');
    }
    catch(err){
        console.log(err)
    }
  }
  

  module.exports.itemsdetails_cus = async (req, res) => {
    try {
     console.log("hello welcome..................")
      var items_details = await pool.query("select * from product");
      console.log(items_details.rows);
      console.log("hello..................")
      console.log(items_details.rows[0].item_id+"hello")
      return items_details.rows;
    }
    catch (e) {
      console.error(e)
      res.json({
        errors: 'Invalid'
      });
  
    }
  }



  // module.exports.itemsdetails_cart= async (req, res) => {
  //   try {
  //    console.log("hello welcome to itemdetails_cart")
  //     var items_details = await pool.query("insert");
  //     console.log(items_details.rows);
  //     console.log("hello..................")
  //     console.log(items_details.rows[0].item_id+"hello")
  //     return items_details.rows;
  //   }
  //   catch (e) {
  //     console.error(e)
  //     res.json({
  //       errors: 'Invalid'
  //     });
  
  //   }
  // }

  module.exports.itemdetails_cart=async(req,res)=>{
    try{
        console.log("Items Details Submission");
        let {Item__id,Item__seller_id,Item__name,Item_des,Item_price,Item_qty,Item_btn }=req.body;
        // console.log({
        //     seller_id,product_id,name,description,price,quantity
        // })
        let customer_id=2
        pool.query('INSERT INTO orders(seller_id,customer_id,product_name,product_id)values($1,$2,$3,$4)',[Item__seller_id,customer_id,Item__name,Item__id]);
        console.log("Submission Successful");
        // res.redirect('/itemsdetails');
    }
    catch(err){
        console.log(err)
    }
  }



  module.exports.cart = async (req, res) => {
    try {
     console.log("hello welcome to cart")
      var items_details = await pool.query("select * from orders where customer_id=$1",[2]);
      console.log(items_details.rows);
      console.log("hello..................")
      console.log(items_details.rows[0].item_id+"hello")
      return items_details.rows;
    }
    catch (e) {
      console.error(e)
      res.json({
        errors: 'Invalid'
      });
  
    }
  }



//   module.exports.cart = async (req, res) => {
//     try {
//       console.log("hello welcome to cart");
  
//       // Join orders and product tables based on item_id
//       var items_details = await pool.query(`
//         SELECT orders.*, product.product_name, product.price
//         FROM orders
//         INNER JOIN product ON orders.item_id = product.item_id
//         WHERE customer_id = $1
//       `, [2]);
  
//       console.log(items_details.rows);
//       console.log("hello..................");
//       console.log(items_details.rows[0].item_id + "hello");
//       res.json(items_details.rows);
//   } catch (e) {
//     console.error(e);
//     res.json({
//       errors: 'Invalid'
//     });
//   }
// };