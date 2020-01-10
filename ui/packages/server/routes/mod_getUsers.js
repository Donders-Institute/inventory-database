const mysql = require('mysql');

const PROJECT_DATABASE_HOST = process.env.PROJECT_DATABASE_HOST || "db.example.com";
const PROJECT_DATABASE_PORT = process.env.PROJECT_DATABASE_PORT || "5432";
const PROJECT_DATABASE_USER = process.env.PROJECT_DATABASE_USER || "user";
const PROJECT_DATABASE_PASSWORD = process.env.PROJECT_DATABASE_PASSWORD || "password";
const PROJECT_DATABASE_DATABASE_NAME = process.env.PROJECT_DATABASE_NAME || "name";

var _getUsers = function (req, res) {

    // Create SQL statement
    const sql = `SELECT id, firstName, middleName, lastName, email FROM users`;

    var con = mysql.createConnection({
        host: PROJECT_DATABASE_HOST,
        port: PROJECT_DATABASE_PORT,
        user: PROJECT_DATABASE_USER,
        password: PROJECT_DATABASE_PASSWORD,
        database: PROJECT_DATABASE_DATABASE_NAME
    });

    con.connect(function (err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ "error": err });
        }
        con.query(sql, function (err, results) {
            if (err) {
                con.end();
                console.error(err);
                return res.status(500).json({ "error": err });
            } else {
                con.end();
                return res.status(200).json({ "data": results });
            }
        });
    });
}

module.exports.getUsers = _getUsers;