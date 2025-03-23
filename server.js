const express = require('express');
const path = require('path');

const app = express();

// Serve static files from 'ProiectIPDP-Galerie-de-arta'
app.use(express.static(path.join(__dirname, 'src')));

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,  'index.html'));

});

// Handle 404 errors
app.use((req, res) => {
    res.status(404).send('<h1>Not Found</h1>');
});

// Start the server
app.listen(3000, () => console.log('Server started on port 3000'));
