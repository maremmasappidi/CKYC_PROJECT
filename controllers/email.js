// const Email = require("../models/email");
// //const bcrypt=require('bcryptjs');
// const nodemailer=require('nodemailer');
// const signup = require("../models/signup");

// // For Email Verification:

// const sendVerificationMail =async (email,customerId)=>{
//   try{
//   const transporter = nodemailer.createTransport({
//    // service: 'Gmail',
//    host:'smtp.gmail.com',
//    port:587,
//    secure:false,
//    requireTLS:true,
//     auth: {
//       user: 'akhivelpoor@gmail.com',
//       pass: 'fvltswqnypwtreai',
//     },
//   });
//   const mailOptions = {
//     from: 'akhivelpoor@gmail.com',
//     to: email,
//     subject: 'Email Verification',
//     text: `Click the following link to verify your email: http://localhost:8089/verify/${customerId}`,
//   };
//   transporter.sendMail(mailOptions,(error,info)=>{
//  if(error){
//   console.log(error);
//  }else{
//   console.log('Email has been sent:-',info.response);
//  }
//   });

// }catch(error){
//   console.log(error.message);
// }
// }

// exports.SignUpDetails = async (req, res) => {
//  const Customer = Email(
//  req.body,
//  );
//  await Email.findOne({ email: req.body.email}).then((data) => {
//      if (!data) {
//        const error=Customer.validateSync();
//        if(error){
//         return res.status(400).json(error.message);
//      }
//         else if(req.body.password !== req.body.repeatPassword){
//            return res.status(400).send('Password do not Match!');
//          }
//          sendVerificationMail(req.body.email, Customer._id);
//          Customer.save();
//         res.status(201).json({ message: 'customer registered successfully' });
//      }
//      else{
//         res.status(208).send({message:"Customer Existed"});
//          console.log(data + " existing")
//      }
//  }).catch(err => {
//    res.status(500).send({
//      message:
//        err.message || "Some error occurred while Signup."
//    });
//  });
 
// }

// exports.emailVerification = async (req, res) => {
//     try {
//       const {customerId}=req.body;
//      const updateInfo = await si.updateOne({_id:req.query.id},{$set:{isVerified:1}});
//      console.log(updateInfo);
//      console.log(customerId+"************************************")
//      //console.log(req.query.id+"*************************************");
//      res.status(200).send('Email Verified Successfully');
//      //res.render('');
//     } catch (error) {
//       console.error('Error during email verification:', error);
//       res.status(500).json({ error: 'An error occurred during email verification' });
//     }
//   };