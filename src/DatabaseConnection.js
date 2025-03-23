
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(bodyParser.json());
// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'idfk',
    database: 'art_gallery'
});
// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as ID ' + db.threadId);
});
// Routes
app.get('/api/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(500).send('Error fetching users');
            return;
        }
        res.json(results);
    });
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.post('/api/users', (req, res) => {
    const { username } = req.body;
    db.query('INSERT INTO artist (name) VALUES (?)', [username], (err) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(400).send('Error creating user');
            return;
        }
        res.status(201).send('User created successfully');
    });
});
//const mysql = require('mysql2');

// Create a connection object
/*const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'idfk',
    database: 'art_gallery'
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database as ID:', connection.threadId);

    // Insert a new row into the table
 ;

    // Close the connection when done
    const selectQuery = 'SELECT * FROM artist';
    connection.query(selectQuery, (err, rows) => {
        if (err) {
            console.error('Error fetching data:', err.stack);
            return;
        }

        // Log the fetched data to the console
        console.log('All rows from artworks table:', rows);
    });

    // Close the connection when done
    connection.end();
});*/

