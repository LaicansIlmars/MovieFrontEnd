import {render, screen, waitFor} from '@testing-library/react'
import MovieDetails from '../components/MovieDetails'
import movieAPI from '../api/MovieAPI'

const imdbID = 'tt1630029'

describe('MovieDetails Component', () => {
  it('should render extended movie details', async () => {
    const movie = await movieAPI.getByImdbID(imdbID)

    if (movie.response == 'False') {
      throw new Error(movie.error)
    }

    expect(movie.response).toBe('True')

    render(<MovieDetails movie={movie} />)

    await waitFor(() => screen.getByText(movie.title))

    await waitFor(() => screen.getByText(movie.year))

    await waitFor(() => screen.getByText(movie.plot))

    await waitFor(() => screen.getByText(movie.country))

    await waitFor(() => screen.getByText(movie.director))
  })
})
