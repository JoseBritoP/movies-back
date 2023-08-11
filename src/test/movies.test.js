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

describe('GET /movies?title=queryTitle',()=>{
  describe('Success case', () => {
    const queryTitle = 'Star';
  
    test('should respond with a status code 200', async () => {
      const response = await request(server).get(`/movies?title=${queryTitle}`).send();
      expect(response.status).toBe(200);
      expect(response.ok).toBe(true);
    });
  
    test(`should response with an array of movies containing "${queryTitle}" in title`, async () => {
      const response = await request(server).get(`/movies?title=${queryTitle}`).send();
      expect(response.status).toBe(200);
      expect(response.ok).toBe(true);
      expect(response.body).toBeInstanceOf(Array);
  
      const movieTitles = response.body.map(movie => movie.title);
      expect(movieTitles).toEqual(expect.arrayContaining([expect.stringContaining(queryTitle)]));
    });
  });
  describe('Error case',()=>{
    const queryTitle = "Harry"
    test('should respond with a status code 404',async()=>{
      const response = await request(server).get(`/movies?title=${queryTitle}`).send();
      expect(response.status).toBe(404);
      expect(response.ok).toBe(false);
    });
    test(`should response with message error: 'No movies called ${queryTitle}'`,async()=>{
      const response = await request(server).get(`/movies?title=${queryTitle}`).send();
      // console.log(response.error.text)
      // console.log(response.body)
      expect(response.status).toBe(404);
      expect(response.body.error).toBe(`No movies called ${queryTitle}`);
    });
  });
});

describe('GET /movies/genre/genreParams',()=>{
  describe('Success case',()=>{
    const genreParams = "Action"
    test('should respond with a status code 200',async()=>{
      const response = await request(server).get(`/movies/genre/${genreParams}`);
      expect(response.status).toBe(200);
      expect(response.ok).toBe(true);
    });
    test(`should response with an array of movies containing '${genreParams} in ther genres`,async()=>{
      const response = await request(server).get(`/movies/genre/${genreParams}`).send();
      expect(response.status).toBe(200);
      expect(response.ok).toBe(true);
      expect(response.body).toBeInstanceOf(Array);

      const movies = response.body;

      for (const movie of movies) {
        const genres = movie.Genres.map(genre => genre.name);
        expect(genres).toContain(genreParams);
      }
    });
  });
  describe('Success case',()=>{
    const genreParams = 'Terror';
    test('should respond with a status code 404',async()=>{
      const response = await request(server).get(`/movies/genre/${genreParams}`).send();
      expect(response.status).toBe(404);
      expect(response.ok).toBe(false);
      expect(response.clientError).toBe(true);
    });
    test(`should response with message error: 'No movies with genre: ${genreParams}'`,async()=>{
      const response = await request(server).get(`/movies/genre/${genreParams}`).send();
      expect(response.status).toBe(404);
      expect(response.body.error).toBe(`No movies with genre: ${genreParams}`);
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
    test('should response with top 5 movies',async ()=>{
      const response = await request(server).get('/movies/top').send();
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body).toHaveLength(5);
    });
  });
});

describe('GET /movies/:id',()=>{
  describe('Success case', ()=>{
    test('should respond with a 200 status code',async()=>{
      const response = await request(server).get('/movies/1').send();
      expect(response.status).toBe(200);
      expect(response.ok).toBe(true);
    });
    test('should response with an object',async ()=>{
      const response = await request(server).get('/movies/1').send();
      expect(response.body).toBeInstanceOf(Object)
    });
  });
  describe('Error case',()=>{
    const id = 1000
    test('should respond with a 404 status code', async ()=>{
      const response = await request(server).get(`/movies/${id}`);
      expect(response.status).toBe(404);
    });
    test(`should response with a message error like: 'Movie with ID ${id} does not exist'`,async()=>{
      const response = await request(server).get(`/movies/${id}`);
      expect(response.body.error).toBe(`Movie with ID ${id} does not exist`);
    });
  });
});

xdescribe('POST /movies',()=>{
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

xdescribe('PATCH EDIT /movies',()=>{

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