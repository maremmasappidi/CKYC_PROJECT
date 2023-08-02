const mongoose = require('mongoose');
const { customAlphabet } = require('nanoid');
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nanoid = customAlphabet(alphabet, 8);
const CustomerSchema =new mongoose.Schema({
    
  _id:{
    type:String,
    default: () => nanoid(),
    
  },
    fullName:{
        type:String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    dateOfBirth:{
        type:String,
        required:true,
        validate: {
            validator: function (value) {
              const currentDate = new Date();
              const eighteenYearsAgo = new Date();
              eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
              return new Date(value) < currentDate && new Date(value) <= eighteenYearsAgo;
            },
            message: 'DOB must be a date greater than 18 years above.'
          }   
    },
     gender:{type:String,
         enum:["Male","Female","Others" ]
    },
    nationality:{
        type:String,
        required:true,
        validate: {
            validator: function (value) {
              // Replace the array below with the nationalities you want to allow
              const allowedNationalities = ['India'];
              return allowedNationalities.includes(value);
            },
            message: 'Invalid nationality.'
          }
    },
    placeOfBirth:{
        type:String,
        required:true
    },
maritalStatus:{
    type:String,
    enum:["Married","Unmarried","Others"],
    required:true
},
fatherName:{
    type:String,
    required:true

},
//identity proof:

documentType:{
    type:String,
    enum:"Aadhar"||"Voterid"||"Pancard"||"Passport"||"Driving_License",
    required:true

    },
    documentNumber:
    {
        type:Number,
        required:true,
        unique:true,
        validate: {
            validator: function (value) {
              // Replace the validation logic based on your requirements
              return /^[A-Za-z0-9]+$/.test(value);
            },
            message: 'Invalid document number.'
          }
        },
    
    issuingAuthority:{
        type:String,
        required:true,
        validate: {
            validator: function (value) {
              // Replace the validation logic based on your requirements
              return /^[A-Za-z\s]+$/.test(value);
            },
            message: 'Invalid issuing authority.'
          }
    },
    expiryDate:
    {
        type:String,
        required:true,
        validate: {
            validator: function (value) {
              const currentDate = new Date();
              return new Date(value) > currentDate;
            },
            message: 'Expiry date must be in the future.'
          }
    },

    //Address Information:
    residentialAddress:
    {
        type:String,
      
        required:true, 
        validate: {
            validator: function (value) {
              // Replace the validation logic based on your requirements
              return value.trim().length > 0;
            },
            message: 'Invalid residential address.'
          }
  

    },
    proofOfAddress:{
        type:String,
        required:true
    },

//contact information:

phoneNumber:{
    type:String,
    required:[true,"Please enter your phone number"],
    minLength:[10,"Phone number must be 10 digits"],
    maxLength:[10,"Phone number must be 10 digits"],

},
email: {
    type: String,
    required: true,
    unique: true,
    validate: {
        validator: function (value) {
          // Replace the validation logic based on your requirements
          const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return regex.test(value);
        },
        message: 'Invalid email address.'
      }
  },

  //Photpgraph:

  photo:{
     type:String,
     required:true
   },
    
//financial information:

      occupation:{
        type:String,
        required:true
      },
      sourceOfFunds:{
        type:String,
        enum:["Employment-Income","Business-Income","Investments" ],
        required:true
      },
      annualIncome:
      {
        type:Number,
        required:true,
        validate: {
            validator: function (value) {
              // Replace the validation logic based on your requirements
              return value >= 100000;
            },
            message: 'Invalid annual income.'
          }
  
      },//Tax-related Information
      PAN:{
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
        
    }
});
 const Customer=mongoose.model('Customer', CustomerSchema);
 module.exports=Customer;
