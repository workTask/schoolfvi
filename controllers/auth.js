const {Pool} = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


let pool;
//if (process.env.DATABASE_URL){
 try {
  const URL = process.env.HEROKU_DATABASE_URL;
  
  exports.pool = new Pool ({connectionString:URL, ssl:false});
 } catch (error) {
   console.log(error);
}
//} else {
  try {
  // pool = new Pool({
  // user: process.env.DATABASE_USER,
  // host: process.env.DATABASE_HOST,
  //   database: process.env.DATABASE,
  //    password: process.env.DATABASE_PASSWORD,
  //    port: process.env.DATABASE_PORT, 
  //  });
  } catch (error) {
    console.log(error);
  }
//}
//auth login
exports.login = async (req,res) =>{
  const {email, password} = req.body
  try {
    if (!email || !password){
      return res.status(400).render('login', {message:'Введіть email і пароль'});
    }
    pool.query('SELECT * FROM students WHERE email = $1', [email], async (error, results) => {
      if (error) {
        throw error
      }
      //console.log('*********',results.rows);
      //console.log('*******************',results.rows[0].password);
      if(!results || !(await bcrypt.compare(password,results.rows[0].password))){
        res.status(401).render('login', {message: 'Цей email нe зареєстрований'})
      } else {
        const id = results.rows[0].id; 

        const token = jwt.sign({id:id}, process.env.JWT_SECRET,{ expiresIn: process.env.JWT_EXPIRES_IN });
        //console.log('*********token ', token)    
        const cookieOption = {
                  expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES*24*60*60),
          httpOnly: true
       }
        res.cookie('JWT',token,cookieOption);
        const fname = results.rows[0].fname;
        res.status(200).render('userpage', {user: ' '+fname});
      }
    })
  } catch (error) {
    console.log(error);
  }
}
exports.register = (req,res) => {
   // console.log(req.body);
    const { fname, lname, email, password, cpassword} = req.body
    //'SELECT * FROM users WHERE name = $1', 'eboko1@gmail.com')
    pool.query('SELECT email FROM students WHERE email = $1', [email], async (error, results) => {
      if (error) {
        throw error
      }
      //console.log('result:', results.rows);
      //console.log('results length ', results.rows.length);

      if (results.rows.length > 0){
        return res.render('register', {message: '*Цей email вже використовується'});
      } 
       if (password !== cpassword){
          return res.render('register', {message: '*Паролі не збігаються'});
      }
     
      let hashPassword = await bcrypt.hash(password, 8);
     // console.log('hashpassword: ',hashPassword);
       // add database insert into

      pool.query('INSERT INTO students (fname, lname, email, password) VALUES ($1,$2,$3,$4)', [fname, lname, email, hashPassword ], (error,results) =>{
        if (error){
          throw error;
        } else {
        //console.log("result: ", results);
          //{user:''+fname+' '+ lname}
          return res.render('login');
        }
      }) 
    });    
}