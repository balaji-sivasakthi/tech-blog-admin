const express = require('express')
const blog = express.Router()
const firebase =require('../config')
const multer  = require('multer')
const uploadImage = require('../Helper/helper')
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  })
const db = firebase.firestore();

blog.get('/',(req,res)=>{
 res.render('page/blog',{data:""})
})

const cpUpload = upload.fields([{ name: 'banner', maxCount: 1 }, { name: 'banner2', maxCount: 1 }])
blog.post('/',cpUpload,async (req,res,next)=>{
    console.log(req.files)
    console.log(req.body);
    const banner = req.files.banner                                          
    const banner2 = req.files.banner2                                          
    //console.log(banner_blob)


    var data ={}
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    const files = req.files;
    console.log(req.body);
    if(files){
    

    try {
        const b1 = banner[0]
        const b2 = banner2[0]

      

        
        
        const b1Url = await uploadImage(b1,'techblog/'+dateTime+'b1')
        const b2url = await uploadImage(b2,'techblog/'+dateTime+'b2')
        data['title']=req.body.title
        data['short']=req.body.short
        data['tag']=req.body.tag
        data['para-1'] =req.body.para
        data['para-2'] = req.body.para2
        data['author'] = req.cookies['latrosoft_author']
        data['by'] =req.cookies['admin_name']
        data['views']=0
        data['date']= dateTime
        data['banner']= b1Url
        data['banner-2']= b2url
        console.log(data);
        db.collection('blog').doc().set(data)
        
        
        



      } catch (error) {
        next(error)
      }
    
    // console.log("------Files-------");
    
   
   
    res.redirect('/blog')

    

    // }else{
        
    // }
   
    }
})
module.exports = blog