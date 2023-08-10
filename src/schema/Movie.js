const z = require('zod');

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required',
  }),
  year: z.number({
    invalid_type_error: 'Year must be a valid number',
    required_error: 'Year is required',
  }).int().min(1900).max(2025),
  rated: z.string({
    message:'Rated must be a string'
  }).default(z.nullable()),
  released: z.string({
    message: 'Released must be a string',
    required_error:'Movie released is required'
  }),
  duration: z.number({
    message: 'Movie duration must be a number',
    required_error: 'Movie duration is required'
  }).int().positive().min(0).max(400),
  // genre:z.array(z.enum(['Action','Adventure','Biography','Crime','Drama','Fantasy','History','Horror','Sci-Fi','Thriller']),{
  //   required_error: 'Movie genre is required',
  //   invalid_type_error: 'Movie genre must be an array of enum Genre',
  // }),
  director: z.string({
    message: 'Movie director must be a string',
    required_error: 'Movie director is required'
  }),
  plot: z.string({
    message: 'Movie plot must be a string',
    required_error: ' Movie plot is required'
  }),
  language: z.string({
    message: 'Movie language must be a string'
  }).default("English"),
  poster: z.string().url({
    message: 'Poster must be a valid URL',
    required_error: 'Movie post is required'
  }),
  metascore: z.number({
    message: ' Movie metascore must be a number'
  }).int().min(0).max(100).default(0)
})

const validateMovie = (object) => {
  return movieSchema.safeParseAsync(object)
};

const validateParcialMovie = (object) =>{
  return movieSchema.partial().safeParseAsync(object);
}

module.exports = {
  validateMovie, validateParcialMovie
}