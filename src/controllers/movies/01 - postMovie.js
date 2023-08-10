const { Movie, Genre } = require('../../db');

const postMovie = async (title, year, rated, released, duration, genre, director, plot, language, poster, metascore) => {
  
  const movieFormat = {
    title,
    year,
    rated,
    released,
    duration,
    director,
    plot,
    language,
    poster,
    metascore
  };

  const newMovie = await Movie.create(movieFormat);

  const genresInBDD = await Genre.findAll({ where: { name: genre.map(gen => gen) } });
  
  await newMovie.addGenres(genresInBDD);

  if (!newMovie) throw Error(`No se pudo crear la película: ${title}`);

  return {
    id: newMovie.id,
    title: newMovie.title,
    year: newMovie.year,
    rated: newMovie.rated,
    released: newMovie.released,
    duration: newMovie.duration,
    director: newMovie.director,
    plot: newMovie.plot,
    language: newMovie.language,
    poster: newMovie.poster,
    genre: genresInBDD,
    metascore: newMovie.metascore,
  };
};

module.exports = postMovie;