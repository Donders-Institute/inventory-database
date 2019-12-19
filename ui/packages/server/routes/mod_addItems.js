const mysql = require('mysql');

const PROJECT_DATABASE_HOST = process.env.PROJECT_DATABASE_HOST || "db.example.com";
const PROJECT_DATABASE_PORT = process.env.PROJECT_DATABASE_PORT || "5432";
const PROJECT_DATABASE_USER = process.env.PROJECT_DATABASE_USER || "user";
const PROJECT_DATABASE_PASSWORD = process.env.PROJECT_DATABASE_PASSWORD || "password";
const PROJECT_DATABASE_DATABASE_NAME = process.env.PROJECT_DATABASE_NAME || "name";

var _getAddItems = function (req, res) {

    // Create SQL statement

    // INSERT INTO table_name (column1, column2, column3, ...)
    // VALUES (value1, value2, value3, ...);


    const sql = `SELECT i.id, i.serial_number, i.description, i.product_type_id, p.description, i.product_number, i.user_id, u.firstName, u.middleName, u.lastName, u.email, i.room_id, r.technical_room_number, i.project_code, i.order_number, i.supplier, i.date_of_supply, i.guarantee_period, i.date_out_of_guarantee, i.last_audit, i.purchase_value, i.hostname, i.ram_memory, i.number_of_cpus, cpu_type, i.comment, i.intranet_id, i.manufacturer FROM items AS i INNER JOIN users AS u ON i.user_id =  u.id INNER JOIN rooms as r ON r.id = i.room_id INNER JOIN product_types AS p ON p.id = i.product_type_id`
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

module.exports.getAddItems = _getAddItems;