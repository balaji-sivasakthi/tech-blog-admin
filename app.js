const cookieParser = require('cookie-parser')
const express = require('express')
const auth = require('./middleware/auth')
const loginRoute = require('./routes/login')
const blogRoute = require('./routes/blog')
const app = express()

const db = require('./config').firestore()
//settings
app.disable('x-powered-by')
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
app.set('view engine','ejs')

//path
app.use('/',express.static(__dirname+'/Public'))
app.use('/blog',express.static(__dirname+'/Public'))

//route
app.use('/login',loginRoute)
app.use('/blog',auth,blogRoute)

app.get('/',auth,async(req,res)=>{
    
    const loginName=req.cookies['admin_name']
    var data=[];
    try {
        var result = await db.collection('author').get()     
        //console.log(result)
        result.forEach(async e=>{
            var d = e.data()
            data.push(d)
        })

    } catch (error) {
        
        res.send("Something went wrong Contact Develeopers <br>" +error)
    }
    var tag ;
    
    try {
        tag = await db.collection('tag').doc('tag').get();
        tag = tag.data()
        console.log(tag)
    } catch (error) {
        res.send("Something went wrong Contact Develeopers <br>" +error)
    }
    var tagValue;
    try{
        
        t1 =await db.collection('blog').where('tag','==',tag[0]).get()
        t2=await db.collection('blog').where('tag','==',tag[1]).get()
        t3=await db.collection('blog').where('tag','==',tag[2]).get()
        t3=await db.collection('blog').where('tag','==',tag[3]).get()
        
    }catch(error){

    }

   //res.send(data)
   res.render('index',{login:loginName,data:data,tag:tag['tag']})
})




app.listen(process.env.PORT||3000,()=>{console.log("Running...."+process.env.PORT||3000)})