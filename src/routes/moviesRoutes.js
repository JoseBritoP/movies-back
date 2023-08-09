const { Router } = require('express');

// Handlers

const {
  getAllMovies,getMovieById,getMoviesByGenre,getTopMovies,createMovie,editMovie,updateMovie,deleteMovie
} = require('../handlers/moviesHandlers');

// Router

const moviesRouter = Router();

// Enrutado

moviesRouter.get('/',getAllMovies);
moviesRouter.get('/top',getTopMovies);
moviesRouter.get('/:id',getMovieById);
moviesRouter.get('/genre/:genre',getMoviesByGenre);
moviesRouter.post('/',createMovie);
moviesRouter.put('/update/:id',updateMovie);
moviesRouter.patch('/edit/:id',editMovie);
moviesRouter.put('/delete/:id',deleteMovie);

module.exports = moviesRouter;