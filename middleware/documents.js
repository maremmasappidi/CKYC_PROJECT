const multer=require('multer');
const path = require('path');
//Storage Engine:

const storage=multer.diskStorage({
  destination:function(req,file,cb){
    if(file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png'){
      cb(null,path.join(__dirname,'../public/uploads'));
    }
      else{
        cb(null,path.join(__dirname,'../public/documents'));
      }
  },
  filename:function(req,file,cb){
      let ext= path.extname(file.originalname)
      cb(null,file.fieldname +"-"+ Date.now()+ext)
//return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
}
});
const  fileFilter=(req,file,cb)=>{
  if(file.fieldname == 'aadhar'){
    (file.mimetype =="image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg" )
    ?cb(null,true)
    :cb(null,false)
  }
  else if(file.fieldname == 'pan'){
    (file.mimetype =="image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg" )
    ?cb(null,true)
    :cb(null,false)
  }
  else if(file.fieldname=='casteCertificate'){
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files are allowed'));
    }
    cb(null, true);
    
  }
  else if(file.fieldname=='incomeCertificate'){
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files are allowed'));
    }
    cb(null, true);
    
  }
}

const fileUpload=multer({
    storage:storage,
    fileFilter:fileFilter,
    limits:{
      fileSize:1024*500
    }
}).fields([{name:'aadhar',maxCount:1},{name:'pan',maxCount:1},{name:'casteCertificate',maxCount:1},{name:'incomeCertificate',maxCount:1}])
module.exports= fileUpload;
