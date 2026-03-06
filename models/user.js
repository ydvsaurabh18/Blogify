 const { createHmac, randomBytes } = require('node:crypto');
 const { createTokenForUser } = require('../services/authentication');


 
// const { Schema, Model } = require('mongoose')
const mongoose = require('mongoose');
const { Schema } = mongoose;

  const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,

    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    salt:{
        type: String,
        
    },
     password:{
        type: String,
        required: true,
    
    },
    profileImageURL: {
      type: String,
       default: "/Images/default.png", 
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    }
  },
  { timestamps: true }
);

  userSchema.pre("save", function (next)  {
     const user = this; //pointing to current user

     if(!user.isModified("password")) return;

   const salt = randomBytes(16).toString(); //har user ki random 16 digit ki key hogi
     const hashedPassword = createHmac('sha256', salt).update(user.password).digest('hex');
     this.salt=salt;
      this.password = hashedPassword;

      next()
  })

  userSchema.static('matchPasswordAndGenerateToken', async function(email, password) {
     const user = await this.findOne({ email });
     if(!user) throw new Error('User not found!');
     
     const salt = user.salt;
     const hashedPassword = user.password; 
     const userProvidedHash = createHmac("sha256", salt)
     .update(password)
     .digest("hex");
      
    if(hashedPassword !== userProvidedHash)throw new Error("Incorrect Password");

     //return user;
      const token = createTokenForUser(user);
      return token;
  })

const User = mongoose.model('user', userSchema);
 module.exports = User;