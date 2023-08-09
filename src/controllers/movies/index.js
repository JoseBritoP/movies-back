const postMovie = require('./01 - postMovie');
const getMovies = require('./02 - getMovies');
const getMoviesByName = require('./03 - getMoviesByName');
const getMoviesByGenres = require('./04 - getMoviesByGenres');
const getMovieByID = require('./05 - getMovieByID');
const patchMovie = require('./06 - patchMovie');
const putMovie = require('./07 - putMovie');
const deleteMovieById = require('./08 - deleteMovieById');
const getTop5Movies = require('./09 - getTop5Movies');
const restoreMovieById = require('./10 - restoreMovieById');
const getDeletedMovies = require('./11 - getDeletedMovies')

module.exports = {
  getMovies, getMoviesByName, getMoviesByGenres,getMovieByID,getTop5Movies,postMovie,patchMovie,putMovie,deleteMovieById,restoreMovieById,getDeletedMovies
}