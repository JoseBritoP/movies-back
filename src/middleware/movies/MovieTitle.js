const { Movie, Genre } = require('../../db');

const matchTitle = async (req,res,next) => {
  const { title } = req.body;
  try {
    const existTitle = await Movie.findOne({
      include:{
        model:Genre,
        attributes: ["id","name"],
      },
      where:{
        title: title
      }
    });

    if(existTitle) throw Error(`Ya existe una película llamada: ${title}`)
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = matchTitle;