const { Router } = require('express');

// Handlers

const {
  getAllMovies,getMovieById,getMoviesByGenre,getTopMovies,createMovie,editMovie,updateMovie,deleteMovie,restoreMovie,getAllDeletedMovies
} = require('../handlers/moviesHandlers');

// Router

const moviesRouter = Router();

// Enrutado

moviesRouter.get('/',getAllMovies);
moviesRouter.get('/top',getTopMovies);
moviesRouter.get('/genre/:genre',getMoviesByGenre);
moviesRouter.get('/delete',getAllDeletedMovies)
moviesRouter.get('/:id',getMovieById);
moviesRouter.post('/',createMovie);
moviesRouter.put('/update/:id',updateMovie);
moviesRouter.patch('/edit/:id',editMovie);
moviesRouter.put('/delete/:id',deleteMovie);
moviesRouter.put('/restore/:id',restoreMovie);

module.exports = moviesRouter;