const User = require('../models/User');
const cryptojs = require('crypto-js');
const jwt = require('jsonwebtoken');

module.exports = {

createUser: async (req,res,next) => {

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: cryptojs.AES.encrypt(req.body.password,process.env.SECRET_KEY)
    })

    try {
        await newUser.save();
        res.status(201).json({status: true, message:'User Created'});
    } catch (error) {
        return next(error)
    }
},

loginUser: async (req,res,next) => {

    try {
        const user = await User.findOne({email: req.body.email});
        if (!user) {
            return res.status(404).json({status:false,message:'User not found !'});
        }
        const decryptedPassword = cryptojs.AES.decrypt(user.password,process.env.SECRET_KEY);
        const decryptedString = decryptedPassword.toString(cryptojs.enc.Utf8);

        if(decryptedString!== req.body.password){
            return res.status(401).json({status:false,message:'wrong password !'});
        }
        const userToken = jwt.sign({id: user._id},process.env.JWT_SECRET,{expiresIn: '21d'});
        res.status(200).json({status:true, id: user._id, token: userToken});
    } catch (error) {
        return next(error);
    }

},

}