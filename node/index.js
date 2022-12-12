const express = require("express");
const app = express();
const port = 3000;

const config = {
    host: 'database',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const mysql = require('mysql')
const connection = mysql.createConnection(config)

connection.query(`CREATE TABLE people (name varchar(255))`)

const sql = `INSERT INTO people(name) values ('Joao'), ('Pedro'), ('Maria')`;
connection.query(sql);

let data;

connection.query("SELECT * FROM people", function (err, result, fields) {
    data = result
});

connection.end();

app.get('/', (req, res) => {
 res.send(`<h1>Full Cycle Rocks!</h1> <h2>${data.map(item => ` ${item.name}`)}</h2>`);
});

app.listen(port, () => console.log(`Running on port ${port}`))