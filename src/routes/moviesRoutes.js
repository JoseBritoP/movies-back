const { Router } = require('express');

// Handlers

const  {
    getAllMovies,getMovieById,getMoviesByGenre,getTopMovies,createMovie,editMovie,updateMovie,deleteMovie,restoreMovie,getAllDeletedMovies } = require('../handlers/movies/index');

// Router

const moviesRouter = Router();

// Middleware

const postValidate = require('../middleware/movies/Movie');
const matchTitle = require('../middleware/movies/matchMovie')

// Enrutado

moviesRouter.get('/',getAllMovies);
moviesRouter.get('/top',getTopMovies);
moviesRouter.get('/genre/:genre',getMoviesByGenre);
moviesRouter.get('/delete',getAllDeletedMovies)
moviesRouter.get('/:id',getMovieById);
moviesRouter.post('/',postValidate,matchTitle,createMovie);
moviesRouter.patch('/edit/:id',editMovie);
moviesRouter.put('/update/:id',updateMovie);
moviesRouter.put('/delete/:id',deleteMovie);
moviesRouter.put('/restore/:id',restoreMovie);

module.exports = moviesRouter;