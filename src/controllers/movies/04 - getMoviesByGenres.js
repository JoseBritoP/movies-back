const { Op } = require('sequelize');
const { Movie, Genre} = require('../../db');

const getMoviesByGenres = async (genre) => {
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

  return moviesByGenre;
};

module.exports = getMoviesByGenres;