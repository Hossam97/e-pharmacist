const express = require('express');
const app = express();
const usersRouter = require('./routes/usersRouter');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const appError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

app.use(bodyParser.json());

app.use(morgan('dev'));

app.use('/api/v1/users', usersRouter);

app.all('*', (req, res, next) => {
    next(new appError(`Can't find ${req.originalUrl} on the server`, 404))
})
app.use(globalErrorHandler);
module.exports = app;