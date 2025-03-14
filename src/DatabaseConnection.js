const mysql = require('mysql2');

// Create a connection object
const connection = mysql.createConnection({
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
});