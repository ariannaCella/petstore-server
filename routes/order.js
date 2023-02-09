const router = require("express").Router();


//lh:5000/api/user/usertest

router.post("/checkout", (req, res)=>{
    const name= req.body.name;
    const surname= req.body.surname;
    const email= req.body.email;
    const address= req.body.address;

    console.log("nome:"+ name+ " cognome: "+surname);
    res.send("ordine effettuato:\n nome:"+ name+ " cognome: "+surname);
})

module.exports = router