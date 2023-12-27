const express = require('express');
const path = require('path');
const router = require('./routes/index');

const app = express();

app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('morgan')('dev'));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use('/', router);
app.use((req, res) => {
  res.render("pages/error", {notFound: true})
})

module.exports = app;
