const express = require("express");
const server = express();
const PORT = 3000;

server.use(express.json());


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
 * when the server starts, console log the port number and start the table initialisation
 */
 server.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`); 
    initialiseTables(); // initialise the tables
});



/**template retunrSpaceShip:
 *  id: string - id of the spaceship
 *  name: string - name of the spaceship
 *  fictional: boolean - is the spaceship fictional
 *  img: string - url to the image of the spaceship
 * 
 * @api {get} /spaceships Get all spaceships
 * @returns retunrSpaceShip
 */
server.get("/ships", async (req, res) => {
    const ships = await pg.select().from("spaceShips");
    res.json(ships);

    console.log("get ships");

});

/** 
 * template retunrSpaceShip:
 *  id: string - id of the spaceship
 *  name: string - name of the spaceship
 *  fictional: boolean - is the spaceship fictional
 *  img: string - url to the image of the spaceship
 * 
 * @api {post} /spaceships Add a spaceship
 * @param {String} name Name of the spaceship
 * @param {Boolean} fictional Is the spaceship fictional?
 * @param {String} img URL of the spaceship image
 * @returns retunrSpaceShip - The spaceship that was added
 */
server.post("/PostShips", async (req, res) => {
    console.log("post ships");
    const {
        name, 
        motor,
        wings,
        reactor,
        shield,
        weapon,
        pilot
    } = req.body;
    if (name, motor, wings, reactor, shield, weapon, pilot) {

        await pg("spaceShips").insert({
            name: name,
            motor: motor,
            wings: wings,
            reactor: reactor,
            shield: shield,
            weapon: weapon,
            pilot: pilot
        }).then(data => {
            res.json(data);
        }).catch(err => {
            res.json(err);
        });
    } else {
        res.json("error");
    }
});



/**
 * delete a ship endpoint 
 * @param {string} id - the id of the ship to be deleted
 */
server.delete("/DeleteShips/:id", async (req, res) => {
    console.log("delete ships");
    const id = req.params.id;
    await pg("spaceShips").where("id", id).del().then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    });
});



/**
 * template retunrSpaceShip:
 *  id: string - id of the spaceship
 *  name: string - name of the spaceship
 *  motor: string - name motor of the spaceship
 *  wings: string - name wings of the spaceship
 *  reactor: string - name reactor of the spaceship
 *  shield: string - name shield of the spaceship
 *  weapon: string - name weapon of the spaceship
 *  pilot: string - name pilot of the spaceship
 * 
 * @api {put} /spaceships/:id Update a spaceship
 * @param {String} id ID of the spaceship
 * @return retunrSpaceShip
*/
server.put("/PutShips/:id", async (req, res) => {
    console.log("put ships");
    const id = req.params.id;
    const {
        name,
        motor,
        wings,
        reactor,
        shield,
        weapon,
        pilot
    } = req.body;
    if (name, motor, wings, reactor, shield, weapon, pilot) {
        await pg("spaceShips").where("id", id).update({
            name: name,
            motor: motor,
            wings: wings,
            reactor: reactor,
            shield: shield,
            weapon: weapon,
            pilot: pilot
        }).then(data => {
            res.json(data);
        }).catch(err => {
            res.json(err);
        });
    } else {
        res.json("error");
    }
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
                table.string('motor');
                table.string('wings');
                table.string('reactor');
                table.string('shield');
                table.string('weapon');
                table.string('pilot');

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


