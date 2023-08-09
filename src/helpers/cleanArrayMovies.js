const cleanArray = (movies) => {
  return movies.map((movie)=>{
    return {
      id: movie.id,
      title: movie.Title,
      images: movie.Images,
      genre: movie.Genre,
      released: movie.Released,
      rated: movie.Rated ,
      rating: movie.Metascore,
    }
  })
};

module.exports = cleanArray;

// "Title": "I Am Legend",
// "Year": "2007",
// "Rated": "PG-13",
// "Released": "14 Dec 2007",
// "Runtime": "101 min",
// // "Genre": "Drama, Horror, Sci-Fi",
// "Director": "Francis Lawrence",
// "Writer": "Mark Protosevich (screenplay), Akiva Goldsman (screenplay), Richard Matheson (novel), John William Corrington, Joyce Hooper Corrington",
// "Actors": "Will Smith, Alice Braga, Charlie Tahan, Salli Richardson-Whitfield",
// "Plot": "Years after a plague kills most of humanity and transforms the rest into monsters, the sole survivor in New York City struggles valiantly to find a cure.",
// "Language": "English",
// "Country": "USA",
// "Awards": "9 wins & 21 nominations.",
// "Poster": "http://ia.media-imdb.com/images/M/MV5BMTU4NzMyNDk1OV5BMl5BanBnXkFtZTcwOTEwMzU1MQ@@._V1_SX300.jpg",
// "Metascore": "65",