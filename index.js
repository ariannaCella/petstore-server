console.log('hello')
const express= require("express");
const app=express();
const mysql= require("mysql");
const dotenv = require("dotenv");
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

app.listen(process.env.PORT || 5000, ()=>{
    console.log("Backend server is running!");
})