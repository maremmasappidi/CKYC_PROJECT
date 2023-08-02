const mongoose=require('mongoose');
const documentSchema = new mongoose.Schema({
       
    panNumber:{
        type:String,
        unique: true,
        validate: {
            validator: function (pan) {
              // PAN number regex pattern
              const panRegex = /^([A-Z]{5})(\d{4})([A-Z]{1})$/;
              return panRegex.test(pan);
            },
            message: 'Invalid PAN number',
          },
         required:[true,"PAN number is required"],
        
        },

    casteCertificate:{
        type:String,
        required: true,
        
    },

    incomeCertificate:{
        type:String,
        required: true,
        
    }
,
    pan:{
        type:String,
        required: true,
    },

    aadhar:{
        type:String,
        required:true
    }
});
const Documents=mongoose.model('Documents', documentSchema);
module.exports=Documents;