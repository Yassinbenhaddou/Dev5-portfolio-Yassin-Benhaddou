// Description: this file contains the routes of the server api 

//require the express module
const express = require('express');

// create the router
const router = express.Router();

// import the function to change the color model from hex to x0rgb
const {
    changeColorModelFromHexToX0Rgb
} = require('../common/changeColorModelFunction.js');


// use the express.json() middleware to parse the body of the request
router.use(express.json());

//redirect to the public folder so you can access to the index.html file
router.get('/', (req, res) => {
    res.send(`Hey You what are you doing here? :D
    
    normaly it's not expected to see you here, 
    but if you want to see the api go to the public http://localhost/public/index.html
    ciao :D`);
});

module.exports = router; // export the router to be used in the index.js file



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
 * id: string - id of the spaceship
 * name: string - name of the spaceship
 * frontHead: string - name of the front head of the spaceship
 * body: string - name of the body of the spaceship
 * backPart: string - name of the back part of the spaceship
 * leftWing: string - name of the left wing of the spaceship
 * rightWing: string - name of the right wing of the spaceship
 * frontHeadColor: string - hex color of the front head of the spaceship
 * bodyColor: string - hex color of the body of the spaceship
 * backPartColor: string - hex color of the back part of the spaceship
 * leftWingColor: string - hex color of the left wing of the spaceship
 * rightWingColor: string - hex color of the right wing of the spaceship
 * 
 * @api {get} /spaceships Get all spaceships
 * @returns retunrSpaceShip
 */
router.get("/ships", async (req, res) => {
    try {
        // Get all the space ships from the database and store them in the allShips variable
        const allShips = await pg.select().from("spaceShips"); //here are the ships :D

        // send the ships to the client as response :D
        res.json(allShips);
    } catch (err) {
        console.log(err); // if there is an error, log it in the console D:
        res.status(500).json({

            error: err.message // if there is an error, send the error message to the client D:
        });
    }
});

/**template retunrSpaceShip:
 * id: string - id of the spaceship
 * name: string - name of the spaceship
 * frontHead: string - name of the front head of the spaceship
 * body: string - name of the body of the spaceship
 * backPart: string - name of the back part of the spaceship
 * leftWing: string - name of the left wing of the spaceship
 * rightWing: string - name of the right wing of the spaceship
 * frontHeadColor: string - hex color of the front head of the spaceship
 * bodyColor: string - hex color of the body of the spaceship
 * backPartColor: string - hex color of the back part of the spaceship
 * leftWingColor: string - hex color of the left wing of the spaceship
 * rightWingColor: string - hex color of the right wing of the spaceship
 * 
 * @api {get} /spaceships/:id Get one spaceship by id (you get the asked spaceship)
 * @returns retunrSpaceShip
 */
router.get("/ships/:id", async (req, res) => {
    try {
        // Get the id from the request parameters and store it in the id variable
        const {
            id
        } = req.params;
        // Get the space ship with the id from the database and store it in the singleShip variable
        const singleShip = await pg.select().from("spaceShips").where({ id });
        
        //send the respon to the client :D
        res.json(singleShip);
    } catch (err) {
        
        console.log(err); // if there is an error, log it in the console D:
        res.status(500).json({
            error: err.message // when there is an error, send the error message to the client D:
        });
    }
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
 * @param {String} frontHead Name of the front head of the spaceship
 * @param {String} body Name of the body of the spaceship
 * @param {String} backPart Name of the back part of the spaceship
 * @param {String} leftWing Name of the left wing of the spaceship
 * @param {String} rightWing Name of the right wing of the spaceship
 * @param {String} frontHeadColor Color of the front head of the spaceship
 * @param {String} bodyColor Color of the body of the spaceship
 * @param {String} backPartColor Color of the back part of the spaceship
 * @param {String} leftWingColor Color of the left wing of the spaceship
 * @param {String} rightWingColor Color of the right wing of the spaceship
 * @returns retunrSpaceShip - The spaceship that was added
 */
router.post("/PostShips", async (req, res) => {
    console.log("post ships");
    // create a new object with all the needed input data (our new data info hav the same name as the required data)
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

    } = req.body; //get the data from the body of the request

    //check if every input is valid 
    if (name && frontHead && body && backPart && leftWing && rightWing && frontHeadColor && bodyColor && backPartColor && leftWingColor && rightWingColor) {

        await pg("spaceShips").insert({
            name,
            frontHead: frontHead,
            body: body,
            backPart: backPart,
            leftWing: leftWing,
            rightWing: rightWing,
            frontHeadColor: changeColorModelFromHexToX0Rgb(frontHeadColor),
            bodyColor: changeColorModelFromHexToX0Rgb(bodyColor),
            backPartColor: changeColorModelFromHexToX0Rgb(backPartColor),
            leftWingColor: changeColorModelFromHexToX0Rgb(leftWingColor),
            rightWingColor: changeColorModelFromHexToX0Rgb(rightWingColor)

        }).then(data => {
            res.json(data); // when the data is inserted send the data back to the client :D
            console.log("post ships success"); // log success message :D
        })
    } else { // if there is no input data or the input data is invalid 
        res.json("error"); // send error message D:
        console.log(`invalid input data for post ships to post 
                    content correctly you need to provide a correct 
                    name, frontHead, body, backPart, leftWing, rightWing, 
                    frontHeadColor, bodyColor, backPartColor, leftWingColor, rightWingColor`);
    }
});



/**
 * update a ship endpoint 
 * we need to provide the id of the ship to be updated
 * and the new data for the ship (we need to provide all the data for the ship)
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
    //get the id from the url
    const id = req.params.id;

    // create a new object with all the needed input data (our new data info hav the same name as the required data)
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
    } = req.body; // get the data from the request body (the data that we want to update)
    //check if every all the input data is valid 
    if (name, frontHead, body, backPart, leftWing, rightWing, frontHeadColor, bodyColor, backPartColor, leftWingColor, rightWingColor) {
        await pg("spaceShips").where("id", id).update({
            name,
            frontHead,
            body,
            backPart,
            leftWing,
            rightWing,
            frontHeadColor: changeColorModelFromHexToX0Rgb(frontHeadColor), //change the color model from hex to x0rgb (the color model that we use in the database)
            bodyColor: changeColorModelFromHexToX0Rgb(bodyColor),
            backPartColor: changeColorModelFromHexToX0Rgb(backPartColor),
            leftWingColor: changeColorModelFromHexToX0Rgb(leftWingColor),
            rightWingColor: changeColorModelFromHexToX0Rgb(rightWingColor)
        }).then(data => {
            res.json(data); // whent the update is done return the data :D
            console.log("update ships success"); // log success message :D
        }).catch(err => {
            res.json(err); // when there is an error return the error D:
        });
    } else {
        res.json("error"); //when there is an error return the error D:
    }
});



/**
 * delete a ship endpoint 
 * @param {string} id - the id of the ship to be deleted
 */
router.delete("/DeleteShips/:id", async (req, res) => {

    //get the id from the request 
    const id = req.params.id;
    //check if there is an id
    if (!id) {
        res.status(400).json({
            error: "Missing id parameter"
        });
    } else {
        //delete the ship with the id
        await pg("spaceShips")
            .where("id", id)
            .del()
            .then(data => {
                res.json(data); // when the ship is deleted return the data :D
                console.log("delete ships success"); // log success message :D
            })
            .catch(err => {
                res.json(err); // if there is an error return the error D:
            });
    }
});