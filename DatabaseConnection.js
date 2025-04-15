const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3030;

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // views folder

// Middleware
app.use(bodyParser.json());

// Static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'src')));

// Database connection
const db = mysql.createConnection({
    host: '192.168.10.130',
    user: 'root',
    password: '1234',
    database: 'art_gallery'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }
    console.log('Connected to MySQL as ID', db.threadId);
});


// Home page (was res.sendFile)
app.get('/', (req, res) => {
    res.render('index', { title: 'Acasă' });
});

// Example EJS routes for pages (optional dynamic content)
app.get('/about', (req, res) => {
    res.render('pages/about', { title: 'Despre noi' });
});

app.get('/acrylic', (req, res) => {
    res.render('pages/acrylic', { title: 'Picturi Acrilice' });
});
// Dynamic image from DB
app.get('/images', (req, res) => {
    const id = req.query.id;

    db.query(
        'SELECT locatie FROM acrylic_paintings WHERE id_acrylic_paintings = ?',
        [id],
        (err, results) => {
            if (err) {
                console.error('Error querying database:', err);
                return res.status(500).send('Error fetching image');
            }

            if (!results || results.length === 0) {
                console.warn(`No painting found with ID: ${id}`);
                return res.status(404).send('Image not found');
            }

            const imagePath = results[0].locatie;
            const fullImagePath = path.join(__dirname, 'src', 'images', imagePath);

            res.sendFile(fullImagePath, (err) => {
                if (err) {
                    console.error('Error sending file:', err);
                    res.status(500).send('Error sending image');
                }
            });
        }
    );
});


// Users API
app.get('/api/users', (req, res) => {
    db.query('SELECT * FROM user', (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            return res.status(500).send('Error fetching users');
        }
        res.json(results);
    });
});

app.post('/api/users', (req, res) => {
    const { email, password, first_name, last_name, user_name } = req.body;
    db.query(
        'INSERT INTO user (email, password, first_name, last_name, user_name) VALUES (?,?,?,?,?)',
        [email, password, first_name, last_name, user_name],
        (err) => {
            if (err) {
                console.error('Error executing query:', err.stack);
                return res.status(400).send('Error creating user');
            }
            res.status(201).send('User created successfully');
        }
    );
});

app.patch('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { email, password, first_name, last_name, user_name } = req.body;
    db.query(
        'UPDATE user SET email = ?, password = ?, first_name = ?, last_name = ?, user_name = ? WHERE id_user = ?',
        [email, password, first_name, last_name, user_name, id],
        (err) => {
            if (err) {
                return res.status(500).json({ error: err.stack });
            }
            res.status(200).json({ message: 'User updated successfully' });
        }
    );
});


// 404 Page


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
