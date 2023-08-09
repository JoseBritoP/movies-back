const {validateMovie} = require('../../schema/Movie');

const {postMovie} = require('../../controllers/movies/index')

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
};

module.exports = createMovie;