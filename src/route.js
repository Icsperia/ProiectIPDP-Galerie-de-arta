import DatabaseConnection from '../DatabaseConnection';

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');


app.get('/api/users', (req, res) => {
    db.query('SELECT * FROM user', (err, results) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(500).send('Error fetching users');
            return;
        }
        res.json(results);
    });
});

app.post('/api/users', (req, res) => {
    const { email, password, first_name, last_name, user_name } = req.body;
    db.query('INSERT INTO user (email, password, first_name, last_name, user_name) VALUES (?,?,?,?,?)',
        [email, password, first_name, last_name, user_name],
        (err) => {
            if (err) {
                console.error('Error executing query: ' + err.stack);
                res.status(400).send('Error creating user');
                return;
            }
            res.status(201).send('User created successfully');
        }
    );
});

app.patch('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { email, password, first_name, last_name, user_name } = req.body;
        await db.query(
            'UPDATE user SET email = ?, password = ?, first_name = ?, last_name = ?, user_name = ? WHERE id_user = ?',
            [email, password, first_name, last_name, user_name, id]
        );
        res.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.stack });
    }
});
app.get('/image', (req, res) => {
    const id = req.query.id;
    console.log(`Cerere pentru imagine cu ID: ${id}`);  // Verifică ID-ul primit

    db.query('SELECT locatie FROM acrylic_paintings WHERE id_acrylic_paintings=?', [id], (err, results) => {
        if (err) {
            console.error('Eroare la interogarea bazei de date:', err);
            res.status(500).send('Eroare la interogarea bazei de date');
            return;
        }

        if (results.length > 0) {
            console.log('Imagine găsită:', results[0].locatie);  // Verifică ce se returnează din DB
            const imagePath = results[0].locatie;
            res.json({ imagePath });  // Trimite calea imaginii ca JSON
        } else {
            console.log('Imaginea nu a fost găsită');
            res.status(404).send('Imaginea nu a fost găsită');
        }
    });
});


app.use('/images', express.static(path.join(__dirname, 'images')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.ejs'));
});

// Handle 404 errors

app.use((req, res) => {
    res.status(404).send('<h1>Not Found</h1>');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
