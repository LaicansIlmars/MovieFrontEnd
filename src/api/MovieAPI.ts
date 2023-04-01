import HttpService from '../services/HttpService'

class MovieAPI {
  private readonly path = 'movie'

  private readonly http: HttpService

  constructor() {
    this.http = new HttpService()
  }

  public async search(query: string): Promise<MovieSearchDto | MovieNotFoundDto> {
    return await this.http.get(`${this.path}/search?query=${query}`)
  }

  public async getByImdbID(imdbID: string): Promise<ExtendedMovieDto | MovieNotFoundDto> {
    return await this.http.get(`${this.path}/${imdbID}`)
  }
}

const movieAPI = new MovieAPI()

export default movieAPI
