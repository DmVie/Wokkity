var admin = require("firebase-admin");
const path = require('path')

console.log('dirname ', __dirname )
var serviceAccount = require(path.join(__dirname, '../serviceAccountKey.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://wokkiti.firebaseio.com"
})

module.exports = admin