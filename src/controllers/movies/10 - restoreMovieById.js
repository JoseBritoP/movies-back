const { Movie, Genre} = require('../../db')

const restoreMovieById = async (id) => {

  if (!Number(id)) throw Error(`El id de la película debe ser numérico`);

  const restoredMovie = await Movie.findByPk(id,{
    include:{
      model:Genre,
      attributes: ["id","name"],
      through: { attributes: [] },
    }
  });

  restoredMovie.view = true,
  
  await restoredMovie.save();

  return restoredMovie;
};

module.exports = restoreMovieById;