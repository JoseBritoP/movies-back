const postMovie = require('./01 - postMovie');
const getMovies = require('./02 - getMovies');
const getMoviesByName = require('./03 - getMoviesByName');
const getMoviesByGenres = require('./04 - getMoviesByGenres');
const getMovieByID = require('./05 - getMovieByID');
const patchMovie = require('./06 - patchMovie');
const putMovie = require('./07 - putMovie');
const deleteMovieById = require('./08 - deleteMovieById');

module.exports = {
  getMovies, getMoviesByName, getMoviesByGenres,getMovieByID,postMovie,patchMovie,putMovie,deleteMovieById
}