
const {postMovie} = require('../../controllers/movies/index')

const createMovie = async (req,res) => {
  const {title,year,rated,released,duration,genre,director,plot,language,poster} = req.body;
  try {
    const newMovie = await postMovie(title,year,rated,released,duration,genre,director,plot,language,poster)
    return res.status(201).json(newMovie);
  } catch (error) {
    console.log(error.message)
    return res.status(422).json({error: error.message});
  }
};

module.exports = createMovie;