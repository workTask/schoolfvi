const express = require("express");
const bodyParser=require("body-parser");
//for dir
const path = require("path");
//db
const db = require('./user_db');

const port= process.env.PORT || 5000;
const publicDir = path.join(__dirname, './public');

//for dir
const app = express();



app.use(express.static(publicDir));

//console.log(__dirname)
//************ */
app.use(bodyParser.urlencoded({extended:true}));

//connect .hbs file
app.set('view engine', 'hbs');
///
app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.addUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)



//add pages and use pages
app.get('/', (req,res) => {
  res.render('index')
})
app.get('/register', (req,res) => {
   res.render('register')
}) 
app.post('/register', (req,res) => {

   //console.log(req.body)
   //console.log(res.body)
}) 
app.get('/login', (req,res) => {
    res.render('login')
})  
app.post('/login', (req,res) => {
    console.log(req.body)
})  
app.listen(port, (req, res)=>{
 console.log("Server start")
})
//************************************* */
