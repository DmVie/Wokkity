const express = require('express');
const { body, validationResult } = require('express-validator');


const authGuard = require('../middleware/authGuard');
const User = require('../models/User');
const router = new express.Router();

router.post('/verifyUser', authGuard, async (req, res) => {
  return res.status(200).send({
    status: 'Authorized'
  })
})

router.post('/checkUsername', [
  body('username')
  .isLength({min: 3})
  .trim()
  .escape()
], async (req, res) => {

  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  console.log('The request body ', req.body)

  // Uppercase first char of username.
  const arr = Array.from((req.body.username).toLowerCase());
  console.log(arr);
  arr.splice(0,1, req.body.username.charAt(0).toUpperCase());
  const username = arr.join("");

  console.log('username server side ', username)

  try {
    const result = await User.findOne({username})
    result ?  res.status(409).send({error: 'This username is already taken'}) : res.status(200).send({username});
  } catch (e) {
    res.status(500).send(e.message)
  }
 
})

router.get('/signout', authGuard, async (req, res) => {
  try {
    // remove the token 
    req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
    await req.user.save();
    res.clearCookie('auth_token');
    return res.status(200).send({
      status: true
    })
  } catch (e) {
    res.status(500).send(e.message);
  }

})


module.exports = router