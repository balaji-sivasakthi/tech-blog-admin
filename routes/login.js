const express = require('express')
const login = express.Router()
const jwt = require('jsonwebtoken')
const db = require('../config').firestore();



login.get('/',(req,res)=>{
    res.render('login')
})

login.post('/',(req,res)=>{
    
    const email = req.body.email;
    const pass = req.body.password;
    console.log(req.body);
    
    db.collection('admin').doc(email).get()
    .then(async e=>{
        const user = e.data()
        console.log(user);
        if(user.email==email && user.password==pass){
            console.log("I'm True")
            var token = await jwt.sign(
                {data:{email:user.email,name:user.name }},
                "latrosoft",
                {expiresIn:'2h'}
            )
                res.cookie('access_token',token,{expires:new Date(Date.now()+2*3600000)})
                res.cookie('latrosoft_author',user.email,{expires:new Date(Date.now()+2*3600000)})
                res.redirect('/')

        }else{
            console.log("I'm False..");
            res.redirect('/login')
        }
    })

    //res.redirect('/')

})
module.exports = login