const { Router } = require('express');

// Handlers:

const { getAllGenres } = require('../handlers/genresHandlers');

// Router

const genresRouter = Router();

// Enrutado:

genresRouter.get('/',getAllGenres);

module.exports = genresRouter;
// 