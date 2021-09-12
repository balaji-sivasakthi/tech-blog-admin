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

const cpUpload = upload.fields([{ name: 'banner', maxCount: 1 }, { name: 'banner2', maxCount: 1 }])
blog.get('/',(req,res)=>{
        const loginName=req.cookies['admin_name']
        db.collection('blog').where('author','==',req.cookies['latrosoft_author']).get()
        .then(r=>{
            var doc=[]
            r.forEach(e=>{
                var data = e.data();
                data.id = e.id
                doc.push(data)
            })
            res.render('page/blog',{data:doc,login:loginName})
        })

})


blog.get('/edit',(req,res)=>{
  const loginName=req.cookies['admin_name']
    var docId=req.query.id;
    
    db.collection('blog').doc(docId).get()
    .then(r=>{
        const doc = r.data()
        res.render('page/editblog',{data:doc,login:loginName})
    })

})

blog.post('/edit',async (req,res)=>{
  var docId=req.query.id;
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
        const b1Url = await uploadImage(b1,'techblog/'+dateTime+'-b1')
        const b2url = await uploadImage(b2,'techblog/'+dateTime+'-b2')
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
        db.collection('blog').doc(id).set(data)
    
      } catch (error) {
        res.redirect('/blog#error')
      }
    
    // console.log("------Files-------");
    
   
   
    res.redirect('/blog#success')
    
    

    // }else{
        
    // }
   
    }
})



blog.delete('/delete',(req,res)=>{
  var docId = req.query.id
  try {
    db.collection('blog').doc(docId).delete()
    res.redirect('/blog#success')
  } catch (error) {
    res.redirect('/blog#error')
  }
  
 
})


blog.post('/',cpUpload,async (req,res)=>{
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
        const b1Url = await uploadImage(b1,'techblog/'+dateTime+'-b1')
        const b2url = await uploadImage(b2,'techblog/'+dateTime+'-b2')
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
        db.collection('blog').doc(docId).update(data)
    
      } catch (error) {
            res.send(error)
      }
    
    // console.log("------Files-------");
    
   
   
    res.redirect('/blog')

    

    // }else{
        
    // }
   
    }
})
module.exports = blog