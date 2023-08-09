const { Movie, Genre } = require('../../db');

const patchMovie = async (id,title,year,rated,released,duration,director,plot,language,poster,metascore) => {
  // console.log(data)

  const editedMovie = await Movie.findByPk(id,{
    include:{
      model: Genre,
      attributes: ["id","name"],
      through: { attributes: [] },
    },
  });

  editedMovie.title = title || editedMovie.title;
  editedMovie.year = year || editedMovie.year;
  editedMovie.rated = rated || editedMovie.rated;
  editedMovie.released = released || editedMovie.released;
  editedMovie.duration = duration || editedMovie.duration;
  editedMovie.director = director || editedMovie.director;
  editedMovie.plot = plot || editedMovie.plot;
  editedMovie.language = language || editedMovie.language;
  editedMovie.poster = poster || editedMovie.poster;
  editedMovie.metascore = metascore || editedMovie.metascore;

  await editedMovie.save();

  return editedMovie
};

module.exports = patchMovie;