const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {type: String, require:true},
  email: {type: String, require:true, unique: true},
  password: {type: String, require:true},
  profile: {type: String, default:'https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg'},
})

module.exports = mongoose.model('User',userSchema);