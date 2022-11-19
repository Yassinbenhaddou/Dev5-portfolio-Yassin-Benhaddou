const express = require("express");
const server = express();
const PORT = 3000;
server.use(express.json());

const router = express.Router();

module.exports = router;

const pg = require('knex')({

    client: 'pg',
    version: '15',
    searchPath: ['knex', 'public'],
    connection: process.env.PG_CONNECTION_STRING ? process.env.PG_CONNECTION_STRING : 'postgres://admin:admin@spaceShipsdb:5432/spaceShipsApi',
    port: 5432

});
/* 
const pg = require('knex')({

    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING ? process.env.PG_CONNECTION_STRING : "postgres://admin:admin@store:5432/spaceShipsApi"
});
*/
//server.set("pg", pg);

server.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`);
    initialiseTables();
}); 






/**
 * initializations of the database tables 
 * addition of the planets table
 */



server.get("/ships", async (req, res) => {




    const ships = await pg.select().from("spaceShips");
    res.json(ships);

    console.log("get ships");



});


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


server.delete("/DeleteShips/:id", async (req, res) => {
    console.log("delete ships");
    const id = req.params.id;
    await pg("spaceShips").where("id", id).del().then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    });
});

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