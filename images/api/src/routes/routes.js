const express = require('express');


const router = express.Router();

const {changeColorModelFromHexToX0Rgb} = require('../common/changeColorModelFunction.js');

router.use(express.json());

router.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = router;

// connect to the postgres database 
const pg = require('knex')({

    client: 'pg', // client type
    version: '15', // postgres version
    searchPath: ['knex', 'public'],
    connection: process.env.PG_CONNECTION_STRING ?
        process.env.PG_CONNECTION_STRING : 'postgres://admin:admin@spaceShipsdb:5432/spaceShipsApi',
    port: 5432 // port of the postgres server

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
 router.get("/ships", async (req, res) => {
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
router.post("/PostShips", async (req, res) => {
    console.log("post ships");
    
    const {
        name,
        frontHead,
        body,
        backPart,
        leftWing,
        rightWing,
        frontHeadColor,
        bodyColor,
        backPartColor,
        leftWingColor,
        rightWingColor
        
    } = req.body;
    if (name && frontHead && body && backPart && leftWing && rightWing && frontHeadColor && bodyColor && backPartColor && leftWingColor && rightWingColor) {

        await pg("spaceShips").insert({
            name,
            frontHead: frontHead, 
            body: body,
            backPart: backPart,
            leftWing: leftWing,
            rightWing: rightWing,
            frontHeadColor : changeColorModelFromHexToX0Rgb(frontHeadColor),
            bodyColor : changeColorModelFromHexToX0Rgb(bodyColor),
            backPartColor : changeColorModelFromHexToX0Rgb(backPartColor),
            leftWingColor : changeColorModelFromHexToX0Rgb(leftWingColor),
            rightWingColor : changeColorModelFromHexToX0Rgb(rightWingColor)
            
        }).then(data => {
            res.json(data);
        })
    } else {
        res.json("error");
        console.log(`invalid input data for post ships to post 
                    content correctly you need to provide a correct 
                    name, frontHead, body, backPart, leftWing, rightWing, 
                    frontHeadColor, bodyColor, backPartColor, leftWingColor, rightWingColor`);
    }
});



/**
 * delete a ship endpoint 
 * @param {string} id - the id of the ship to be deleted
 */
router.delete("/DeleteShips/:id", async (req, res) => {
    console.log("delete ship");
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
router.put("/PutShips/:id", async (req, res) => {
    console.log("put ships");
    const id = req.params.id;
    const {
        name,
        frontHead,
        body,
        backPart,
        leftWing,
        rightWing,
        frontHeadColor,
        bodyColor,
        backPartColor,
        leftWingColor,
        rightWingColor

    } = req.body;
    if (name, motor, wings, reactor, shield, weapon, pilot) {
        await pg("spaceShips").where("id", id).update({
            name,
            frontHead,
            body,
            backPart,
            leftWing,
            rightWing,
            frontHeadColor : changeColorModelFromHexToX0Rgb(frontHeadColor),
            bodyColor : changeColorModelFromHexToX0Rgb(bodyColor),
            backPartColor : changeColorModelFromHexToX0Rgb(backPartColor),
            leftWingColor : changeColorModelFromHexToX0Rgb(leftWingColor),
            rightWingColor : changeColorModelFromHexToX0Rgb(rightWingColor)
        }).then(data => {
            res.json(data);
        }).catch(err => {
            res.json(err);
        });
    } else {
        res.json("error");
    }
});