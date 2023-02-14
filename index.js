console.log('hello')
const express= require("express");
const app=express();
const mysql= require("mysql");
//const bodyParser = require('body-parser');


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
let TotOrder=0;

app.use(express.json());


app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get('/getDogFood', (req, res) => {
  let queryString = 'SELECT * FROM cibo WHERE specie=1';
  connection.query(queryString, function(err, result, fields) {
  if (err) throw err;
  
  res.send(result)
  });
  })

app.get('/getCatFood', (req, res) => {
  let queryString = 'SELECT * FROM cibo WHERE specie=2';
  connection.query(queryString, function(err, result, fields) {
  if (err) throw err;
  
  res.send(result)
  });
  })

app.get('/getDogFoodSecco', (req, res) => {
  let queryString = "SELECT * FROM cibo WHERE Specie=1 AND Consistenza='secco'";
  connection.query(queryString, function(err, result, fields) {
  if (err) throw err;
  
  res.send(result)
  });
  })

app.get('/getCatFoodSecco', (req, res) => {
  let queryString = "SELECT * FROM cibo WHERE Specie=2 AND Consistenza='secco'";
  connection.query(queryString, function(err, result, fields) {
  if (err) throw err;
  
  res.send(result)
  });
  })

app.get('/getDogFoodUmido', (req, res) => {
  let queryString = "SELECT * FROM cibo WHERE Specie=1 AND Consistenza='umido'";
  connection.query(queryString, function(err, result, fields) {
  if (err) throw err;
  
  res.send(result)
  });
  })

app.get('/getCatFoodUmido', (req, res) => {
  let queryString = "SELECT * FROM cibo WHERE Specie=2 AND Consistenza='umido'";
  connection.query(queryString, function(err, result, fields) {
  if (err) throw err;
  
  res.send(result)
  });
  })
    
  

  app.get('/getCatAccessories', (req, res) => {
    let queryString = 'SELECT * FROM accessori WHERE specie=2';
    connection.query(queryString, function(err, result, fields) {
    if (err) throw err;
    
    res.send(result)
    });
    })

    app.get('/getDogAccessories', (req, res) => {
      let queryString = 'SELECT * FROM accessori WHERE specie=1';
      connection.query(queryString, function(err, result, fields) {
      if (err) throw err;
      
      res.send(result)
      });
      })

    app.get('/getDogGame', (req, res) => {
      let queryString = 'SELECT * FROM accessori WHERE specie=1 AND Tipo="gioco"';
      connection.query(queryString, function(err, result, fields) {
      if (err) throw err;
      
      res.send(result)
      });
      })

      app.get('/getDogGuinzaglio', (req, res) => {
        let queryString = "SELECT * FROM accessori WHERE Specie=1 AND Tipo='guinzaglio'";
        connection.query(queryString, function(err, result, fields) {
        if (err) throw err;
        
        res.send(result)
        });
        })
  
      app.get('/getDogCollare', (req, res) => {
        let queryString = "SELECT * FROM accessori WHERE Specie=1 AND Tipo='collare'";
        connection.query(queryString, function(err, result, fields) {
        if (err) throw err;
        
        res.send(result)
        });
        })
  
      app.get('/getDogBowl', (req, res) => {
        let queryString = "SELECT * FROM accessori WHERE Specie=1 AND Tipo='ciotola'";
        connection.query(queryString, function(err, result, fields) {
        if (err) throw err;
        
        res.send(result)
        });
        })
  
      
      
    app.get('/getCatGame', (req, res) => {
        let queryString = "SELECT * FROM accessori WHERE Specie=2 AND Tipo='gioco'";
        connection.query(queryString, function(err, result, fields) {
        if (err) throw err;
        res.send(result)
        });
        })

    app.get('/getCatTiragraffi', (req, res) => {
      let queryString = "SELECT * FROM accessori WHERE Specie=2 AND Tipo='tiragraffi'";
      connection.query(queryString, function(err, result, fields) {
      if (err) throw err;
      
      res.send(result)
      });
      })

    app.get('/getCatLitter', (req, res) => {
      let queryString = "SELECT * FROM accessori WHERE Specie=2 AND Tipo='lettiera'";
      connection.query(queryString, function(err, result, fields) {
      if (err) throw err;
      
      res.send(result)
      });
      })

    app.get('/getCatBowl', (req, res) => {
      let queryString = "SELECT * FROM accessori WHERE Specie=2 AND Tipo='ciotola'";
      connection.query(queryString, function(err, result, fields) {
      if (err) throw err;
      
      res.send(result)
      });
      })

    app.get('/getAll', (req, res) => {
      let queryString = "SELECT * FROM  catalogo ORDER BY Nome ASC";
      connection.query(queryString, function(err, result, fields) {
      if (err) throw err;
     
      res.send(result)
      });
      })

      app.post('/generateOrder',(req,res)=>{
        const name= req.body.customer.name;
        const surname= req.body.customer.lastName;
        const email= req.body.customer.email;
        const address= req.body.customer.address;
        const products=req.body.order_details;
        
        console.log("nome:"+ name+ " cognome: "+surname+"\n email"+email+" address: "+ address+ "\n orderdetails:"+products[0].Nome);
        TotOrder++;
        console.log("json: "+JSON.stringify(products));
        let queryString = "INSERT into ordine VALUES ("+TotOrder+" , '"+name+"' , '"+surname+"' , '"+email+"' , '"+address+"' , '"+JSON.stringify(products)+"' ) ";
        connection.query(queryString, function(err, result) {
        if (err) throw err;
      });
      })

      app.post('/generateMessage',(req,res)=>{
        const name= req.body.name;
        const email= req.body.email;
        const message=req.body.message;
        
        console.log("nome:"+ name+ " \nemail: "+email+"\nmessage: "+ message);

        let queryString = "INSERT into messaggi VALUES ('"+name+"' , '"+email+"' , '"+message+"'  ) ";
        connection.query(queryString, function(err, result) {
        if (err) throw err;
      });
      })

      app.post('/generateNews',(req,res)=>{
        const name= req.body.name;
        const surname= req.body.surname;
        const email=req.body.email;
        
        console.log("nome:"+ name+ " \ncognome: "+surname+"\nemail: "+ email);

        let queryString = "INSERT into newsletter VALUES ('"+name+"' , '"+surname+"' , '"+email+"' ) ";
        connection.query(queryString, function(err, result) {
        if (err) throw err;
      });
      })

app.listen(process.env.PORT || 3001, ()=>{
    console.log("Backend server is running!");
})