const express = require("express");


const server = express();
const routes = require('./routes/routes');

const cors = require('cors');
server.use(cors());

const PORT = 3000;

server.use('/', routes);

/** 
 * when the server starts, console log the port number and start the table initialisation
 */
server.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`);
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
            console.log('Table spaceShips already exists');
        }
    } catch (error) {
        // Handle any errors that may occur
        console.error(error);
    }
}





/**
 * Yo 
 * 
 * This is the end of the code :>
 * i hope you like it !
 * 
 * sayonara :>
 * Yassin 
 * 
 */