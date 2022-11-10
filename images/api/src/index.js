const express = require('express'); //require express
const app = express(); //create express app
//var bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb'); //require mongodb

const uri = "mongodb+srv://admin:1234@cluster0.fgewj.mongodb.net/dev5?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const myDataBase = 'dev5'; //database name
const db = client.db(myDataBase); //client database

const collection = db.collection('spaceships'); //database collection
const morgan = require('morgan'); //require morgan

app.use(express.static('public'));
    app.use(morgan("dev"))
    .use(express.json())
   



/** 
 * @listens port
 * @returns {string} - message to confirm server is running on port 3000
 */
app.listen(3000,(err) =>{

    if(!err) console.log('Yo! ;D running on port 3000')

    else console.log('D: ' +err)
});



/** 
 * New Get 2
 * Get the list of the generated SpaceShips 
 * 
 */

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
 * New Put change your generated SpaceShip Name
 */

app.put('/shipsUpdate/:id', async (req,res) => {
    

    try{
         //connect to the db
        await client.connect();
        
         // Create the new space ship object
        let newShip = {
          
            name: req.body.spaceShipName
            
        }
        
        // Insert into the database
        let updateResult = await collection.updateOne({_id: ObjectId(req.params.id)}, 
        {$set: newShip});

         //Send back successmessage with the updated object
        res.status(201).json(updateResult);

        //print oK no problem bro after the spaceship is updated just for fun HAHA XD
        console.log('oK no problem bro :>');
       // return;
    }catch(error){
        console.log(error);
        res.status(500).send({
            error: ':< nooo Something went wrong',
            value: error
        });
    }finally {
        await client.close();
    }
});



/** 
 * 
 * input: answers to qustions
 * 
 * Output: Generated SpaceShip  and list of generated Spaceships of others users
 * 
 * 
 */

/*** 
 * template retunrSpaceShip:
 *  id: string - id of the spaceship
 *  name: string - name of the spaceship
 *  fictional: boolean - is the spaceship fictional
 *  img: string - url to the image of the spaceship
 * 
 * @api {delete} /spaceships/:id Delete a spaceship
 * @param {String} id ID of the spaceship
 * @return retunrSpaceShip
 */



/**
 * template retunrSpaceShip:
 *  id: string - id of the spaceship
 *  name: string - name of the spaceship
 *  fictional: boolean - is the spaceship fictional
 *  img: string - url to the image of the spaceship
 * 
 * @api {put} /spaceships/:id Update a spaceship
 * @param {String} id ID of the spaceship
 * @param {String} name new name of the spaceship
 * @return retunrSpaceShip
*/
/*app.put('/shipsUpdate/:id', async (req,res) => {
    

    try{
         //connect to the db
        await client.connect();
        
         // Create the new space ship object
        let newShip = {
          
            name: req.body.spaceShipName
            
        }
        
        // Insert into the database
        let updateResult = await collection.updateOne({_id: ObjectId(req.params.id)}, 
        {$set: newShip});

         //Send back successmessage with the updated object
        res.status(201).json(updateResult);

        //print oK no problem bro after the spaceship is updated just for fun HAHA XD
        console.log('oK no problem bro :>');
       // return;
    }catch(error){
        console.log(error);
        res.status(500).send({
            error: ':< nooo Something went wrong',
            value: error
        });
    }finally {
        await client.close();
    }
});*/


/**
 * template retunrSpaceShip:
 *  id: string - id of the spaceship
 *  name: string - name of the spaceship
 *  fictional: boolean - is the spaceship fictional
 *  img: string - url to the image of the spaceship 
 * 
 * @api {put} /editShipImg/:id Update a spaceship image
 * @param {String} id ID of the spaceship
 * @param {String} img new image url of the spaceship
 * @return retunrSpaceShip
*//*
app.put('/editShipImg/:id', async (req,res) => {
        
    
        try{
             //connect to the db
            await client.connect();
            
             // Create the new space ship object
            let newShip = {
            
                img: req.body.img
                
            }
            
            // Insert into the database
            let updateResult = await collection.updateOne({_id: ObjectId(req.params.id)}, 
            {$set: newShip});
    
             //Send back successmessage with the updated object
            res.status(201).json(updateResult);
    
            //print oK no problem bro after the spaceship is updated just for fun HAHA XD
            console.log('oK no problem bro :>');
            //return;
        }catch(error){
            console.log(error);
            res.status(500).send({
                error: ':< nooo Something went wrong',
                value: error
            });
        }finally {
            await client.close();
        }
});*/

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

