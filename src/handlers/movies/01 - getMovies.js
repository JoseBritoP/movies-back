// Controllers:

const { getMovies, getMoviesByName, getMoviesByGenres,getMovieByID,getTop5Movies, getDeletedMovies} = require('../../controllers/movies/index')

// Handler

const getAllMovies = async (req,res) => {
  const { title } = req.query;
  try {
    const movies = title ? await getMoviesByName(title) : await getMovies();
    return res.status(200).json(movies)
  } catch (error) {
    return res.status(404).json({error: error.message});    
  }
};

const getMovieById = async (req,res) => {
  const {id} = req.params;
  try {
    const movie = await getMovieByID(id);
    return res.status(200).json(movie);
  } catch (error) {
    return res.status(404).json({error: error.message});
  }
};

const getMoviesByGenre = async (req,res) => {
  const {genre} = req.params;
  try {
    const movies = await getMoviesByGenres(genre);
    return res.status(200).json(movies);
  } catch (error) {
    return res.status(404).json({error: error.message});
  }
};

const getTopMovies = async (req,res) => {
  try {
    const topMovies = await getTop5Movies();
    return res.status(200).json(topMovies);
  } catch (error) {
    return res.status(404).json({error: error.message});
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
  getAllMovies, getMovieById,getMoviesByGenre,getTopMovies,getAllDeletedMovies
};