const express = require("express");
const pool = require("./db");
const port = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  await pool.query('CREATE TABLE IF NOT EXISTS users ( id SERIAL PRIMARY KEY, name VARCHAR(100), address VARCHAR(100)) ')
  res.send("Hello Jordan");
});

app.get("/users", async (req, res) => {
  const data = await pool.query('SELECT * FROM users');
  res.status(200).send(data.rows);
});

app.post("/users", async (req, res) => {
  try {
    const { name, address } = req.body;
    const response = await pool.query(
      'INSERT INTO users (name, address) VALUES ($1, $2)',
      [name, address]
    );
    res.status(200).send({
      message: `Successfully added Data, Address: ${address} // Name: ${name}`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "get fucked buddy",
    });
  }
});

app.get("/setup", async (req, res) => {
  try {
    await pool.query(
      'CREATE TABLE users( id SERIAL PRIMARY KEY, name VARCHAR(100), address VARCHAR(100))'
    );
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "go fuck yourself",
    });
  }
});

//http://localhost:1337
app.listen(port, "0.0.0.0");
console.log(`Running on http://0.0.0.0:${port}`);
