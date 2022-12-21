// Description: This is the main file of the api, it contains the server and the database connection

// require the express module
const express = require("express");

// create the express server
const server = express();

// require the routes from the routes folder ./routes/routes.js
const routes = require('./routes/routes');

// require the cors module
const cors = require('cors');
server.use(cors()); // server will use cors

// the port number
const PORT = 3000;

//server will use the routes
server.use('/', routes);

/** 
 * when the server starts, console log the port number and start the table initialisation
 */
server.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`); // when the server starts, console log that it is listening at the port number :D
    initialiseTables(); // initialise the tables
});


// connect to the postgres database 
const pg = require('knex')({

    client: 'pg', // client type
    version: '15', // postgres version
    searchPath: ['knex', 'public'],
    connection: process.env.PG_CONNECTION_STRING ?
        process.env.PG_CONNECTION_STRING : 'postgres://admin:admin@spaceShipsdb:5432/spaceShipsApi',
    port: 5432 // port of the postgres server

});

/** 
 * initialisation of the database tables 
 * if the tables don't exist, create them
 * if they exist, just console log that they exist
 */
// Initialise the 'spaceShips' table in the database
async function initialiseTables() {
    try {
        // Check if the 'spaceShips' table already exists
        const exists = await pg.schema.hasTable('spaceShips');

        if (!exists) {
            // Create the 'spaceShips' table if it doesn't exist
            await pg.schema.createTable('spaceShips', table => {
                table.increments('id').primary();

                table.string('name'); // name of the spaceship

                // add the parts of the spaceship
                table.string('frontHead');
                table.string('body');
                table.string('backPart');
                table.string('leftWing');
                table.string('rightWing');
                // Create an array of colors for each part of the spaceship
                table.string('frontHeadColor');
                table.string('bodyColor');
                table.string('backPartColor');
                table.string('leftWingColor');
                table.string('rightWingColor');
            });
            console.log('Table spaceShips created');
        } else {
            //when the table already exists, console log that it already exists :D
            console.log('Table spaceShips already exists');
        }
    } catch (error) {
        // Handle any errors that may occur
        console.error(error); // console log the error D:
    }
}


module.exports = server; // export the server to be used in the test.js file and by the server.js file

/**
 * Yo 
 * 
 * This is the end of the code :>
 * i hope you like it !
 * 
 * sayonara :D
 * Yassin 
 * 
 */