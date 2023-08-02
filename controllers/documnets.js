const Documents=require('../models/document');
const customerDocuments=async(req,res)=>{
    const documnetData= Documents(
        req.body
    )
    if(req.files){
        
        documnetData.pan=req.files.pan[0].filename,
        documnetData.aadhar=req.files.aadhar[0].filename,
        documnetData.casteCertificate=req.files.casteCertificate[0].filename,
        documnetData.incomeCertificate=req.files.incomeCertificate[0].filename
      }
      console.log(documnetData + "documents");
      await Documents.findOne({panNumber: req.body.panNumber}).then((data) => {
          if (!data) {
            const error=documnetData.validateSync();
              if(error){
                console.log(error.length)
                return res.status(400).json(error)
              }
              documnetData.save();
              //res.status(201).send(newCustomer);
              res.render('declaration');
              console.log(documnetData + " saved documents")
          }
          else{
             res.status(208).send({message:"Documents already Existed"});
              console.log(data + " Already Existed")
          }
      }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while Applying."
        });
      });
      
    }

module.exports={
    customerDocuments
}
    
