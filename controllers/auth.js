const Pool = require('pg').Pool;
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
    pool.query('SELECT email FROM students WHERE email = $1', [email], async (error, results) => {
      if (error) {
        throw error
      }
      
      console.log('result:', results.rows);
      console.log('results length ' , results.rows.length);

      if (results.rows.length > 0){
        
        return res.render('register', {message: '*Цей email вже використовується'});

      } 
       if (password !== cpassword){
          return res.render('register', {message: '*Паролі не збігаються'});
      }
     
      let hashPassword = await bcrypt.hash(password, 8);
      console.log(hashPassword);
       // add database insert into

      pool.query('INSERT INTO students (fname, lname, email, password) VALUES ($1,$2,$3,$4)', [fname, lname, email, hashPassword ], (error,results) =>{
        if (error){
          throw error;
        } else {
          console.log("result: ", results);

         return res.render('login');
        }
      })
  
      
    });    
}