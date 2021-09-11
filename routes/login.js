const express = require('express')
const login = express.Router()
const jwt = require('jsonwebtoken')
const db = require('../config').firestore();



login.get('/',(req,res)=>{
    res.render('login')
})

login.post('/',(req,res)=>{
    
    const email = req.body.email;
    const pass = req.body.pass;

    db.collection('admin').doc(email).get()
    .then(async e=>{
        const user = e.data()
        if(user.email==email && user.password==pass){
            
            var token = await jwt.sign(
                {
                    data:{
                        email:user.email,
                        name:user.name
                    }  
                },
                "latrosoft",
                {expiresIn:'2h'}
            )

            res.set('x-access-token',token)
            res.redirect('/')

        }else{
            res.redirect('/login')
        }
    })

    //res.redirect('/')

})
module.exports = login