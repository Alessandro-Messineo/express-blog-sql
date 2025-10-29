//importiamo mysql2
const mysql = require('mysql2');

// creazione oggetto di connessione
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'blog_db'
});

//  avvia connesione
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL!');
});

// esportiamo il modulo CJS
module.exports = connection;