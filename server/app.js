const express = require('express');
const path = require('path');
const app = express();
const recipeRouter = require('./routes/recipeRoutes');

require('dotenv').config();
require('./db-connect');
require('./mongodbSeed')

app.use(express.json());
app.use('/api/v1/recipes', recipeRouter);

app.use(express.static(path.join(__dirname, '..', 'build')));
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

const PORT = process.env.PORT || 9000
app.listen(PORT, () => console.log('Ole cloth ears is listening on port ', PORT));