const cookieParser = require('cookie-parser')
const express = require('express')
const auth = require('./middleware/auth')
const aauth = require('./middleware/adminauth')
const loginRoute = require('./routes/login')
const loginAdminRoute = require('./routes/adminlogin')

const blogRoute = require('./routes/blog')
const authorRoute = require('./routes/author')
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
app.use('/author',express.static(__dirname+'/Public'))

//route
app.use('/login',loginRoute)
app.use('/loginAdmin',loginAdminRoute)
app.use('/blog',auth,blogRoute)
app.use('/author',aauth,authorRoute)

app.get('/',auth,async(req,res)=>{
    let count={}
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

    try{
     var i=0
       
     
        
        while(i<tag['tag'].length){
            count[tag['tag'][i]]=0
            i++
        }
        i =0
       while(i<tag['tag'].length){
          
              t=  await db.collection('blog').where('tag','==',tag['tag'][i]).get()
              
              t.forEach(e => {
              var v =e.data().views
                
                count[tag['tag'][i]]+=v
               });
           
            i++
       }     
       console.log(count); 
    }catch(error){

    }
   var barChat={}
    try {
    var blog = await db.collection('blog').orderBy('date','desc').get()
    var limit=0
    
    blog.forEach(e=>{
        if(limit<6){
            barChat[[e.data().title]]=e.data().views
        }
    })
    } catch (error) {
        
    }
    console.log(barChat);
   //res.send(data)
   res.render('index',
   {
       login:loginName,
       data:data,
       tag:tag['tag'],
       tagValue:Object.values(count),
       blogLabel:Object.keys(barChat),
       blogValue:Object.values(barChat)
    })
})




app.listen(process.env.PORT||3000,()=>{console.log("Running...."+process.env.PORT||3000)})