const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3000;
const FILE = "formateurs.json"; //

app.use(cors());
app.use(express.json());

function readData() {
    return JSON.parse(fs.readFileSync(FILE));
}

function writeData(data) {
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

// GET: Afficher tous les formateurs
app.get("/formateurs", (req, res) => {
    res.json(readData());
});


app.post("/formateurs", (req, res) => {
    let data = readData();
    let newFormateur = {
        id: Date.now(),
        ...req.body //
    };
    data.push(newFormateur);
    writeData(data);
    res.json(newFormateur);
});


app.delete("/formateurs/:id", (req, res) => {
    let data = readData();
    data = data.filter(f => f.id != req.params.id);
    writeData(data);
    res.json({ message: "Formateur supprimé" });
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});