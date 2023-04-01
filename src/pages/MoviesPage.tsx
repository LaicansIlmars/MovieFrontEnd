import {useState} from 'react'
import {useTheme} from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import MovieIcon from '@mui/icons-material/Movie'
import MovieSearch from '../components/MovieSearch'
import MovieDetails from '../components/MovieDetails'

const MoviesPage = () => {
  const theme = useTheme()

  const [selectedMovie, setSelectedMovie] = useState<MovieDto | null>(null)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
      }}>
      <AppBar position="static">
        <Toolbar sx={{justifyContent: 'center'}}>
          <MovieIcon sx={{mr: 3, ml: 3}} />

          <MovieSearch selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} />
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          flexDirection: 'column',
          backgroundColor: theme.palette.primary.dark
        }}>
        {selectedMovie && (
          <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', px: 2, py: 2}}>
            <MovieDetails movie={selectedMovie} />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default MoviesPage
