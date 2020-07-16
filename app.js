const express = require("express");
const bodyParser=require("body-parser");
require('dotenv').config();
//for dir
const path = require("path");


const port= process.env.PORT;
const publicDir = path.join(__dirname, './public');

//for dir
const app = express();
//



app.use(express.static(publicDir));

//console.log(__dirname)
//************ */
app.use(bodyParser.urlencoded({extended:true}));

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

//connect .hbs file
app.set('view engine', 'hbs');
///
//app.post('/users', db.addUser);
app.listen(port, (req, res)=>{
 console.log(`Server start ${port}`)
});
//************************************* */
