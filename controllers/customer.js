const { resolveHostname } = require("nodemailer/lib/shared");
const Customer = require("../models/customer");

//******* Insert: ***********

exports.insertCustomerDetails = async (req, res) => {

    const newCustomer = Customer(
        req.body,
    );
    if(req.files){
      newCustomer.proofOfAddress=req.files.proofOfAddress[0].filename,
      newCustomer.photo=req.files.photo[0].filename
    }
    console.log(newCustomer + "customer");
    await Customer.findOne({ documentNumber: req.body.documentNumber}).then((data) => {
        if (!data) {
          const error=newCustomer.validateSync();
            if(error){
              console.log(error.length)
              return res.status(400).json(error)
            }
          
            newCustomer.save();
            //res.status(201).send(newCustomer);
            res.render('document');
            console.log(newCustomer + " saved customer")
        }
        else{
           res.status(208).send({message:"Customer Existed"});
            console.log(data + " existing")
        }
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while Applying."
      });
    });
    
  }
 // ****Retrieve data: *******

 exports.getDetails=async (req, res) => {
  await Customer.findById(req.params.id).then(getCustomer=>{
     if (getCustomer){
     res.send(getCustomer);
     }
   else {
    res.status(404).send({ message: "Not found customer with id=" +req.params.id});
   }
 }).catch(err => {
   res.status(500).send({ message:err.message|| "Error retrieving customer with id=" +req.params.id });
 });  
   
 }


 //Get all:

 // exports.getDetailsAll= async (req,res)=> {
 //   await Customer.find({}).then(data => {
 //     res.send(data);
 //   })
 //   .catch(err => {
 //     res.status(500).send({
 //       message:
 //         err.message || "Some error occurred while retrieving customers."
 //     });
 //   }); 
 // };

 exports.getDetailsAll= async(req,res)=>{
   const {id}=req.body

    await Customer.findById(id).then(existingCustomer =>{
      if(existingCustomer){
        res.render("../views/getdetailsId",existingCustomer)
        
      }else{
      res.status(404).send(
        `Cannot update customer with id=${req.params.id} . customer was not found!`
        )
      }
     }).catch(err => {
       res.status(500).send({
         message:
          err.message ||"Some error occurred while updating."
       });
     });

    }













 


   //********* Update: **********

     exports.updateCustomer= async(req,res)=>{
      const {id}=req.body

       await Customer.findByIdAndUpdate(id).then(existingCustomer =>{
         if(existingCustomer){
           res.render("../views/updating",existingCustomer)
           
         }else{
         res.status(404).send(
           `Cannot update customer with id=${req.params.id} . customer was not found!`
           )
         }
        }).catch(err => {
          res.status(500).send({
            message:
             err.message ||"Some error occurred while updating."
          });
        });
 
       }
 

       exports.updatingCustomer= async(req,res)=>{
         const {id,existingCustomer}=req.body;
        await Customer.findByIdAndUpdate(id,{$set:(req.body)},{new:true}).then(updateduser =>{
 
           if(!updateduser){
   
             res.status(404).json("user not exists!");
   
           }
   
           updateduser.save();
           res.status(200).send(updateduser)
   
         });  
   
         }
 
    

// *****Delete:********

exports.deleteCustomerById = async(req, res)=> {
try {
 const {id}=req.body;
 // Use Mongoose to find and delete the book by its ID
 const deletedBook = await Customer.findByIdAndDelete(id);

 if (!deletedBook) {
   return res.send('<h2>user not found</h2>');
 }

 res.send('<h2>user  deleted successfully</h2>');
} catch (err) {
 res.status(500).send('<h2>Error deleting the user</h2>');
}
}


//Declaration:

exports.Declaration =async(req,res)=>{
  try{
    res.render('success');
  }catch(error){
    console.log(error);
  }
}