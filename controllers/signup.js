const signUp = require("../models/signup");
const bcrypt=require('bcryptjs');
const nodemailer=require('nodemailer');

const sendVerificationMail =async (email,customerId)=>{
  try{
  const transporter = nodemailer.createTransport({
   // service: 'Gmail',
   host:'smtp.gmail.com',
   port:587,
   secure:false,
   requireTLS:true,
    auth: {
      user: 'maremmasappidi@gmail.com',
      pass: 'idcxmbjwzmrqtgiw',
    },
  });
  const mailOptions = {
    from: 'maremmasappidi@gmail.com',
    to: email,
    subject: 'Email Verification',
    text: `Click the following link to verify your email: http://localhost:8089/verify/${customerId}`,
  };
  transporter.sendMail(mailOptions,(error,info)=>{
 if(error){
  console.log(error);
 }else{
  console.log('Email has been sent:-',info.response);
 }
  });

}catch(error){
  console.log(error.message);
}
}

//Signup Controller:

exports.customerSignUp = async (req, res) => {
const {userName,email,password,repeatPassword} = req.body;
 const hashPassword = await bcrypt.hash(password, 10)
 await signUp.findOne({ email: req.body.email}).then((data) => {
     if (!data) {
         if(password !== repeatPassword){
           return res.status(400).send('Password do not Match!');
         }
         const newCustomer=new signUp({userName,email,password:hashPassword})
         sendVerificationMail(email, newCustomer._id);
         newCustomer.save();
         res.status(201).send('Customer Registered Successfully');
         //res.render('application',{message:'Customer Registered Successfully'});
         console.log(newCustomer + " saved customer");
     }
     else{
        res.status(208).send({message:"Customer Existed"});
         console.log(data + " existing")
     }
 }).catch(err => {
   res.status(500).send({
     message:
       err.message || "Some error occurred while Signup."
   });
 });
}

exports.emailVerification = async (req, res) => {
  try {
    console.log(req.params.customerId);
   const updateInfo = await signUp.updateOne({_id:req.params.customerId},{$set:{isVerified:1}});
   console.log(updateInfo);
   //res.status(200).send('Email Verified Successfully');
   res.render('application');
  } catch (error) {
    console.error('Error during email verification:', error);
    res.status(500).json({ error: 'An error occurred during email verification' });
  }
};

// Login Controller:

exports.verifyLogin = async (req,res)=>{
try{
    const email =req.body.email;
    const password=req.body.password;
  await signUp.findOne({email:email}).then((customer)=>{
    if(customer){
      bcrypt.compare(password,customer.password,(err,result)=>{
        if(err){
         return  res.send(err);
        }if(result){
          res.render('customer');
        }else{
          res.send('Password is Incorrect')
        }
      });
    }else{
      res.send('Customer Doesnot exists');
    }
    })
  }catch(error){
    console.log(error)
  }
    }
  

  
