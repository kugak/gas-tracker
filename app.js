const express = require('express');
const exphbs = require('express-handlebars');
var Handlebars = require('handlebars');
var MomentHandler = require('handlebars.moment');
var helpers = require('handlebars-helpers');
const bodyParser = require('body-parser');
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

// handlebars-helper middleware
var helpers = require('handlebars-helpers')();

// moment format
MomentHandler.registerHelpers(Handlebars); // <- this is the important line

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// index route
app.get('/', (req, res) => {
  Tracker.find({})
    .sort({ date: 'desc' })
    .then(records => {
      res.render('index', { records: records });
    });
});

// process form
app.post('/', (req, res) => {
  console.log(req.body);
  let errors = [];

  if (errors.length > 0) {
    res.render('/', {
      errors: errors,
      litres: req.body.litres,
      amount: req.body.amount,
      endkm: req.body.endkm,
      date: req.body.date
    });
  } else {
    const newRecord = {
      litres: req.body.litres,
      amount: req.body.amount,
      endkm: req.body.endkm,
      date: req.body.date
    };
    new Tracker(newRecord).save().then(record => {
      res.redirect('/');
    });
  }
});

const port = 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
