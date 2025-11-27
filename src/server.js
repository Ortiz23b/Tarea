const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "views")));

const DB_FILE = path.join(__dirname, "database.json");

// Si no existe el archivo de BD, crearlo vacío
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify([]));
}

// Leer notas
app.get("/notas", (req, res) => {
  let data = JSON.parse(fs.readFileSync(DB_FILE));
  res.json(data);
});

// Agregar nota
app.post("/agregar", (req, res) => {
  let nota = req.body.nota;

  let data = JSON.parse(fs.readFileSync(DB_FILE));
  data.push({ texto: nota });
  fs.writeFileSync(DB_FILE, JSON.stringify(data));

  res.redirect("/");
});

// Página principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Corriendo en puerto " + PORT));
