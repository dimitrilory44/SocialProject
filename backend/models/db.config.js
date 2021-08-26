const db = require('mysql2');

require('dotenv').config();

// create the connection to database
const bdd = db.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

bdd.connect(err => {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
});

module.exports = bdd;