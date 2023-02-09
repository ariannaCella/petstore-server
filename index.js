console.log('hello')
const express= require("express");
const app=express();
const mysql= require("mysql");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const userRoute = require("./routes/user");
dotenv.config();

let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'ecommerce'
  });
   
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('DB Success! connected as id ' + connection.threadId);
});

app.use(express.json());
app.use("/api/user", userRoute); //cosa fa use?

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get('/getfood', (req, res) => {
  let queryString = 'SELECT * FROM cibo';
  connection.query(queryString, function(err, result, fields) {
  if (err) throw err;
  for (let i in result) {
    console.log('name: ', result[i].Nome);
  }
  res.send(result)
  });
  })

  app.get('/getaccessories', (req, res) => {
    let queryString = 'SELECT * FROM accessori';
    connection.query(queryString, function(err, result, fields) {
    if (err) throw err;
    for (let i in result) {
      console.log('name: ', result[i].Nome);
    }
    res.send(result)
    });
    })

    app.get('/getGiochiCane', (req, res) => {
      let queryString = 'SELECT * FROM accessori WHERE specie=1';
      connection.query(queryString, function(err, result, fields) {
      if (err) throw err;
      for (let i in result) {
        console.log('name: ', result[i].Nome);
      }
      res.send(result)
      });
      })
      
      
    app.get('/getGiochiGatto', (req, res) => {
        let queryString = 'SELECT * FROM accessori WHERE specie=2';
        connection.query(queryString, function(err, result, fields) {
        if (err) throw err;
        for (let i in result) {
          console.log('name: ', result[i].Nome);
        }
        res.send(result)
        });
        })

app.listen(process.env.PORT || 3001, ()=>{
    console.log("Backend server is running!");
})