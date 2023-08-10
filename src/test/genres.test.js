const server = require('../index')
const request = require('supertest');

describe('GET /genres',()=>{
  test('should respond with a 200 status code',async ()=>{
    const response = await request(server).get('/genres').send();
    // console.log(response)
    expect(response.status).toBe(200);
  });
  test('should response with an array',async ()=>{
    const response = await request(server).get('/genres').send();
    expect(response.body).toBeInstanceOf(Array)
  })
});