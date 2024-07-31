const express=require('express');

const ejs=require("ejs");
const bodyParser=require("body-parser");
const multer = require("multer");
const app=express();
app.use(bodyParser.urlencoded({
  extended:true
}));
const bcrypt = require('bcrypt');
const { Client } = require("pg");


app.use('/itemsdetails_cart',require('./router/sellerdashboard_r'))
app.use('/itemsdetails_cus',require('./router/sellerdashboard_r'))
app.use('/',require('./router/sellerdashboard_r'));
app.use('/add_details',require('./router/sellerdashboard_r'));
app.use('/itemsdetails',require('./router/sellerdashboard_r'));

app.set("view engine","ejs");

app.get("/sellerR",(req,res)=>{
  res.render('sellerR');
  });


app.post('/sellerR', async (req, res) => {
  const { name, email, address, phone, password } = req.body;

  try {
    
    const hashedPassword = await bcrypt.hash(password, 10); 

    
    const client = new Client({
      host: "localhost",
      port: 5432,
      user: "postgres",
      password: "postgres",
      database: "ecommerce"
    });
    await client.connect();

    const query = `INSERT INTO seller (seller_name, seller_email, seller_address, seller_phone, seller_password)
                   VALUES ($1, $2, $3, $4, $5)`;

    const values = [name, email, address, phone, hashedPassword];

    
    await client.query(query, values);

    await client.end();

    console.log('Data inserted successfully!');
    res.redirect("/Slogin");
  } catch (error) {
    console.error('Error inserting data:', error);
    res.redirect("/sellerR");
  }
});



app.get("/Slogin",(req,res)=>{
  res.render('Slogin');
  
  });

 
  app.post('/Slogin', (req, res) => {
    const { username, password } = req.body;
  
    const client = new Client({
      host: "localhost",
      port: 5432,
      database: "ecommerce",
      user: "postgres",
      password: "postgres",
    });
  
    client.connect().then(() => {
      const query = `SELECT * FROM seller WHERE seller_name = $1`;
      client.query(query, [username], (err, result) => {
        if (err) {
          console.log(err);
          res.redirect("/Slogin");
        } else {
          if (result.rows.length > 0) {
            const hashedPassword = result.rows[0].seller_password;
  
          
            bcrypt.compare(password, hashedPassword, (bcryptErr, isMatch) => {
              if (bcryptErr) {
                console.log(bcryptErr);
                res.redirect("/Slogin");
              } else {
                if (isMatch) {
                  console.log("Login successful");
                  res.redirect("/itemsdetails");
                } else {
                  const showError = true;
                  res.render("Slogin", { showError });
                }
              }
            });
          } else {
            const showError = true;
            res.render("Slogin", { showError });
          }
        }
      });
    });
  });
  

  app.get("/customerR",(req,res)=>{
    res.render('customerR');
    
    });
  
//     app.post('/customerR',(req,res)=>{
//       const{name,email,address,phone,password}=req.body;
//   const { Client } = require("pg");

// const client = new Client({
//   host: "localhost",
//   port: 5432,
//   user: "postgres",
//   password: "postgres",
//   database: "ecommerce"
// });
// client.connect().then(() => {
//   try{
//   const query = `INSERT INTO customer (customer_name, customer_email,customer_address,customer_phone,customer_password ) VALUES ($1, $2, $3, $4, $5)`;
//   client.query(query, [name, email,address, phone,password,]);
//   console.log('hello')
//   res.redirect("/Clogin")
// }
// catch (e){res.redirect("/sellerR")}
// });
// });
  
app.post('/customerR', async (req, res) => {
  const { name, email, address, phone, password } = req.body;

  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new PostgreSQL client instance
    const client = new Client({
      host: "localhost",
      port: 5432,
      user: "postgres",
      password: "postgres",
      database: "ecommerce"
    });
    await client.connect();

    const query = `INSERT INTO customer (customer_name, customer_email, customer_address, customer_phone, customer_password)
                   VALUES ($1, $2, $3, $4, $5)`;

    const values = [name, email, address, phone, hashedPassword];

    // Execute the insert query with hashed password
    await client.query(query, values);

    // Close the database connection
    await client.end();

    console.log('Data inserted successfully!');
    res.redirect("/Clogin");
  } catch (error) {
    console.error('Error inserting data:', error);
    res.redirect("/customerR");
  }
});






     app.get("/Clogin",(req,res)=>{
      res.render('Clogin');
      
      });



      // app.post('/Clogin',(req,res)=>{
      //   const { username, password } = req.body;

      //   const client = new Client({
      //     host: "localhost",
      //     port: 5432,
      //     database: "ecommerce",
      //     user: "postgres",
      //     password: "postgres",
      //   });
      
      //   client.connect().then(() => {
      //     const query = `SELECT * FROM customer WHERE  customer_name = $1 AND customer_password = $2`;
      
      //     client.query(query, [username, password], (err, result) => {
      //       if (err) {
      //         console.log(err);
      //         res.redirect("/Clogin");
      //       } else {
      //         if (result.rows.length > 0) {
      //           res.redirect("/itemsdetails_cus");
      //           console.log("login successful")
      //         } else {
      //           const showError= true;
      //           res.render("Clogin", {showError});
      //         }
            
      //       }
      //     });
      //   });
      //   }); 
    
      // app.post('/Clogin', (req, res) => {
      //   const { username, password } = req.body;
      
      //   const client = new Client({
      //     host: "localhost",
      //     port: 5432,
      //     database: "ecommerce",
      //     user: "postgres",
      //     password: "postgres",
      //   });
      
      //   client.connect().then(() => {
      //     const query = `SELECT * FROM customer WHERE customer_name = $1`;
      //     client.query(query, [username], (err, result) => {
      //       if (err) {
      //         console.log(err);
      //         res.redirect("/Clogin");
      //       } else {
      //         if (result.rows.length > 0) {
      //           const hashedPassword = result.rows[0].customer_password;
      
      //           // Compare the entered password with the hashed password
      //           bcrypt.compare(password, hashedPassword, (bcryptErr, isMatch) => {
      //             if (bcryptErr) {
      //               console.log(bcryptErr);
      //               res.redirect("/Clogin");
      //             } else {
      //               if (isMatch) {
      //                 console.log("Login successful");
      //                 res.redirect("/itemsdetails_cus");
      //               } else {
      //                 const showError = true;
      //                 res.render("Clogin", { showError });
      //               }
      //             }
      //           });
      //         } else {
      //           const showError = true;
      //           res.render("Clogin", { showError });
      //         }
      //       }
      //     });
      //   });
      // });

      app.post('/Clogin', (req, res) => {
        const { username, password } = req.body;
      
        const client = new Client({
          host: "localhost",
          port: 5432,
          database: "ecommerce",
          user: "postgres",
          password: "postgres",
        });
      
        client.connect().then(() => {
          const query = `SELECT * FROM customer WHERE customer_name = $1`;
          client.query(query, [username], (err, result) => {
            if (err) {
              console.log(err);
              res.redirect('/Clogin');
            } else {
              if (result.rows.length > 0) {
                const hashedPassword = result.rows[0].customer_password;
      
                
                bcrypt.compare(password, hashedPassword, (bcryptErr, isMatch) => {
                  if (bcryptErr) {
                    console.log(bcryptErr);
                    res.redirect('/Clogin');
                  } else {
                    if (isMatch) {
                      console.log('Login successful');
                      res.redirect('/itemsdetails_cus');
                    } else {
                      const showError = true;
                      res.render('Clogin', { showError });
                    }
                  }
                });
              } else {
                const showError = true;
                res.render('Clogin', { showError });
              }
            }
          });
        });
      });
    
      app.get("/customerR",(req,res)=>{
        res.render('customerR');
        
        });  





    
// const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "postgres",
  database: "ecommerce"
});
client.connect().then(() => {
        console.log('Connected to PostgreSQL!');
      }).catch((err) => {
        console.error('Error connecting to PostgreSQL:', err);
        client.end();
      });    


app.listen(3000,function(){
    console.log("App is running on port 3000");
});


  