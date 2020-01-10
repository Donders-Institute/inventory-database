const createError = require("http-errors");
const express = require("express");
const session = require('express-session');
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const routes = require('./routes/index');
const modAuthentication = require('./routes/mod_authentication');
const modGetItems = require('./routes/mod_getItems');
const modAddItems = require('./routes/mod_addItems');
const modGetCategories = require('./routes/mod_getCategories');
const modCountCategories = require('./routes/mod_countCategories');
const modAddCategories = require('./routes/mod_addCategories');
const modGetUsers = require('./routes/mod_getUsers');

var app = express();

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'frontend')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 8000;

/* session property
   - rolling expiration upon access
   - save newly initiated session right into the store
   - delete session from story when unset
   - cookie age: 4 hours (w/ rolling expiration)
   - session data store: memory on the server
*/
app.use(session({
    secret: 'somesecret',
    resave: true,
    rolling: true,
    saveUninitialized: true,
    unset: 'destroy',
    name: 'inventory-database-ui.sid',
    cookie: {
        httpOnly: false,
        maxAge: 4 * 3600 * 1000
    }
}));

// Serve static frontend files
app.use('/', routes);

// POST Authentication
app.post('/login', modAuthentication.authenticateUser);
app.post('/logout', modAuthentication.logoutUser);

// GET Obtain list of items
app.get('/get_items', modAuthentication.isAuthenticated, modGetItems.getItems);

// POST Add a list of items
app.post('/add_items', modAuthentication.isAuthenticated, modAddItems.addItems);

// GET Obtain list of categories
app.get('/get_categories', modAuthentication.isAuthenticated, modGetCategories.getCategories);

// GET Count categories
app.get('/count_categories', modAuthentication.isAuthenticated, modCountCategories.countCategories);

// POST Add a list of categories
app.post('/add_categories', modAuthentication.isAuthenticated, modAddCategories.addCategories);

// GET Obtain list of users
app.get('/get_users', modAuthentication.isAuthenticated, modGetUsers.getUsers);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// Error handlers

// Development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// Production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

module.exports = app;