var cors = require('cors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/login', (req, res) => {
    res.send({
      token: 'test123'
    });
});

app.listen(8081, () => console.log('API is running on http://localhost:8081/login'));

module.exports = app;
