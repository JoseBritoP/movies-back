const { Movie, Genre } = require('../../db');

const getMovieByID = async (id) => {
  if (!Number(id)) throw Error(`El id de la película debe ser numérico`);

  const movie = await Movie.findOne({
    where: {
      id: id,
      view: false,
    },
    include: {
      model: Genre,
      attributes: ["id", "name"],
      through: { attributes: [] },
    },
  });

  if (!movie) throw Error(`No existe la película de id: ${id}`);

  return movie;
};

module.exports = getMovieByID;