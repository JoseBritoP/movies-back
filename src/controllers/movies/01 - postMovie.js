const { Movie, Genre } = require('../../db');

const postMovie = async (title,year,rated,released,duration,genre,director,plot,language,poster,metascore) => {
  console.log(genre)
  //Validación que los géneros existan: 
  const genresFormat = genre.map(async (genreName) => {
    const genreInBDD = await Genre.findOne({ where: { name: genreName } });
    if(!genreInBDD) throw new Error(`El género "${genreName}" no existe en la base de datos.`);
    return { id: genreInBDD.id, name: genreInBDD.name };
  });
    
  const resolvedGenres = await Promise.all(genresFormat);
  // Creación de la película:
  const movieFormat = {
    title,
    year,
    rated,
    released,
    duration,
    director,
    plot,
    language,
    poster,
    metascore
  };

  const newMovie = await Movie.create(movieFormat);

  // Relación

  const genresInBDD = await Genre.findAll({where:{name:resolvedGenres.map((genre)=>genre.name)}});
  console.log(genresInBDD)

  await newMovie.addGenres(genresInBDD);

  if(!newMovie) throw Error(`No se pudo crear la película: ${title}`);

  return {
    id: newMovie.id,
    title: newMovie.title,
    year: newMovie.year,
    rated: newMovie.rated,
    released: newMovie.released,
    duration: newMovie.duration,
    director: newMovie.director,
    plot: newMovie.plot,
    language: newMovie.language,
    poster: newMovie.poster,
    genre:genresInBDD,
    metascore: newMovie.metascore,
  }
  
};

module.exports = postMovie;