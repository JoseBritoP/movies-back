const { Router } = require("express");

// Importamos los routers

const moviesRouter = require('./moviesRoutes');
const genresRouter = require('./genresRoutes');

// Router

const router = Router();

// Conexión:

router.use('/movies',moviesRouter)
router.use('/genres',genresRouter);

module.exports = router;