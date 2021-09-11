const express = require('express')
const loginRoute = require('./routes/login')

const app = express()


//settings
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.set('view engine','ejs')

//path
app.use('/',express.static(__dirname+'/Public'))


//route
app.use('/login',loginRoute)



app.get('/',(req,res)=>{

    res.render('index')
})

app.listen(3000,()=>{console.log("Running....")})