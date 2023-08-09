// Controllers:

const {
  getMovies, getMoviesByName, getMoviesByGenres,getMovieByID,getTop5Movies,postMovie,patchMovie,putMovie,deleteMovieById,restoreMovieById,getDeletedMovies
} = require('../controllers/movies/index');
const { validateMovie,validateParcialMovie } = require('../schema/Movie');

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

const getTopMovies = async (req,res) => {
  try {
    const topMovies = await getTop5Movies();
    return res.status(200).json(topMovies);
  } catch (error) {
    return res.status(404).json({error: error.message});
  }
};

const createMovie = async (req,res) => {
  const result = await validateMovie(req.body)
  if(result.error){
    return res.status(400).json({error: JSON.parse(result.error.message)})
  }
  const {title,year,rated,released,duration,genre,director,plot,language,poster,metascore} = req.body;
  try {
    const newMovie = await postMovie(title,year,rated,released,duration,genre,director,plot,language,poster,metascore)
    return res.status(201).json(newMovie);
  } catch (error) {
    return res.status(422).json({error: error.message});
  }
  // return res.status(201).json({message:`Aqui se creará una pelicula`});
};

const editMovie = async (req,res) => {
  const { id } = req.params;
  const result = await validateParcialMovie(req.body);
  if(result.error){
    return res.status(400).json({error: JSON.parse(result.error.message)})
  }
  const { data } = result;
  const {title,year,rated,released,duration,director,plot,language,poster,metascore} = req.body;

  // console.log(data)
  try {
    const editedMovie = await patchMovie(id,title,year,rated,released,duration,director,plot,language,poster,metascore);
    return res.status(200).json(editedMovie)
  } catch (error) {
    return res.status(400).json({error: error.message})
  }
};

const updateMovie = async (req,res) => {
  const { id } = req.params;
  const result = await validateParcialMovie(req.body);
  if(result.error){
    return res.status(400).json({error: JSON.parse(result.error.message)})
  }

  const {title,year,rated,released,duration,genre,director,plot,language,poster,metascore} = req.body;
  try {
    const updatedMovie = await putMovie(id,title,year,rated,released,duration,genre,director,plot,language,poster,metascore);
    return res.status(200).json(updatedMovie);
  } catch (error) {
    return res.status(422).json({error: error.message});
  }
};

const deleteMovie = async (req,res) => {
  const { id } = req.params;
  try {
    const deletedMovie = await deleteMovieById(id);
    return res.status(200).json({deletedMovie:deletedMovie})
  } catch (error) {
    return res.status(400).json({error: error.message})
  }
  // return res.status(200).json({message:`Se borrará la película de id: ${id}`});
};

const restoreMovie = async (req,res) => {
  const { id } = req.params;
  try {
    const restoredMovie = await restoreMovieById(id);
    return res.status(200).json({restoredMovie:restoredMovie})
  } catch (error) {
   return res.status(400).json({error: error.message}); 
  }
};

const getAllDeletedMovies = async (req,res) => {
  try {
    const deletedMovies = await getDeletedMovies();
    return res.status(200).json({deletedMovies:deletedMovies})
  } catch (error) {
    return res.status(404).json({error: error.message});
  }
};

module.exports = {
  getAllMovies,getMovieById,getMoviesByGenre,getTopMovies,createMovie,editMovie,updateMovie,deleteMovie,restoreMovie,getAllDeletedMovies
}
