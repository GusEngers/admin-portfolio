const express = require('express');
const path = require('path');

const app = express();

app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require('morgan')('dev'));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('view options', { openDelimiter: '[', closeDelimiter: ']' });
app.set('views', __dirname + '/views');

module.exports = app;
