const express = require('express');
const app = express();
//var bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb+srv://admin:1234@cluster0.fgewj.mongodb.net/dev5?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  
 
});

const myDataBase = 'dev5';
const db = client.db(myDataBase);

const collection = db.collection('spaceships');
const morgan = require('morgan');

app.use(express.static('public'));
    app.use(morgan("dev"))
    .use(express.json())
   




app.listen(3000,(err) =>{

    if(!err) console.log(':> running on port 3000')

    else console.log('>:< ' +err)
});

/**
 * @api {get} /spaceships Get all spaceships
 * returns all spaceships
 */
app.get('/spaceShipData', async (req,res)=>{

    try{
        //connect to the db
        await client.connect();

        const bpl = await collection.find({}).toArray();

        console.log('let s goooo :>')

        //Send back the data with the response
        res.status(200).send(bpl);

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
 * @api {post} /spaceships Add a spaceship
 * @body {String} name Name of the spaceship
 * @body {Boolean} fictional Is the spaceship fictional?
 * @body {String} img URL of the spaceship image
 */
app.post('/postShip', async (req, res) => {

    try{
        //connect to the db
        await client.connect();
       
        // add the new comment 
        let newShip = {
            name: req.body.spaceShipName,
            fiction: req.body.fiction,
            img: req.body.img

        }
        
        // Insert into the database
        let insertResult = await collection.insertOne(newShip);

        //Send back successmessage with the a yoohoo just for fun
        res.status(201).send(`:> Yooohoo ship succesfully saved with id `);
        
    }catch(error){
        console.log(error);
        res.status(500).send({
            error: '>:< Something went wrong',
            value: error
        });
    }finally {
        await client.close();
    }
});



/**
 * @api {delete} /spaceships/:id Delete a spaceship
 * @apiParam {String} id ID of the spaceship
 */
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
        return;
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
 * @api {put} /spaceships/:id Update a spaceship
 * @apiParam {String} id ID of the spaceship
 * @body {String} name new name of the spaceship
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
        return;
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


// play a game with me 
// if you find the easter egg you will get a cookie
// ok i will play with you
// ok so the easter egg is in the code
// wtf are you sure
// yes i am sure
//so you say that the easter egg is in the code
// yes
// i don't find it
// you have to find it
//pls help me
// i can't help you
// bro you now where is the easter egg
// yes i know
// ok so tell me
// no
// You have to say where is the easter egg it's a order
// no
// ok i will find it
// ok
// ok i found it
// ok
// ok so where is the easter egg
// no
// ok i will find it
// ok
// there is no easter egg
// yes there is
// no there is not
