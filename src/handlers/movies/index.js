const {
  getAllMovies, getMovieById,getMoviesByGenre,getTopMovies,getAllDeletedMovies
} = require('./01 - getMovies');

const {
  updateMovie,deleteMovie,restoreMovie
} = require('./02 - putMovies');

const createMovie = require('./03 - postMovies');

const editMovie = require('./04 - patchMovies');

module.exports = {
  getAllMovies, getMovieById,getMoviesByGenre,getTopMovies,getAllDeletedMovies,  updateMovie,deleteMovie,restoreMovie, createMovie, editMovie
}