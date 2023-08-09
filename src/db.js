const { Sequelize } = require('sequelize');

// Models:

const MovieModel = require('./models/Movie');
const GenreModel = require('./models/Genre');

// Credenciales
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

// Instancia sequelize

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, { logging: false });
// Definir modelo

MovieModel(sequelize);
GenreModel(sequelize);

// Destructuring del modelo

const { Movie, Genre } = sequelize.models;

// Relación

Movie.belongsToMany(Genre,{through:"MoviesGenres"});
Genre.belongsToMany(Movie,{through:"MoviesGenres"});

module.exports = {
  sequelize,
  ...sequelize.models
}