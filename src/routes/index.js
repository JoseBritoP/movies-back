const { Router } = require("express");

// Importamos los routers

const moviesRouter = require('./moviesRoutes');

// Router

const router = Router();

// Conexión:

router.use('/movies',moviesRouter)

module.exports = router;