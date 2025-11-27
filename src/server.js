const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "views")));

let db = new sqlite3.Database("database.db");

db.run("CREATE TABLE IF NOT EXISTS notas(id INTEGER PRIMARY KEY, texto TEXT)");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/notas", (req, res) => {
  db.all("SELECT * FROM notas", [], (err, rows) => {
    res.json(rows);
  });
});

app.post("/agregar", (req, res) => {
  let nota = req.body.nota;
  db.run("INSERT INTO notas(texto) VALUES(?)", [nota], () => {
    res.redirect("/");
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Corriendo en puerto " + PORT);
});
