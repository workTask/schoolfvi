const express = require("express")
const bodyParser=require("body-parser")
//for dir
const path = require("path")
const port= process.env.PORT || 5000
const publicDir = path.join(__dirname, './public')
//for dir
const app = express()


app.use(express.static(publicDir))
//console.log(__dirname)
//************ */
app.use(bodyParser.urlencoded({extended:true}))

//connect .hbs file
app.set('view engine', 'hbs')

//add pages and use pages
app.get('/', (req,res) => {
   res.render('index')
})
app.get('/register', (req,res) => {
    res.render('register')
}) 
app.post('/register', (req,res) => {
    console.log(req.body)
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
