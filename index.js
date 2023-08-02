const express=require('express');
const { conn } = require('./dbconfig');
const { router } = require('./routes/route');
//const { customerRoute } = require('./routes/customerRoute');
const app=express();
app.set('view engine', 'ejs');
app.set('views','./views');

const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
require('dotenv').config();
app.use(express.json());
conn();
app.use('/',router);
app.use('/uploads',express.static('public'));
//app.use('/aa',customerRoute);

app.get('/', (req, res) => {
    res.render('home');
  });
const port = process.env.PORT || 8082;

app.listen(port, () => { console.log(`server running on port ${port}`) });
