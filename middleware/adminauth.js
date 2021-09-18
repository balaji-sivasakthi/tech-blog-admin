const jwt = require('jsonwebtoken')


function auth(req,res,next){

    const token = req.cookies['access_token_admin']
    jwt.verify(token,'latrosoft',(err,result)=>{
        if(!err){
            const name = result.data.name;
            console.log(name);
            res.cookie('admin_name',name)
            next()
        }else{
            res.redirect('/loginAdmin')
        }
      
    })

}
module.exports = auth