// connection.js
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    console.log(process.DB_USER);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

module.exports = connection;
