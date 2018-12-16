'use strict';

const express = require('express');
const bodyParser = require('body-parser');
var  User = require('./schema').model;
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('./config');
const corsMiddleWare = require('./corsMiddleWare');



// App
const app = express();
app.use(bodyParser.json());



//enable CORS
app.use(corsMiddleWare);


app.post('/register', (req, res) => {
  const {
    username,
    password
  } = req.body;

  const user = new User({
    username,
    password
  })

  const payload = {
    iss: req.hostname,
    sub: user._id
  }
  jwt.sign(payload, config.TOKEN_SECRET, {}, function (err, token) {
    if (!err) {
      user.save((err, data) => {
        if (!err) {
          res.send(200, token);
        } else {
          res.send(500,err);
        }

      })
    } else {
      res.send(500,err);
    }

  })
})

app.post('/login', (req, res) => {
  const {
    username,
    password
  } = req.body;

 
  User.findOne({username:username},(err, data) => { 
    
    if (!err) {

      if(data!==null){
        //user is there lets check the password
       bcrypt.compare(password,data.password)
       .then(isAuthenticated=>{
        if(isAuthenticated){
          const payload = {
            iss: req.hostname,
            sub: data._id
          }
          jwt.sign(payload, config.TOKEN_SECRET, {}, function (err, token) {
            if (!err) {
              res.send(200, token);
            } else {
              res.send(500);
            }
          })
        }
        else{
          throw new Error("Auth Error")
        }
       })
       .catch(err=>res.sendStatus(401));
        
      }
      else{
        res.send(404);
      }
     

    } else {
      res.send(500,err);
    }

  })
})






app.get('/', (req, res) => {
  res.send('Auth API for SLOMO V1')
});
mongoose.connect(config.MONGO_URL)
app.listen(config.PORT);