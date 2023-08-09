const {validateParcialMovie} = require('../../schema/Movie');

const {putMovie,deleteMovieById,restoreMovieById} = require('../../controllers/movies/index')

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

module.exports = {
  updateMovie,deleteMovie,restoreMovie
}