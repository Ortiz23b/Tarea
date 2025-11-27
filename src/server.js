const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("views"));

let notas = []; // ← reemplazo temporal de SQLite

app.get("/notas", (req, res) => {
  res.json(notas);
});

app.post("/agregar", (req, res) => {
  let nota = req.body.nota;
  notas.push({ id: notas.length + 1, texto: nota });
  res.redirect("/");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Corriendo en puerto " + PORT);
});
