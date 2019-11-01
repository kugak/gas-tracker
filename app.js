const express = require('express');
const exphbs = require('express-handlebars');

// initialize
const app = express();

// handlebars middlewares
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main'
  })
);
app.set('view engine', 'handlebars');

const port = 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
