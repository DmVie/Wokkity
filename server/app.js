const express = require('express');

const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 5000;
require('./db-connect');




app.listen(PORT, () => {
  console.log('Ole cloth ears is listening on port ', PORT);
})