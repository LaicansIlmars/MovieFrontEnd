interface MovieSearchDto {
  response: 'True'
  search: Array<MovieDto>
  totalResults: string
}

interface MovieDto {
  title: string
  year: string
  imdbID: string
  type: string
  poster: string
}

interface ExtendedMovieDto extends MovieDto {
  rated: string
  released: string
  runtime: string
  genre: string
  director: string
  writer: string
  actors: string
  plot: string
  language: string
  country: string
  awards: string
  ratings: Array<{
    source: string
    value: string
  }>
  metascore: string
  imdbRating: string
  imdbVotes: string
  DVD: string
  boxOffice: string
  production: string
  website: string
  response: 'True'
}

interface MovieNotFoundDto {
  response: 'False'
  error: string
}
