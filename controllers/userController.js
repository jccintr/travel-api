const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports = {

deleteUser: async (req,res,next) => {

    try {
        
        await User.findByIdAndDelete(req.user.id);

        res.status(200).json({status:true, message: 'User Deleted'});
    } catch (error) {
        return next(error);
    }

},

getUser: async (req,res,next) => {
       const userId = req.user.id;
       
       try {
          const user = await User.findById(userId,{password:0,__v:0});
          if(!user){
             res.status(404).json({status:false, message: 'User not fount'});
          }

          res.status(200).json(user);
       } catch (error) {
          return next(error);
       }


},

}