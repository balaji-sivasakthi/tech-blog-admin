const express = require('express')
const author = express.Router()

author.get('/',(req,res)=>{
    const loginName=req.cookies['admin_name']
      res.render('page/author',{login:loginName})
})

author.post('/',(req,res)=>{
        res.send("Hello")
})
module.exports = author
