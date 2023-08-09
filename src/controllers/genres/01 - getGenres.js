const { Genre } = require('../../db');

const genresJson = require('../../data/genres.json');

const getGenres = () => {
  const genres = genresJson.map((genre)=>{
    return {
      name:genre.name,
    }
  });

  const promises = genres.map((genre)=>{
    return Genre.findOrCreate({where:genre});
  });

  return Promise.all(promises)
  .then(()=>{
    const genres = Genre.findAll({
      order:[
        ["name","ASC"]
      ]
    });
    if(genres.length === 0) throw Error(`No se pudo llenar la base de datos con los géneros`);
    return genres;
  })
  .catch((error)=>{
    throw Error(error.message)
  })
};

module.exports = getGenres;