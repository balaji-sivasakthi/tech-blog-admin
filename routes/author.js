const express = require('express')
const author = express.Router()
//const multer = require('multer')
const {uploadImage,deleteImage} = require('../Helper/helper')
const db = require('../config').firestore()
// const upload = multer({
//         storage: multer.memoryStorage(),
//         limits: {
//           fileSize: 5 * 1024 * 1024,
//         },
//  })

author.get('/',async(req,res)=>{
    const loginName=req.cookies['admin_name']

      var data = await db.collection('author').get()
      console.log(data)
      var a = []
      data.forEach(e=>{
              var v = e.data()
              v['id']=e.id
              a.push(v)
      })
      
      res.render('page/author',{a:a,login:loginName})
})

//const cpUpload = upload.fields([{ name: 'profile', maxCount: 1 }])

author.post('/',async(req,res)=>{


        // var pic = req.files.profile[0].buffer
        try{
        // pic = await uploadImage(pic,'profile/'+(req.body.email).split('@')[0])
        var profile={}
        profile['name']=req.body.name;
        profile['email']=req.body.email;
        profile['desc']=req.body.bio;
        profile['profilePic']="https://storage.googleapis.com/latroosfttechblog/profile/logo.png"
        profile['numberOfPost']=0
        profile['password']=req.body.password
        console.log(profile)
        
        await db.collection('author').doc(req.body.email).set(profile)
        res.redirect('/author#success')

        }catch(err){
                console.log(err);
        }
        

      
})



author.get('/edit',async (req,res)=>{
        var id =req.query.id
        const loginName=req.cookies['admin_name']

        var data = await db.collection('author').doc(id).get()
        
        console.log(data)
        res.render('page/editauthor',{data:data.data(),login:loginName})
})




author.post('/edit',async(req,res)=>{

        // var pic = req.files.profile[0].buffer
        try{
                // pic = await uploadImage(pic,'profile/'+(req.body.email).split('@')[0])
                var profile={}
                profile['name']=req.body.name;
                profile['email']=req.body.email;
                profile['desc']=req.body.bio;
                profile['password']=req.body.password
          
                await db.collection('author').doc(req.query.id).update(profile)
                res.redirect('/author#success')
        
                }catch(err){
                        console.log(err);
                }
})
author.get('/delete',async(req,res)=>{

        try {
                var docId = req.query.id
                await db.collection('author').doc(docId).delete()
                await db.collection('admin').doc(docId).delete()
                res.redirect('/author#success')
        } catch (error) {
                res.send(error+" ")
        }
       
})

module.exports = author
