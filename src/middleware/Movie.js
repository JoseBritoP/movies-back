const {Movie} = require('../db');

const validateMovie = (req,res,next) => {
  try {
    
  } catch (error) {
    return res.status(400).json({error:error.message})
  }
};

module.exports = validateMovie;