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


console.log('AAAAAAAAAAAAAAAAAAAAAhhhhhhhhhhhhhhhhhh');

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
            console.log("post ships success");
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
  if (!id) {
    res.status(400).json({ error: "Missing id parameter" });
  } else {
    await pg("spaceShips") 
      .where("id", id)
      .del()
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json(err);
      });
  }
}); 
 


/**
 * update a ship endpoint 
 * @param {string} id - the id of the ship to be updated
 * @param {string} name - the name of the ship
 * @param {string} frontHead - the front head of the ship
 * @param {string} body - the body of the ship
 * @param {string} backPart - the back part of the ship
 * @param {string} leftWing - the left wing of the ship
 * @param {string} rightWing - the right wing of the ship
 * @param {string} frontHeadColor - the color of the front head of the ship
 * @param {string} bodyColor - the color of the body of the ship
 * @param {string} backPartColor - the color of the back part of the ship
 * @param {string} leftWingColor - the color of the left wing of the ship
 * @param {string} rightWingColor - the color of the right wing of the ship
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