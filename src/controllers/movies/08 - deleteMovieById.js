const { Movie, Genre} = require('../../db')

const deleteMovieById = async (id) => {

  if (!Number(id)) throw Error(`El id de la película debe ser numérico`);

  const deletedMovie = await Movie.findByPk(id,{
    include:{
      model:Genre,
      attributes: ["id","name"],
      through: { attributes: [] },
    }
  });

  deletedMovie.view = false,
  await deletedMovie.save();

  return deletedMovie;
};

module.exports = deleteMovieById;