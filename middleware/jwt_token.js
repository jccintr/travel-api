const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) => {
    const authHeader = req.headers.authorization;
    
    if(!authHeader){
       return res.status(401).json({status:false, message: 'Not authenticated'})
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token,process.env.JWT_SECRET,async(err,user)=>{
        if(err) {
            return res.status(401).json({status:false, message: 'Invalid token'})
        }
        req.user = user;
        next();
    })

}

module.exports = {verifyToken};