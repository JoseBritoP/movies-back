const { Router } = require("express");

// Importamos los routers

const moviesRouter = require('./moviesRoutes');
const genresRouter = require('./genresRoutes');

// Router

const router = Router();

// Conexión:

router.use('/movies',moviesRouter)
router.use('/genres',genresRouter);

// Rutas no implementadas:
router.use((req, res, next) => {
  const error = new Error(`La ruta ${req.originalUrl} con el método ${req.method} no está implementada`);
  error.status = 404;
  next(error);
});

router.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message || 'Error interno del servidor'
  });
});

module.exports = router;