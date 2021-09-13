const express = require('express')
const author = express.Router()
const multer = require('multer')
const {uploadImage,deleteImage} = require('../Helper/helper')
const db = require('../config').firestore
const upload = multer({
        storage: multer.memoryStorage(),
        limits: {
          fileSize: 5 * 1024 * 1024,
        },
 })

author.get('/',(req,res)=>{
    const loginName=req.cookies['admin_name']
      res.render('page/author',{login:loginName})
})

const cpUpload = upload.fields([{ name: 'profile', maxCount: 1 }])

author.post('/',cpUpload,async(req,res)=>{


        // var pic = req.files.profile[0].buffer
        try{
        // pic = await uploadImage(pic,'profile/'+(req.body.email).split('@')[0])
        var profile={}
        profile['name']=req.body.name;
        profile['email']=req.body.email;
        profile['desc']=req.body.bio;
        profile['profilePic']="https://storage.googleapis.com/latroosfttechblog/profile/logo.png"
        profile['numberOfPost']=0
        console.log(profile)
        
        await db.collection('author').doc(req.body.email).set(profile)
        
       
        }catch(err){
                console.log(err);
        }
        try {
                await db.collection('admin').doc(req.body.email).set(
                        {
                                name:req.body.name,
                                email:req.body.email,
                                password:req.body.pass
                        }
                )
        } catch (error) {
                
        }

        res.redirect('/author#success')
})



author.get('/edit',(req,res)=>{



})
author.get('/delete',(req,res)=>{


})

module.exports = author
