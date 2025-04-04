import express from 'express';
import mysql from 'mysql2';

import bodyParser from 'body-parser';
//const express = require('express');
//const mysql = require('mysql12');
//const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(bodyParser.json());
// MySQL Connection
const db = mysql.createConnection({
    host: '192.168.10.130',
    user: 'root',
    password: '1234',
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

app.delete('/api/users/:id', async (req, res) => {
    const {id_user} = req.params.id;
    const   query = `DELETE FROM user WHERE id_user = ?;`;
    db.query(query,[id_user],(err) => {
        if (err) {
        res.status(500).json({error: err.message});
    }else {
            res.status(200).json({message: 'User deleted successfully'});
        }
        })
})

/*const query = `ALTER TABLE  random_drawings ADD COLUMN location VARCHAR(200)`;

db.query(query, (err, results) => {  // Ensure the query string is used properly
    if (err) {
        console.error('Error executing query: ' + err.stack);
    } else {
        console.log('Query executed successfully', results);
    }})*/

const query = 'Select u.id_user, u.first_name, u.last_name, u.user_name, dc.id_date_comanda, dc.status, dc.adresa, dc.data ' +
    'from user u JOIN date_comanda dc ON u.id_user = dc.id_user' ;
db.query(query, (err, results) => {
    if(err){
        console.log ('Error executing query: ' + err.stack);
    }else{
        console.log('Query executed successfully', results);
    }
})

const query1 = 'SELECT ar.id_artist, u.user_name, a.id_art, a.pret, a.descriere ' +
    'FROM artist ar ' +
    'INNER JOIN user u ON ar.id_user = u.id_user ' +
    'INNER JOIN art a ON ar.id_artist = a.id_artist';

db.query(query1, (err, results) => {
    if(err){
        console.error('Error executing query: ' + err.stack);
    }else{
        console.log('Query executed successfully', results);
    }
});

const query3 = 'Select u.id_user, u.user_name, a.id_art, a.pret, a.descriere, dc.status, dc.adresa, dc.data' +
                      ' from user u JOIN date_comanda dc ON u.id_user = dc.id_user' +
                      ' JOIN art a ON dc.id_art = a.id_art' ;

db.query(query3, (err, results) => {
    if(err){
        console.error('Error executing query: ' + err.stack);
    }else{
        console.log('Query executed successfully', results);
    }
});

const query4 = `
    SELECT a.id_art, a.pret AS pret_general, 
           pp.pret AS pret_pencil, 
           ap.pret AS pret_acrylic, 
           wp.pret AS pret_watercolor, 
           d.pret AS pret_drawing, 
           rd.pret AS pret_random 
    FROM art a 
    LEFT JOIN pencil_portraits pp ON a.id_art = pp.id_art 
    LEFT JOIN acrylic_paintings ap ON a.id_art = ap.id_art 
    LEFT JOIN watercolor_paintings wp ON a.id_art = wp.id_art 
    LEFT JOIN drawings d ON a.id_art = d.id_art 
    LEFT JOIN random_drawings rd ON a.id_art = rd.id_art
`;

db.query(query4, (err, results) => {
    if(err){
        console.error('Error executing query: ' + err.stack);
    }else{
        console.log('Query executed successfully', results);
    }
});

const query5 = `
    SELECT uc.id_user_comanda, u.user_name, dc.id_date_comanda, dc.status, dc.adresa, dc.data 
    FROM user_comanda uc
    JOIN user u ON uc.id_user = u.id_user 
    JOIN date_comanda dc ON uc.id_date_comanda = dc.id_date_comanda
`;

db.query(query5, (err, results) => {
    if(err){
        console.error('Error executing query: ' + err.stack);
    }else{
        console.log('Query executed successfully', results);
    }
});

const query6 = `SELECT dc.id_date_comanda, u.user_name, a.id_art, a.descriere, a.pret, dc.status, dc.adresa, dc.data
FROM date_comanda dc
JOIN user u ON dc.id_user = u.id_user
JOIN art a ON dc.id_art = a.id_art

`;

db.query(query6, (err, results) => {
    if(err){
        console.error('Error executing query: ' + err.stack);
    }else{
        console.log('Query executed successfully', results);
    }
});