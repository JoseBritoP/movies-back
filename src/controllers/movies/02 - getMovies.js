const { Movie, Genre } = require('../../db');

const moviesJson = require('../../data/movies.json');

const getMovies = async () => {

  const movies = moviesJson.map((movie)=>{
    return {
      title: movie.title,
      year: movie.year,
      rated: movie.rated,
      released: movie.released,
      duration: movie.duration,
      genre: movie.genre,
      director: movie.director,
      plot: movie.plot,
      language: movie.language,
      poster: movie.poster,
      metascore: movie.metascore,
    }
  });

  for (const movie of movies) {
    const { genre, title } = movie;

    const [newMovie] = await Movie.findOrCreate({
      where: { title: title }, // Buscar por título
      defaults: {
        year: movie.year,
        rated: movie.rated,
        released: movie.released,
        duration: movie.duration,
        director: movie.director,
        plot: movie.plot,
        language: movie.language,
        poster: movie.poster,
        metascore: movie.metascore,
      },
    });

    const genresInBDD = await Genre.findAll({ where: { name: genre } });
    await newMovie.addGenres(genresInBDD);
  }

  const moviesBDD = await Movie.findAll(
    {
      include:{
      model:Genre,
      attributes:["id","name"],
      through: { attributes: [] },
      },
      where:{
        view:true
      }
    },
  );

  if(moviesBDD.length === 0) throw Error('No hay películas a mostrar')

  return moviesBDD
};

module.exports = getMovies;