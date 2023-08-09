// Controllers

const {getGenres} = require('../controllers/genresControllers');

// Handlers:

const getAllGenres = async (req,res) => {
  try {
    const genres = await getGenres();
    return res.status(200).json(genres);
  } catch (error) {
    return res.status(404).json({error: error.message});
  }
};

module.exports = {
  getAllGenres
}