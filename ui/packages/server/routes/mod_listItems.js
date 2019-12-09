const mysql = require('mysql');

const PROJECT_DATABASE_HOST = process.env.PROJECT_DATABASE_HOST || "db.example.com";
const PROJECT_DATABASE_PORT = process.env.PROJECT_DATABASE_PORT || "5432";
const PROJECT_DATABASE_USER = process.env.PROJECT_DATABASE_USER || "user";
const PROJECT_DATABASE_PASSWORD = process.env.PROJECT_DATABASE_PASSWORD || "password";
const PROJECT_DATABASE_DATABASE_NAME = process.env.PROJECT_DATABASE_NAME || "name";

var _getListItems = function (req, res) {

    // Create SQL statement
    const sql = `SELECT id, serial_number, description, product_type_id, product_number, product_number, primary_user, user_id, room_id, project_code, order_number, supplier, date_of_supply, guarantee_period, date_out_of_guarantee, last_audit, purchase_value, hostname, ram_memory, number_of_cpus, cpu_type, comment, intranet_id, manufacturer FROM items;`

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
                console.log(JSON.stringify(results));
                return res.status(200).json({ "data": results });
            }
        });
    });
}

module.exports.getListItems = _getListItems;