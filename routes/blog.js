const express = require('express')
const blog = express.Router()
const firebase =require('../config')

const db = firebase.firestore();
const storage = firebase.storage()

blog.get('/',(req,res)=>{
 res.render('page/blog',{data:""})
})




blog.post('/',(req,res)=>{



    const file = new Date()+'-'+
    console.log(req.body)
    res.render('page/blog',{data:""})

})
module.exports = blog