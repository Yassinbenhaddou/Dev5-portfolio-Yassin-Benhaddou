const request = require('supertest');
const app = require('../index.js');


describe('GET /ships', () => {
  it('should return a 200 OK status code', async () => {
    const res = await request(app).get('/ships');
    expect(res.status).toBe(200);
  });

  it('should return an array of ships', async () => {
    const res = await request(app).get('/ships');
    expect(Array.isArray(res.body)).toBe(true);
  });
});