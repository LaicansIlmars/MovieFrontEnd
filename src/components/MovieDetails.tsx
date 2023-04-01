import {useState, useEffect, useMemo} from 'react'
import {useTheme} from '@mui/material/styles'
import movieAPI from '../api/MovieAPI'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Rating from '@mui/material/Rating'
import StarBorderIcon from '@mui/icons-material//StarBorder'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import '../index.css'

const MovieDetailsListItem = ({primaryText, secondaryText}: {primaryText: string; secondaryText: string}) => {
  const theme = useTheme()

  return (
    <ListItem sx={{alignItems: 'flex-start', px: 0}}>
      <ListItemText
        secondary={
          <Box component="span" sx={{display: 'flex', flexDirection: 'row'}}>
            <Typography
              sx={{fontWeight: 600, mr: 1}}
              component="span"
              variant="body2"
              color={theme.palette.primary.contrastText}>
              {primaryText}
            </Typography>

            <Typography component="span" variant="body2" color={theme.palette.primary.contrastText}>
              {secondaryText}
            </Typography>
          </Box>
        }
      />
    </ListItem>
  )
}

const ExtendedDetails = ({movie}: {movie: ExtendedMovieDto}) => {
  const theme = useTheme()

  const genres = useMemo(() => {
    return movie.genre ? movie.genre.split(',') : []
  }, [movie])

  const rating = useMemo(() => {
    const imdbRating = +movie.imdbRating

    return typeof imdbRating === 'number' && !isNaN(imdbRating) ? +imdbRating.toFixed(1) : null
  }, [movie])

  return (
    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', px: 2, py: 2}}>
      <Card sx={{width: 576, backgroundColor: theme.palette.primary.main, px: 2, py: 2}} variant="outlined">
        <CardContent>
          <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Box>
              <Typography sx={{mb: 1}} variant="h5" color={theme.palette.primary.contrastText}>
                {movie.title}
              </Typography>

              <Typography variant="body1" sx={{mb: 2}} color={theme.palette.primary.contrastText}>
                {movie.year}
              </Typography>
            </Box>
          </Box>

          <Box
            component="img"
            sx={{
              height: 426,
              width: 288
            }}
            alt={movie.title}
            src={movie.poster}
          />

          {rating && (
            <Box sx={{mt: 2}}>
              <Typography component="legend" color={theme.palette.primary.contrastText}>
                {rating} / 10
              </Typography>

              <Rating
                value={rating}
                max={10}
                readOnly
                emptyIcon={<StarBorderIcon fontSize="inherit" sx={{color: theme.palette.primary.light}} />}
              />
            </Box>
          )}

          <Stack sx={{mt: 2}} direction="row" spacing={1}>
            {genres.map(genre => (
              <Chip key={genre} label={genre} variant="outlined" color="secondary" />
            ))}
          </Stack>

          <Typography sx={{mt: 2}} variant="body2" color={theme.palette.primary.contrastText}>
            {movie.plot}
          </Typography>

          <Divider sx={{mt: 2, bgcolor: theme.palette.primary.light}} />

          <List sx={{padding: 0, width: '100%'}}>
            <MovieDetailsListItem primaryText="Country" secondaryText={movie.country} />

            <Divider component="li" sx={{bgcolor: theme.palette.primary.light}} />

            <MovieDetailsListItem primaryText="Director" secondaryText={movie.director} />

            <Divider component="li" sx={{bgcolor: theme.palette.primary.light}} />

            <MovieDetailsListItem primaryText="Writer" secondaryText={movie.writer} />
          </List>
        </CardContent>
      </Card>
    </Box>
  )
}

const MovieDetails = ({movie}: {movie: MovieDto}) => {
  const [loading, setLoading] = useState(false)

  const [extendedMovie, setExtendedMovie] = useState<ExtendedMovieDto | null>(null)

  useEffect(() => {
    setLoading(true)

    movieAPI
      .getByImdbID(movie.imdbID)
      .then(result => {
        if (result.response === 'True') {
          setExtendedMovie(result)
        }
      })
      .finally(() => setLoading(false))
  }, [movie])

  if (loading) return <CircularProgress color="secondary" />

  if (!extendedMovie) return null

  return <ExtendedDetails movie={extendedMovie} />
}

export default MovieDetails
