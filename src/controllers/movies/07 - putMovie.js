const { Movie, Genre } = require('../../db');

const putMovie = async (id,title,year,rated,released,duration,genre,director,plot,language,poster,metascore) => {
  // console.log(data)

  const genresFormat = genre.map(async (genreName) => {
    const genreInBDD = await Genre.findOne({ where: { name: genreName } });
    if(!genreInBDD) throw new Error(`El género "${genreName}" no existe en la base de datos.`);
    return { id: genreInBDD.id, name: genreInBDD.name };
  });
    
  const resolvedGenres = await Promise.all(genresFormat);

  const updatedMovie = await Movie.findByPk(id,{
    include:{
      model: Genre,
      attributes: ["id","name"],
      through: { attributes: [] },
    },
  });

  updatedMovie.title = title || updatedMovie.title;
  updatedMovie.year = year || updatedMovie.year;
  updatedMovie.rated = rated || updatedMovie.rated;
  updatedMovie.released = released || updatedMovie.released;
  updatedMovie.duration = duration || updatedMovie.duration;
  updatedMovie.director = director || updatedMovie.director;
  updatedMovie.plot = plot || updatedMovie.plot;
  updatedMovie.language = language || updatedMovie.language;
  updatedMovie.poster = poster || updatedMovie.poster;
  updatedMovie.metascore = metascore || updatedMovie.metascore;

  await updatedMovie.save();

  const genresInBDD = await Genre.findAll({where:{name:resolvedGenres.map((genre)=>genre.name)}});
  // console.log(genresInBDD)

  await updatedMovie.setGenres(genresInBDD);

  return {
    id: updatedMovie.id,
    title: updatedMovie.title,
    year: updatedMovie.year,
    rated: updatedMovie.rated,
    released: updatedMovie.released,
    duration: updatedMovie.duration,
    director: updatedMovie.director,
    plot: updatedMovie.plot,
    language: updatedMovie.language,
    poster: updatedMovie.poster,
    metascore: updatedMovie.metascore,
    Genres: resolvedGenres
  }
};

module.exports = putMovie;