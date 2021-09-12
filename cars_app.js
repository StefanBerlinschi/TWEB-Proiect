// Import packages
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid");

const fs = require("fs");

// Aplicatia
const app = express();

app.use(express.static("Materials"));

// Middleware
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());


// Create
app.post("/cars", (req, res) => {
  const carsList = readJSONFile();
  const newCar = req.body;
  const newCarsList = [...carsList, newCar];
  writeJSONFile(newCarsList);
  res.json(newCar);
});

// Read One
app.get("/cars/:id", (req, res) => {
  const carsList = readJSONFile();
  const id = req.params.id;
  let idFound = false;
  let foundCar;
  carsList.forEach((car) => {
    if (id == car.id) {
      idFound = true;
      foundCar = car;
    }
  });
  if (idFound) {
    res.json(foundCar);
  } else {
    res.status(404).send(`Masina cu id-ul ${id} nu a fost gasita`);
  }
});

// Read All
app.get("/cars", (req, res) => {
  const carsList = readJSONFile();
  res.json(carsList);
});

// Update
app.put("/cars/:id", (req, res) => {
  const cars = readJSONFile();
  // Completati cu codul vostru aici
});

// Delete
app.delete("/cars/:id", (req, res) => {
  const dogsList = readJSONFile();
  // Completati cu codul vostru aici
});

// Functia de citire din fisierul db.json
function readJSONFile() {
  return JSON.parse(fs.readFileSync("db.json"))["cars"];
}

// Functia de scriere in fisierul db.json
function writeJSONFile(content) {
  fs.writeFileSync(
    "db.json",
    JSON.stringify({ cars: content }),
    "utf8",
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
}

// Pornim server-ul
app.listen("3000", () =>
  console.log("Server started at: http://localhost:3000")
);