const express = require('express');
const path = require('path');

const app = express();




// Servește fișiere statice din directorul 'src/images'
app.use('/images', express.static('src/images'));

// Serve static files from 'ProiectIPDP-Galerie-de-arta'
app.use(express.static(path.join(__dirname, 'src')));

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,  'index.html'));

});
app.get('/test-image', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/images/acrylic_river.jpg'));
});

app.use(express.static(path.join(__dirname, 'pagini_html')));

// Serve the main HTML file
/*app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,  'about.html'));
    res.sendFile(path.join(__dirname,  'acrylic.html'));
    res.sendFile(path.join(__dirname,  'ai_art.html'));
    res.sendFile(path.join(__dirname,  'art.html'));
    res.sendFile(path.join(__dirname,  'artist.html'));
    res.sendFile(path.join(__dirname,  'bia.html'));
    res.sendFile(path.join(__dirname,  'draw.html'));
    res.sendFile(path.join(__dirname,  'georgi.html'));
    res.sendFile(path.join(__dirname,  'marian.html'));
    res.sendFile(path.join(__dirname,  'portraits.html'));
    res.sendFile(path.join(__dirname,  'random_draw.html'));
    res.sendFile(path.join(__dirname,  'reacts.html'));

});*/

// Handle 404 errors
app.use((req, res) => {
    res.status(404).send('<h1>Not Found</h1>');
});

// Start the server
app.listen(3030, () => console.log('Server started on port 3000'));
