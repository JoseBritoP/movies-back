const { Movie, Genre } = require('../../db');

const getTop5Movies = async () => {
  const topMovies = await Movie.findAll(
    {
      include:{
      model:Genre,
      attributes:["id","name"],
      through: { attributes: [] },
      },
      where:{
        view:true
      },
      order:[
        ["metascore","DESC"],
      ],
      limit:5
    },
  );

  if(topMovies.length === 0) throw Error('No hay películas a mostrar')

  return topMovies
};

module.exports = getTop5Movies;