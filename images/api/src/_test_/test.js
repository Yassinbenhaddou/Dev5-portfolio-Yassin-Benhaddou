//Description: This file contains the test for the API routes
//To use this test, change the start command in the Dockerfile to "test"

// require the supertest module t
const request= require('supertest');

// require the app  from the index.js file
const app = require('../index.js');

console.log("start test");


/** 
 * test suite for the GET /ships route
 */
describe('GET /ships/:id', () => {
  // Test to get a single ship record using the route /ships/:id
  it('returns the ship with the specified id', async () => {
    // Make a GET request to the route with the id of the ship to be retrieved
    const res = await request(app).get('/ships/1');
    // Check the status code of the response
    expect(res.statusCode).toEqual(200);
    // Check that the response body is defined
    expect(res.body).toBeDefined();
    // Check that the response body is an array
    expect(Array.isArray(res.body)).toBe(true);
  });
});

/** 
 * test suite for the GET /ships route
 */
describe('GET /ships', () => {
  it('returns all ships from the database', async () => {
    // Make a GET request to the route (/ships)
    const res = await request(app).get('/ships');
    // Check the status code of the response
    expect(res.statusCode).toEqual(200);
    // Check that the response body is defined
    expect(res.body).toBeDefined();
    // Check that the response body is an array
    expect(Array.isArray(res.body)).toBe(true);
  });
});


/**
 * test suite for the POST /PostShips route
 * to make this test we will add a new ship to the database
 * 
 */
describe('POST /PostShips', () => {
  it('adds a new ship to the database', async () => {
    // Make a POST request to the route (/PostShips) to send the data of the new ship
    const res = await request(app)
      .post('/PostShips')
      .send({
        name: 'Test Ship',
        frontHead: 'frontHead',
        body: 'body',
        backPart: 'backPart',
        leftWing: 'leftWing',
        rightWing: 'rightWing',
        frontHeadColor: '#000000',
        bodyColor: '#000000',
        backPartColor: '#000000',
        leftWingColor: '#000000',
        rightWingColor: '#000000'
      });
      console.log(res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeDefined();
  });
});






