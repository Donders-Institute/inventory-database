const USERNAME = process.env.USERNAME || "user";
const PASSWORD = process.env.PASSWORD || "password";

var _isAuthenticated = function (req, res, next) {
    if (req.session && typeof req.session.user !== 'undefined' && typeof req.session.authenticated !== 'undefined') {
        if (req.session.authenticated == true) {
            next();
        } else {
            res.redirect('/login');
        }
    } else {
        res.redirect('/login');
    }
}

// Authenticate user
var _authenticateUser = async function (req, res) {

    var msg = "";
    var username = "";
    var password = "";
    var userAgent = "";

    // Check for basic auth header
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        msg = "Missing Authorization Header"
        console.log(username, userAgent, msg);
        return res.status(401).json({ success: false, error: msg });
    }

    // Verify auth credentials
    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    [username, password] = credentials.split(':');

    // Obtain the user agent
    userAgent = req.headers['user-agent'];

    if (typeof req.body.username !== 'undefined') {

        if (username === USERNAME && password === PASSWORD) {
            req.session.user = username;
            req.session.authenticated = true;
            msg = "You will soon be redirected to the index";
            res.status(200).json({ success: true, data: msg });
            return;
        } else {
            msg = "Invalid username or password.";
            console.log(msg);
            res.status(200).json({ success: false, error: msg });
            return;
        }
    } else {
        msg = "No username provided";
        console.log(username, userAgent, msg);
        res.status(200).json({ success: false, error: msg });
    }
}

// Logout user by removing corresponding session data
var _logoutUser = async function (req, res) {
    var sess = req.session;
    var msg;
    var username = "";
    var userAgent = "";

    // Check for basic auth header
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        msg = "Missing Authorization Header"
        console.log(username, userAgent, msg);
        return res.status(401).json({ success: false, error: msg });
    }

    // Verify auth credentials
    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    username = credentials.split(':')[0];

    // Obtain the user agent
    userAgent = req.headers['user-agent'];

    delete sess.user;
    delete sess.password;
    req.session.destroy();

    console.log(username, userAgent, '');
    res.redirect('/login');
}

module.exports.isAuthenticated = _isAuthenticated;
module.exports.authenticateUser = _authenticateUser;
module.exports.logoutUser = _logoutUser;
