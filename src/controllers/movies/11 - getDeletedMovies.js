const { Movie, Genre} = require('../../db');

const getDeletedMovies = async () => {

  const deletedMovies = await Movie.findAll({
    include:{
      model: Genre,
      attributes:["id","name"],
      through: { attributes: [] },
    },
    where:{
      view: false,
    }
  });

  if(deletedMovies.length === 0) throw Error(`No hay peliculas borradas`);

  return deletedMovies;
};

module.exports = getDeletedMovies;