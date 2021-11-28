const debug = require("debug")("monprojetdemo:schema");
const mysql = require("mysql2");

// create the connection to database
const connection = mysql.createConnection({
  host: process.env.DB_HOSTNAME || "localhost",
  user: process.env.DB_USERNAME || "root",
  database: "mysql",
});

connection.query("create database studentdb", function (err, results, fields) {
  connection.close();
});
