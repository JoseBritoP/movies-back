const { Op } = require('sequelize');
const { Movie, Genre} = require('../../db');

const getMoviesByGenres = async (genre) => {
  const formatGenre = genre.charAt(0).toUpperCase() + genre.slice(1).toLowerCase();;

  const params = genre.toLowerCase().trim();

  const formattedQuery = `%${params}%`

  const moviesByGenre = await Movie.findAll({
    include:{
      model:Genre,
      attributes: ["id","name"],
      where:{
        name:{
          [Op.iLike]: formattedQuery
        },
      },
      through: { attributes: [] },
    },
    order:[
      ["title","ASC"]
    ],
    where:{
      view:true
    }
  });
  if(moviesByGenre.length === 0) throw Error(`No movies with genre: ${formatGenre}`)
  return moviesByGenre;
};

module.exports = getMoviesByGenres;