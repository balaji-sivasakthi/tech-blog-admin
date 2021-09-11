const express = require('express')
const blog = express.Router()
const firebase =require('../config')
const multer  = require('multer')
const upload = multer()



const db = firebase.firestore();
const storage = firebase.storage()

blog.get('/',(req,res)=>{
 res.render('page/blog',{data:""})
})




blog.post('/', upload.single('banner'),(req,res)=>{



    console.log(req.body);



    //var bucket = storage.bucket('blog')
    
    console.log("------Files-------");
    
    //bucket.
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    const files = req.files;
    if(files){
    
    const banner = files.banner
    const banner2 = files.banner2
    
    const data ={}
    data['title']=req.body.title
    data['short']=req.body.short
    data['tag']=req.body.tag
    data['para-1'] =req.body.para
    data['para-2'] = req.body.para2
    data['author'] = req.cookies['latrosoft_author']
    data['by'] =req.cookies['admin_name']
    data['views']=0
    data['date']= dateTime
    //db.collection('blog').doc().set({data:"Balaji"})
    
    console.log(data);
   
    res.redirect('/blog')

    

    }else{
        
    }
   
 

})
module.exports = blog