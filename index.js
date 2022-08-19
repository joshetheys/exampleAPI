// Importing modules
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/dbconn');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


// Express app
const app = express();
app.use(express.static('views'))
app.use(express.json())
// Set header
app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
});
app.use(cors({
    origin: ['http://127.0.0.1:8080', 'http://localhost:8080'],
    credentials: true
 }));
// credentials will allow you to access the cookie on your fetch(url, 
{
credentials: 'include'
}
// Express router
const router = express.Router();

// Configuration 
// const port = parseInt(process.env.PORT) || 4000;
app.use(router, cors(), express.json(), cookieParser(),  bodyParser.urlencoded({ extended: true }));
// app.listen(port, ()=> {console.log(`Server is running on port ${port}`)});

const port = 3000;
app.set(("port"), process.env.PORT || 3000)
// const userRoute = require ("../routes/userRoute");
// app.use("/users", userRoute);
app.listen(app.get("port"), ()=>{
    console.log(`Server running at ${port}`)
});

app.listen(port);



router.get('/', (req, res) => {
    res.json({msg: "home page dude"})
  })




  app.get('/about', (req, res) => {
    res.send('about page')
  })















// GET ALL USERS
router.get('/users', (req, res)=> {
    // Query
    const strQry = 
    `
    SELECT userId, fullname, email, userpassword, userRole, phone_number, join_date
    FROM users;
    `;
    db.query(strQry, (err, results)=> {
        if(err) throw err;
        res.setHeader('Access-Control-Allow-Origin','*')
        res.json({
            status: 200,
            users: results
        })
    })
});

// GET ONE USER
router.get('/users/:userId', (req, res)=> {
     // Query
    const strQry = 
    `SELECT userId, fullname, email, userpassword, userRole, phone_number, join_date, cart
    FROM users
    WHERE userId = ?;
    `;
    db.query(strQry, [req.params.userId], (err, results) => {
        if(err) throw err;
        res.setHeader('Access-Control-Allow-Origin','*')
        res.json({
            status: 204,
            results: (results.length < 1) ? "Unfortuanately there was no data found for the user id." : results
        })
    })
});


module.exports = {
    devServer: {
        Proxy: '*'
    }
}
