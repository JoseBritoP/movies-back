const { Movie, Genre } = require('../../db');

const matchMovie = async (req,res,next) => {
  const { title, genre } = req.body;
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

    if(existTitle) throw Error(`There is already a movie titled: ${title}`)

    const genres = genre.map(async(gen)=>{
      const genreInBDD = await Genre.findOne({where:{name: gen}})
      if(!genreInBDD) throw Error(`The genre ${gen} does not exist in the database`)
    });
    await Promise.all(genres);
    next();
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = matchMovie;