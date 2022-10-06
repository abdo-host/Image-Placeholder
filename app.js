const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const url = require('url');

const indexRouter = require('./routes/index');
const imagesRouter = require('./routes/images');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'storage')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use(async (req, res, next) => {
    res.locals = {
        fullUrl: () => {
            return url.format({
                protocol: req.protocol,
                host: req.get('host'),
                pathname: req.originalUrl
            });
        }
    }
    next();
});

app.use('/', indexRouter);
app.use('/create', imagesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
