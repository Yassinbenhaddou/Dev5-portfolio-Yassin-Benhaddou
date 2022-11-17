const express = require("express");
const server = express();
const PORT = 3000;
server.use(express.json());


const pg = require('knex')({
    client: 'pg',
    version: '15',
    searchPath: ['knex', 'public'],
    connection: process.env.PG_CONNECTION_STRING ? process.env.PG_CONNECTION_STRING : 'postgres://admin:admin@store:5432/spaceShipsApi'
});




/**
 * initializations of the database tables 
 * addition of the planets table
 */
async function initialiseTables() {

    
    await pg.schema.hasTable('spaceShipsApi').then(async (exists) => {
        if (!exists) {
            await pg.schema
                .createTable('spaceShipsApi', (table) => {
                    table.increments();
                    table.string('name');
                    table.string('motor');
                    table.string('wings');
                    table.string('reactor');
                    table.string('shield');
                    table.string('weapon');
                    table.string('pilot');

                    table.timestamps(true, true);
                })
                .then(async () => {
                    console.log('created');
                });
        } else {
            console.log('already exists')
        }
    });
}

initialiseTables();

server.get("/ships", async (req, res) => {
    const ships = await pg.select().from("spaceShipsApi");
    res.json(ships);
});

/*
server.post("/postships", async (req, res) => {
    const { name, motor, wings, reactor, shield, weapon, pilot } = req.body;
    const ship = await pg("spaceShipsApi").insert({
        name,
        motor,
        wings,
        reactor,
        shield,
        weapon,
        pilot
    });
    res.json(ship);
});*/








/** 
 * @listens port
 * @returns {string} - message to confirm server is running on port 3000
 */
/*
app.listen(3000,(err) =>{

    if(!err) console.log('Yo! ;D running on port 3000')

    else console.log('D: ' +err)
});
*/


/** 
 * New Get 2
 * Get the list of the generated SpaceShips 
 * 
 */
/*
 app.get('/spaceShipData', async (req,res)=>{

    try{
        //connect to the db
        await client.connect();

        const myCollectionArray = await collection.find().toArray(); //array of all generated spaceships

        console.log('let s goooo :>');

        //Send back the data with the response
        res.status(200).send(myCollectionArray);

        //print let s gooo :> in the console juste for fun hahaha 
        console.log('let s goooo :>')
    }catch(error){
        console.log(error)
        res.status(500).send({
            error: '>:< Something went wrong!',
            value: error
        });
    }finally {
        await client.close();
    }
  
});


/** 
 * New Get 
 * Get the generated Space Ship his name, Power, Speed, ...
 * 
 */
/*
 app.get('/result', async (req,res)=>{

    try{
        //connect to the db
        await client.connect();

        const myCollectionArray = await collection.find().toArray(); //the generated data

        console.log('let s goooo :>');

        //Send back the data with the response
        res.status(200).send(myCollectionArray);

        //print let s gooo :> in the console juste for fun hahaha 
        console.log('let s goooo :>')
    }catch(error){
        console.log(error)
        res.status(500).send({
            error: '>:< Something went wrong!',
            value: error
        });
    }finally {
        await client.close();
    }
  
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




/** 
 * New Post 
 * The Answers to the questions generate a Customized Space Ship
 * The Post contains Questions to the Answers + SpaceShip Name
 */
/*
 app.post('/postShip', async (req, res) => {

    try{
        //connect to the db
        await client.connect();
       
        // add the new comment 
        let newAnswers = {
            spaceShipName: req.body.spaceShipName,
            answer1: req.body.answer[0],
            answer2: req.body.answers[1],
            answer3: req.body.answers[2],
            answer4: req.body.answers[3]

        }
        
        // Insert into the database
        let insertResult = await collection.insertOne(newAnswers);

        //Send back successmessage with the a yoohoo just for fun
        res.status(201).send(`:> Yooohoo ship succesfully generated with id `);
        
    }catch(error){
        console.log(error);
        res.status(500).send({
            error: '>:< Something went wrong',
            value: error
        });
    }
    finally {
        await client.close();
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
 * @param {Boolean} fictional Is the spaceship fictional?
 * @param {String} img URL of the spaceship image
 * @returns retunrSpaceShip - The spaceship that was added
 */




/**
 * New Delete 
 * delete your Generated SpaceShip
 *  
 **/
/*
 app.delete('/deleteOneShip/:id', async (req,res) => {
 
    try{

        //connect to the db
        await client.connect();

        // delete the spaceship
        let result = await collection.deleteOne({_id: ObjectId(req.params.id)});
         //Send back successmessage with the deleted spaceship
        res.status(201).json(result);

        // print Noooo after the spaceship is deleted just for fun HAHA XD
        console.log('nooo :<');
       // return;
    }catch(error){
        console.log(error);

        //if there is an error send back the error message with a small emoji
        res.status(500).send({
            error: '>:< Something went wrong',
            value: error
        });
    }finally {
        await client.close();
    }
});




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