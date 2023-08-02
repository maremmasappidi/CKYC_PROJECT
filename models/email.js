const mongoose = require('mongoose');
const emailSchema =new mongoose.Schema({

    userName:{
      type:String,
      required:true
    },
    email:{
        type:String,
        required: true,
        validate: {
            validator: function (value) {
              // Replace the validation logic based on your requirements
              const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              return regex.test(value);
            },
            message: 'Invalid email address.'
          }
    },
    password:{
        type:String,
        required:true,
        minLength:8, 
        validate:{
            validator: function (password) {
              const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/;
              return passwordPattern.test(password); 
        }, 
        message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
     }, 
    },
    isVerified:{
        type:Number,
        default:0,
    },
});

module.exports=mongoose.model('Email',emailSchema);
 
