import {render, screen, waitFor, fireEvent} from '@testing-library/react'
import MovieSearch from '../components/MovieSearch'

describe('MovieDetails Component', () => {
  it('should search movies', async () => {
    render(<MovieSearch selectedMovie={null} setSelectedMovie={() => {}} />)

    const autocomplete = await screen.findByTestId('test-movie-search')

    autocomplete.focus()

    const input = autocomplete.querySelector('input')

    if (!input) {
      throw new Error('Input does not exists')
    }

    fireEvent.change(input, {
      target: {value: 'avatar'}
    })

    await waitFor(() => expect(input).toHaveValue('avatar'))
  })
})
