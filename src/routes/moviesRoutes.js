const { Router } = require('express');

// Handlers

const  {
    getAllMovies,getMovieById,getMoviesByGenre,getTopMovies,createMovie,editMovie,updateMovie,deleteMovie,restoreMovie,getAllDeletedMovies } = require('../handlers/movies/index');

// Router

const moviesRouter = Router();

// Middleware

const postValidate = require('../middleware/movies/Movie');
const matchTitle = require('../middleware/movies/matchMovie')
const {cacheInit} = require('../middleware/cache/cache')

// Enrutado

moviesRouter.get('/',cacheInit,getAllMovies); //x
moviesRouter.get('/top',getTopMovies); //x
moviesRouter.get('/genre/:genre',getMoviesByGenre); //x
moviesRouter.get('/delete',getAllDeletedMovies)
moviesRouter.get('/:id',getMovieById); //x
moviesRouter.post('/',postValidate,matchTitle,createMovie); //x
moviesRouter.patch('/edit/:id',editMovie); //x
moviesRouter.put('/update/:id',updateMovie);
moviesRouter.put('/delete/:id',deleteMovie);
moviesRouter.put('/restore/:id',restoreMovie);

module.exports = moviesRouter;