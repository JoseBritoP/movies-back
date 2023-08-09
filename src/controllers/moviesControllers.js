const moviesJson = require('../data/movies.json');
const { Movie, Genre } = require('../db');
const cleanArray = require('../helpers/cleanArrayMovies');

const getMovies = async () => {

  const movies = moviesJson.map((movie)=>{
    return {
      title: movie.title,
      year: movie.year,
      rated: movie.rated,
      released: movie.released,
      duration: movie.duration,
      genre: movie.genre,
      director: movie.director,
      plot: movie.plot,
      language: movie.language,
      poster: movie.poster,
      metascore: movie.metascore,
    }
  });

  for (const movie of movies) {
    const { genre, title } = movie;

    const [newMovie] = await Movie.findOrCreate({
      where: { title: title }, // Buscar por título
      defaults: {
        year: movie.year,
        rated: movie.rated,
        released: movie.released,
        duration: movie.duration,
        director: movie.director,
        plot: movie.plot,
        language: movie.language,
        poster: movie.poster,
        metascore: movie.metascore,
      },
    });

    const genresInBDD = await Genre.findAll({ where: { name: genre } });
    await newMovie.addGenres(genresInBDD);
  }


  const moviesBDD = await Movie.findAll({include:{
    model:Genre,
    attributes:["id","name"],
    through: { attributes: [] }
  }});

  return moviesBDD
};

const getMoviesByName = (Title) => {
  // // console.log(Title)
  // const filteredMovies = movies.filter((movie)=> movie.Title.toLowerCase().includes(Title.toLowerCase()));
  // // console.log(filteredMovies)
  // if(filteredMovies.length === 0) throw Error(`No se encontraron películas llamadas ${Title}`);
  // const cleanMoviesInfo = cleanArray(filteredMovies)
  // // return filteredMovies;
  // return cleanMoviesInfo
};

const getMoviesByGenres = (genre) => {
  // // console.log(genre)
  // const filteredMoviesByGenre = movies.filter((movie) => movie.Genre.toLowerCase().includes(genre.toLowerCase()));
  // if(filteredMoviesByGenre.length === 0) throw Error(`No existen películas con el género: ${genre}`);
  // const cleanMoviesInfo = cleanArray(filteredMoviesByGenre);
  return cleanMoviesInfo;
};

const getMovieByID = (id) => {
  // const movie = movies.find((movie) => movie.id === +id)
  // if(!movie) throw Error(`No se encontró la película de id: ${id}`);
  // return movie;
};

const postMovie = async (title,year,rated,released,duration,genre,director,plot,language,poster,metascore) => {

  //Validación que los géneros existan: 
  const genresFormat = genre.map(async (genreName) => {
    const genreInBDD = await Genre.findOne({ where: { name: genreName } });
    if(!genreInBDD) throw new Error(`El género "${genreName}" no existe en la base de datos.`);
    return { id: genreInBDD.id, name: genreInBDD.name };
  });
    
  const resolvedGenres = await Promise.all(genresFormat);

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

const patchMovie = () => {};

const putMovie = () => {};

const deleteMovieById = () => {};

module.exports = {
  getMovies, getMoviesByName, getMoviesByGenres,getMovieByID,postMovie,patchMovie,putMovie,deleteMovieById
}