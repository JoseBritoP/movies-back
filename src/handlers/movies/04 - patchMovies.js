const {validateParcialMovie} = require('../../schema/Movie');

const {patchMovie} = require('../../controllers/movies/index')

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

module.exports = editMovie;