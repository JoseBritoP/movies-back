const { Router } = require('express');

// Handlers

const {
  getAllMovies,getMovieById,getMoviesByGenre,createMovie,editMovie,updateMovie,deleteMovie
} = require('../handlers/moviesHandlers');

// Router

const moviesRouter = Router();

// Enrutado

moviesRouter.get('/',getAllMovies);
moviesRouter.get('/:id',getMovieById);
moviesRouter.get('/genre/:genre',getMoviesByGenre);
moviesRouter.post('/',createMovie);
moviesRouter.patch('/:id',editMovie);
moviesRouter.put('/:id',updateMovie);
moviesRouter.put('/delete/:id',deleteMovie)

module.exports = moviesRouter;