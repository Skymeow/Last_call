require('dotenv').config({ silent: true });
const express        = require('express');
const bodyParser     = require('body-parser');
const logger         = require('morgan');
const path           = require('path');
const methodOverride = require('method-override');
const yelp           = require('yelp-fusion');

const app            = express();
const PORT           = process.env.PORT || 3000;
// config morgan
app.use(logger('dev'));

// config path
app.use(express.static(path.join(__dirname, 'public')));

// config body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// config method ovveride
app.use(methodOverride('_method'));

// config ejs
app.set('view engine', 'ejs');

// link to resources
app.use('/', require('./resources'));

// config local host port
app.listen(PORT, () => {
  console.log('Server is listening on', PORT);
});

// export app for test suite
module.exports = app;