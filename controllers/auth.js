
const Pool = require('pg').Pool


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

    pool.query('SELECT email FROM students WHERE email = $1',[email], async (error, results) => {
      if (error) {
        throw error
      }
      ///response.status(201).send(`User added with ID: ${result.insertId}`)
      //res.status(201).json({ status: 'success', message: 'Student added.' });
      if (password !== cpassword){
          return res.render('register', {message: 'Password do not match'});
      }
    
    })

   // res.send ('Your registered');
}
