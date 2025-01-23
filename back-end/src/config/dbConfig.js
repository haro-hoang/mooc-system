const mysql = require('mysql');
const { promisify } = require('util');

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'admin123',
    database: process.env.DB_NAME || 'mooc',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});
const query = promisify(db.query).bind(db);
module.exports = {
    db, query
};