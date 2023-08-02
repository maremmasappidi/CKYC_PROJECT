var express = require('express');
var router = express();
const customers=require('../models/customer');
const signups = require('../models/signup');
//const email=require('../models/email');
const documents=require('../models/document')
const upload=require('../middleware/upload');
const bodyParser=require('body-parser');
const { submitForm } = require('../controllers/declaration');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));
const {getDetails,getDetailsAll,insertCustomerDetails, updateCustomer, deleteCustomerById, updatingCustomer } = require('../controllers/customer');

const {customerSignUp,verifyLogin,emailVerification} = require('../controllers/signup');
const { customerDocuments } = require('../controllers/documnets');
//const { emailVerification, SignUpDetails } = require('../controllers/email');
const signup = require('../models/signup');
const fileUpload = require('..//middleware/documents');

router.set('view engine', 'ejs');
router.set('views','./views');

//Signup:

router.get('/signup',(req,res)=>{
    res.render('signup');
});
router.post('/signup',upload,customerSignUp);
router.get('/verify/:customerId',upload,emailVerification);

//application:

router.get("/application",(req,res)=>{
    res.render('application');
})
router.post("/application",upload,insertCustomerDetails);

//documents:
router.get('/document',(req,res)=>{
    res.render('document');
});
router.post("/document",fileUpload,customerDocuments);

//Declaration:

router.get("/declaration",(req,res)=>{
    res.render('declaration');
})
router.post("/declaration",upload,submitForm)

//Login:
// router.get('/success', verifyLogin){
//     res.render('success');
// };
router.get('/login',(req,res)=>{
res.render('login');
});
router.post('/login',upload,verifyLogin);


//***update */
router.get("/update",(req,res)=>{
    res.render('update');
})
router.post("/update",upload,updateCustomer)
//*********updating */
router.post("/updating",upload,updatingCustomer)

//**********all */
router.get("/all",(req,res)=>{
    res.render('all');
})
router.post("/all",upload,getDetailsAll )
//***********delete */
router.get("/delete",(req,res)=>{
    res.render('delete');
})
router.post("/delete",upload,deleteCustomerById)
router.get('/:id',getDetails )
router.get("/all",upload,getDetailsAll )
  
// router.get('/:id',getDetails );
// router.get("/all",getDetailsAll );
// router.patch("/:id",updateCustomer );
// router.delete('/:id',deleteCustomerById);





exports.router = router;
