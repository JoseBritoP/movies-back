const { Movie, Genre} = require('../../db');

const getMoviesByGenres = (genre) => {
  // // console.log(genre)
  // const filteredMoviesByGenre = movies.filter((movie) => movie.Genre.toLowerCase().includes(genre.toLowerCase()));
  // if(filteredMoviesByGenre.length === 0) throw Error(`No existen películas con el género: ${genre}`);
  // const cleanMoviesInfo = cleanArray(filteredMoviesByGenre);
  // return cleanMoviesInfo;
};

module.exports = getMoviesByGenres;