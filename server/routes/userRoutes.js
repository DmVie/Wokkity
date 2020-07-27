const express = require('express');

const authGuard = require('../middleware/authGuard')
const router = new express.Router();

router.post('/verifyUser', authGuard, async (req, res) => {
  return res.status(200).send({
    status: 'Authorized'
  })
})

router.get('/signout', authGuard, async (req, res) => {
  // we've verified their token in authGuard, now remove it.
  console.log('sign out user ', req.user);
  console.log('token to sign out ', req.token);
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