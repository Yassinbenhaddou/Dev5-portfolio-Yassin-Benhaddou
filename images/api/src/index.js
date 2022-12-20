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
async function initialiseTables() {
    await pg.schema.hasTable('spaceShips').then(function (exists) {
        if (!exists) {
            pg.schema.createTable('spaceShips', function (table) {

                table.increments('id').primary();

                table.string('name');
                table.string('frontHead');
                table.string('body');
                table.string('backPart');
                table.string('leftWing'); 
                table.string('rightWing');
                //create a array of for the colors 
               
                table.integer('frontHeadColor');
                table.integer('bodyColor');
                table.integer('backPartColor');
                table.integer('leftWingColor');
                table.integer('rightWingColor');


            }).then(async function () {

                console.log('Table spaceShips created');
            })
        } else {
            console.log('Table spaceShips already exists');
        }
    });
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


