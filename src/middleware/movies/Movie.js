const {validateMovie} = require('../../schema/Movie');

const validate = async (req,res,next) => {
  try {
    const result = await validateMovie(req.body);
    if (result.error) throw new Error(JSON.stringify(result.error));
    next();
  } catch (error) {
    return res.status(400).json({ error: JSON.parse(error.message) });
  }
};

module.exports = validate;