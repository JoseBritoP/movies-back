// Controllers:

const {
  getMovies, getMoviesByName, getMoviesByGenres,getMovieByID,postMovie,patchMovie,putMovie,deleteMovieById
} = require('../controllers/movies/index');
const { validateMovie } = require('../schema/Movie');

// Handlers:

const getAllMovies = async (req,res) => {
  const { title } = req.query;
  try {
    const movies = title ? await getMoviesByName(title) : await getMovies();
    return res.status(200).json(movies)
  } catch (error) {
    return res.status(404).json({error: error.message});    
  }
  // return res.status(200).json({message: `Aquí se mostrarán todas las peliculas`});
};

const getMovieById = async (req,res) => {
  const {id} = req.params;
  try {
    const movie = await getMovieByID(id);
    return res.status(200).json(movie);
  } catch (error) {
    return res.status(404).json({error: error.message});
  }
  // return res.status(200).json({message:`Aquí se mostrará a detalle la película de id: ${id}`});
};

const getMoviesByGenre = async (req,res) => {
  const {genre} = req.params;
  try {
    const movies = await getMoviesByGenres(genre);
    return res.status(200).json(movies);
  } catch (error) {
    return res.status(404).json({error: error.message});
  }
  // return res.status(200).json({message:`Aquí se mostrarán las películas de género ${genre}`})
};

const createMovie = async (req,res) => {
  const result = await validateMovie(req.body)
  if(result.error){
    return res.status(422).json({error: JSON.parse(result.error.message)})
  }
  const {title,year,rated,released,duration,genre,director,plot,language,poster,metascore} = req.body;
  try {
    const newMovie = await postMovie(title,year,rated,released,duration,genre,director,plot,language,poster,metascore)
    return res.status(201).json(newMovie);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
  // return res.status(201).json({message:`Aqui se creará una pelicula`});
};

const editMovie = (req,res) => {
  const { id } = req.params;
  return res.status(200).json({message:`Se editará parcialmente la información de la película: ${id}`});
};

const updateMovie = (req,res) => {
  const { id } = req.params;
  return res.status(200).json({message:`Se actualizará la película de la película: ${id}`});
};

const deleteMovie = async (req,res) => {
  const { id } = req.params;
  try {
    const deletedMovie = await deleteMovieById(id);
    return res.status(200).json(deletedMovie)
  } catch (error) {
    return res.status(400).json({error: error.message})
  }
  // return res.status(200).json({message:`Se borrará la película de id: ${id}`});
};

module.exports = {
  getAllMovies,getMovieById,getMoviesByGenre,createMovie,editMovie,updateMovie,deleteMovie
}
