const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const recipeRouter = require('./routes/recipeRoutes');
const userRouter = require('./routes/userRoutes');
const commentRouter = require('./routes/commentRoutes');


require('dotenv').config();

require('./firebase-admin');

require('./db-connect');

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/api/v1/recipes', recipeRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/comments', commentRouter)

app.use(express.static(path.join(__dirname, '..', 'build')));
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

const PORT = process.env.PORT || 9000
app.listen(PORT, () => console.log('Ole cloth ears is listening on port ', PORT));