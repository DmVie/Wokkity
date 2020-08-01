const User = require('../models/User');
const jwt = require('jsonwebtoken');

const admin = require('../firebase-admin');

const authGuard = async (req, res, next) => {
  try {
    // If the user has a session cookie then pull it
    console.log('does this run?')
    const cookieToken = req.cookies['auth_token'];
    let user;
    // console.log('cookie token ', cookieToken);

    if(!cookieToken) {
      // Then they must have just signed in / up via google providers
      // pull the google token
      admin.auth().verifyIdToken(req.body.token)          
        .then(async (decodedToken) => {
          console.log('we\'re passing through here....')
          console.log('The decoded id ', decodedToken.uid)
          let uid = decodedToken.uid;
          if(!uid) throw new Error('ID required');
          console.log('the req.body ',  req.body)
          const reqUser = {
            thirdPartyUid: uid,
            username: req.body.username,
            email: req.body.email,
            avatar: req.body.avatar || null
          }
          // check if they exist in our db already
          user = await User.findByCredentials(uid, reqUser.email);
          // console.log('existing user ', user);
          if(!user) {
            // This case catches a user who's verified by google but doesn't have an account with us in mongodb - currently not known to us
            user = new User(reqUser);
          }
          const token = user.createAuthToken()
          // Add the token to their list of tokens
          user.tokens = [...user.tokens, { token }]
          // create a cookie
          res.cookie('auth_token', token);
          // console.log('can i see my cookie please? ', res.cookies);
          // Add these fields to the request object so that the routes have access to the users details
          req.user = user;
          req.token = token;
          // console.log(' the request user ', req.user);
          // console.log(' the req token ', req.token)
          await user.save()
          next()
        })
        .catch((e) => res.status(401).send(e.message))
    }else { // else there is a cookie token
      // In which case verify the token and extract the id
      const verifiedToken = jwt.verify(cookieToken, process.env.JWT_SECRET);
      // console.log('The verified token ', verifiedToken)
      const id = verifiedToken.id;
      // console.log('the id from the cookie ', id)
      // check to see if user already exists 
      const verifiedUser = await User.findOne({thirdPartyUid: id, 'tokens.token': cookieToken});
      // console.log('The verified user ', verifiedUser)
      if(!verifiedUser)  return res.status(401).send('Unable to authenticate...');
      // if the user is verified
      req.user = verifiedUser;
      req.token = cookieToken;
      next();
    }
  } catch (e) {
    res.status(500).send(e.message)
  }
}


module.exports = authGuard