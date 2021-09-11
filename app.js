const cookieParser = require('cookie-parser')
const express = require('express')
const auth = require('./middleware/auth')
const loginRoute = require('./routes/login')
const blogRoute = require('./routes/blog')
const fileUpload = require('express-fileupload')
const app = express()


//settings

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
app.set('view engine','ejs')

//path
app.use('/',express.static(__dirname+'/Public'))


//route
app.use('/login',loginRoute)
app.use('/blog',blogRoute)


app.get('/',auth,(req,res)=>{
    
    const adminName=req.cookies['admin_name']







    const data={
        logInAs:adminName
    }





    res.render('index',{data:data})
})

app.listen(3000,()=>{console.log("Running....")})