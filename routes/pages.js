const express = require('express');

const router = express.Router();

//add pages and use pages
router.get('/', (req,res) => {
   //res.render('index', {user: 'Vika'})
  res.render('index')
});
router.get('/login', (req,res) => {
    res.render('login')
 }) ;
router.get('/register', (req,res) => {
   res.render('register')
}) ;
router.get('/userpage', (req,res) => {
   res.render('userpage')
}) ;



module.exports = router;