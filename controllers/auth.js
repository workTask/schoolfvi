
const Pool = require('pg').Pool
const jwt = require ('jsonwebtoken');
const bcrypt = require('bcryptjs');


const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'school',
  password: '',
  port: 5432,
})

exports.register = (req,res) => {
    console.log(req.body);
    

    const { fname, lname, email, password, cpassword} = req.body
    //'SELECT * FROM users WHERE name = $1', 'eboko1@gmail.com')
    pool.query('SELECT email FROM students WHERE email = $1', [email], (error, results) => {
      if (error) {
        throw error
      }
      
      console.log('result:', results.rows);
      console.log('results length ' , results.rows.length);

      if (results.rows.length > 0){
        return res.render('register', {message: '*Цей email вже використовується'}); 

      }else if (password !== cpassword){
         return res.render('register', {message: '*Паролі не збігаються'});
        }
      // add database insert into
        var hashPassword = bcrypt.hash(password,10);
        console.log(hashPassword);
    });
    
    
   // res.send ('Your registered');
   res.render('login');


}
