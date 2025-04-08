const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3030;

// Middleware
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'pagini_html')));
/*app.use('', express.static(path.join(__dirname, 'images')));
app.use('', express.static('images'));
*/
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


// Serve homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Test image route (optional debug)
app.get('/test-image', (req, res) => {
    res.sendFile(path.join(__dirname, 'acrylic_miru.jpg'));
});

// Image by ID endpoint
app.get('/images', (req, res) => {
    const id = req.query.id;


    db.query('SELECT locatie FROM acrylic_paintings WHERE id_acrylic_paintings = ?', [id], (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).send('Error fetching image');
        }


        const imagePath = results[0].locatie;
        const fullImagePath = path.join(__dirname, 'src', 'images', imagePath);

        res.sendFile(fullImagePath, (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).send('Error sending image');
            }
        });
    });
});

// Users endpoints (optional, if needed)
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



// Catch-all 404
app.use((req, res) => {
    res.status(404).send('<h1>Not Found</h1>');
});

// Start the server ONCE
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
db.query("Insert into acrylic_paintings(locatie) values('acrylic-river.png')")