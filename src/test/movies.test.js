const server = require('../index')
const request = require('supertest');

describe('GET /movies',()=>{
  describe('Success case',()=>{
    test('should respond with a 200 status code',async ()=>{
      const response = await request(server).get('/movies').send();
      // console.log(response)
      expect(response.status).toBe(200);
      expect(response.ok).toBe(true);
    });
    test('should response with an array',async ()=>{
      const response = await request(server).get('/movies').send();
      expect(response.body).toBeInstanceOf(Array)
    });
  });
});

describe('GET /movies/top',()=>{
  describe('Success case',()=>{
    test('should respond with a 200 status code',async()=>{
      const response = await request(server).get('/movies/top').send();
      expect(response.status).toBe(200)
      expect(response.ok).toBe(true)
    });
    test('should response with an array',async ()=>{
      const response = await request(server).get('/movies/top').send();
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body).toHaveLength(5);
    });
    test('should response with an 5 array length',async ()=>{
      const response = await request(server).get('/movies/top').send();
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body).toHaveLength(5);
    });
  });
});

describe('POST /movies',()=>{
  describe('Success case',()=>{
    test('should respond with a 201 status code',async()=>{
      const response = await request(server).post('/movies').send({
        "title": "first test",
        "year": 2009,
        "rated": "TV-MA",
        "released": "17 Dec 2009",
        "duration": 120,
        "genre": ["Action", "Adventure","Drama","Fantasy"],
        "director": "James tester",
        "plot": "The adventure of test",
        "language": "English",
        "poster": "http://test.page.com/testimage/testingimage.jpng",
        "metascore": 0
      });
      expect(response.status).toBe(201);
      expect(response.ok).toBe(true);
  
    });
    test('should respond with a content-type of application/json in header',async()=>{
      const response = await request(server).post('/movies').send({
        "title": "second test",
        "year": 2009,
        "rated": "TV-MA",
        "released": "17 Dec 2009",
        "duration": 120,
        "genre": ["Action", "Adventure","Drama","Fantasy"],
        "director": "James tester",
        "plot": "The adventure of test",
        "language": "English",
        "poster": "http://test.page.com/testimage/testingimage.jpng",
        "metascore": 0
      });
      expect(response.header['content-type']).toEqual(expect.stringContaining('json'));
  
    });
    test('should respond with a json object containing the new movie on id',async()=>{
      const response = await request(server).post('/movies').send({
        "title": "third tester",
        "year": 2009,
        "rated": "TV-MA",
        "released": "17 Dec 2009",
        "duration": 120,
        "genre": ["Action", "Adventure","Drama" , "Fantasy"],
        "director": "James tester",
        "plot": "The adventure of test",
        "language": "English",
        "poster": "http://test.page.com/testimage/testingimage.jpng",
        "metascore": 0
      });
      expect(response.body.id).toBeDefined();
    });
  });
  describe('Error case',()=>{

    const testMovie = {
      "title": "first test",
      "year": 2009,
      "rated": "TV-MA",
      "released": "17 Dec 2009",
      "duration": 120,
      "genre": ["Action", "Adventure","Drama","Fantasy"],
      "director": "James tester",
      "plot": "The adventure of test",
      "language": "English",
      "poster": "http://test.page.com/testimage/testingimage.jpng",
      "metascore": 0
    }

    test('should respond with a status 400',async()=>{
      const response = await request(server).post('/movies').send({});
      // console.log(response)
      expect(response.status).toBe(400);
      expect(response.badRequest).toBe(true);
    });
    test('should respond with a status 400 if is missing data',async()=>{
      const fields = [
        {},
        {title:"Test Title"},
        {year: 2001},
        {rated: "Test rated"},
        {released: "19 test Dic"},
        {duration: 120},
        {genre: ["Action"]},
        {director:"Test Director"},
        {plot: "Test plot testing"},
        {language: "Language test"},
        {poster: "https://test.com/testimage.jpg"},
        {metascore: 0}
      ]
      for (const body of fields){
        const response = await request(server).post('/movies').send(body);
        // console.log(response)
        expect(response.status).toBe(400);
      }
    });
  })
});

describe('PATCH EDIT /movies',()=>{

  test('should response with a status 200 when update the movie data',async()=>{
    const fields = [
      {title:"Test Title Edit"},
      {year: 2001},
      {rated: "Test rated Edit"},
      {released: "19 test Dic edit"},
      {duration: 120},
      {genre: ["Drama"]},
      {director:"Test Director Edit"},
      {plot: "Test plot testing Edit"},
      {language: "Language test Edit"},
      {poster: "https://test.com/testeditimage.jpg"},
      {metascore: 0}
    ];
    for (const body of fields){
      const response = await request(server).patch('/movies/edit/19').send(body);
      // console.log(response)
      expect(response.status).toBe(200);
    }
  });

});