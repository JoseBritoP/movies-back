const { Movie, Genre } = require('../../db');
const { Op } = require('sequelize');

const getMoviesByName = async  (title) => {
  const formatTitle = title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();;
  const query = title.toLowerCase().trim();

  const formattedQuery = `%${title}%`

  const moviesByName = await Movie.findAll({
    include:{
      model:Genre,
      attributes:["id","name"],
      through: { attributes: [] }
    },
    where:[
      {
        title:{
          [Op.iLike]: formattedQuery,
        },
      },
      {
        view: true
      },
    ],
    order:[
      ["title","ASC"]
    ]
  });

  if(moviesByName.length === 0) throw Error(`No movies called ${formatTitle}`)
  return moviesByName;
};

module.exports = getMoviesByName;