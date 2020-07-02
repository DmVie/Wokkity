const mongoose = require('mongoose');

  mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then((conn) => {
    console.log(conn.connections[0].readyState === 1 ? 'Status: Connected' : "Status: Unable to connect")
})
  .catch((e) => console.log(e.message))