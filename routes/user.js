 //const { Router } = require('express');

 const User = require('../models/user');
 const express = require('express');
const router = express.Router();

// const { model } = requires("mongoose");



  router.get('/signin', (req, res) => {
    return res.render('signin');
  });
  
   router.get('/signup', (req, res) => {
    return res.render('signup');
  });

  router.post('/signin', async(req, res)=>{
    const { email, password } = req.body;
    // console.log(email, password);
    //const user = await User.matchPasswordAndGenerateToken(email, password);
    try{
    const token = await User.matchPasswordAndGenerateToken(email, password);

    //console.log('token', token); //printing token on terminal
    //return res.redirect("/");
    return res.cookie('token', token).redirect("/");
    } catch(error){
      return res.render("signin", {
        error: "Incorrect Email or Password",
      });
    }
  });

  //logout routr
  router.get('/logout', async(req, res)=>{
    res.clearCookie('token').redirect("/");
  })

  router.post('/signup', async(req, res) => {
     const { fullName, email, password } = req.body;
     await User.create({
        fullName,
        email,
        password,
     });
     return res.redirect("/");
  })
  module.exports = router;