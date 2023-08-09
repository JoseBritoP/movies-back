const movies = require('../data/movies.json');
const cleanArray = require('../helpers/cleanArrayMovies')
const getMovies = () => {
  const cleanMoviesInfo = cleanArray(movies);
  // return movies;
  return cleanMoviesInfo
};

const getMoviesByName = (Title) => {
  // console.log(Title)
  const filteredMovies = movies.filter((movie)=> movie.Title.toLowerCase().includes(Title.toLowerCase()));
  // console.log(filteredMovies)
  if(filteredMovies.length === 0) throw Error(`No se encontraron películas llamadas ${Title}`);
  const cleanMoviesInfo = cleanArray(filteredMovies)
  // return filteredMovies;
  return cleanMoviesInfo
};

const getMoviesByGenres = (genre) => {
  // console.log(genre)
  const filteredMoviesByGenre = movies.filter((movie) => movie.Genre.toLowerCase().includes(genre.toLowerCase()));
  if(filteredMoviesByGenre.length === 0) throw Error(`No existen películas con el género: ${genre}`);
  const cleanMoviesInfo = cleanArray(filteredMoviesByGenre);
  return cleanMoviesInfo;
};

const getMovieByID = (id) => {
  const movie = movies.find((movie) => movie.id === +id)
  if(!movie) throw Error(`No se encontró la película de id: ${id}`);
  return movie;
};

const postMovie = (Title,Year,Released,Runtime,Genre,Director,Plot,Language,Country,MetaScore,Images) => {

};

const patchMovie = () => {};

const putMovie = () => {};

const deleteMovieById = () => {};

module.exports = {
  getMovies, getMoviesByName, getMoviesByGenres,getMovieByID,postMovie,patchMovie,putMovie,deleteMovieById
}