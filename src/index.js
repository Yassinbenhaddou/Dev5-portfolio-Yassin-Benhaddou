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


/**
 * @api {put} /editShipImg/:id Update a spaceship image
 * @apiParam {String} id ID of the spaceship
 * @body {String} img new image url of the spaceship
*/
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