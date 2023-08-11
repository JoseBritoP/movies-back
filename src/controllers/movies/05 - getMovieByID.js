const { Movie, Genre } = require('../../db');

const getMovieByID = async (id) => {
  if (!Number(id)) throw Error(`El id de la película debe ser numérico`);

  const movie = await Movie.findOne({
    where: {
      id: id,
      view: true,
    },
    include: {
      model: Genre,
      attributes: ["id", "name"],
      through: { attributes: [] },
    },
  });

  if (!movie) throw Error(`Movie with ID ${id} does not exist`);

  return movie;
};

module.exports = getMovieByID;