const cookieParser = require('cookie-parser')
const express = require('express')
const auth = require('./middleware/auth')
const loginRoute = require('./routes/login')
const blogRoute = require('./routes/blog')
const app = express()


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
app.use('/login',auth,loginRoute)
app.use('/blog',auth,blogRoute)

app.get('/',auth,(req,res)=>{
    
    const loginName=req.cookies['admin_name']

 

    res.render('index',{login:loginName})
})




app.listen(process.env.PORT,()=>{console.log("Running...."+process.env.PORT)})