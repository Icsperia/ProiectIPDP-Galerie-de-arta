
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
    db.query('SELECT * FROM user', (err, results) => {
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
    const { id_user, email, password, first_name, last_name, user_name } = req.body;


    db.query('INSERT INTO user (email, password, first_name, last_name, user_name) VALUES (?,?,?,?,?)', [email, password, first_name, last_name, user_name], (err) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(400).send('Error creating user');
            return;
        }
        res.status(201).send('User created successfully');
    });
});




app.patch('/api/users/:id', async (req, res) => {
    try{
     const {id_user} = req.params;
     const {email, password, first_name, last_name, user_name} = req.body;
     const update = await db.query(
         'UPDATE user SET email = ?, password = ?, first_name =?, last_name =?, user_name = ? WHERE id_user = ?;',
         [email, password, first_name, last_name, user_name]
     );
     res.status(200).json({message: 'User updated successfully'});
    }catch(err){
        res.status(500).json({error: err.stack});
    }
})