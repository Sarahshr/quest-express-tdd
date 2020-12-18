// app.js
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const connection = require("./connection");
const { query } = require("express");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

app.post("/bookmarks", (req, res) => {
  const { url, title } = req.body;
  if (!url || !title) {
    return res.status(422).json({ error: "required field(s) missing" });
  }
  connection.query("insert into bookmark set ?", req.body, (err, req) => {
    if (err) return res.status(500).json({ error: err.message, sql: err.sql });

    connection.query(
      "SELECT * FROM bookmark WHERE id = ?",
      req.insertId,
      (err, records) => {
        if (err)
          return res.status(500).json({ error: err.message, sql: err.sql });
        return res.status(201).json(records[0]);
      }
    );
  });
});

app.get("/bookmarks/:id", (req, res) => {
  connection.query(
    "select * from bookmark where id=?",
    [req.params.id],
    (err, results) => {
      if (results.length === 0) {
        return res.status(404).send({ error: "Bookmark not found" });
      } else {
        return res.status(200).json(results[0]);
      }
    }
  );
});

module.exports = app;
