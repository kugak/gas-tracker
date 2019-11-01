const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

// initialize
const app = express();

// db config
const db = require('./config/database');

// connect to mongoose
mongoose
  .connect(db.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// load tracker model
require('./models/Tracker');
const Tracker = mongoose.model('tracker');

// handlebars middlewares
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main'
  })
);
app.set('view engine', 'handlebars');

// index route
app.get('/', (req, res) => {
  res.render('index');
});

const port = 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
