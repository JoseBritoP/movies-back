const { Movie, Genre} = require('../../db')

const deleteMovieById = async (id) => {

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