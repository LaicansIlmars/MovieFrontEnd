import {useState, useEffect} from 'react'
import {styled, alpha} from '@mui/material/styles'
import movieAPI from '../api/MovieAPI'
import localStorageService from '../services/LocalStorageService'
import useDebounce from '../hooks/useDebounce'
import Box from '@mui/material/Box'
import Autocomplete from '@mui/material/Autocomplete'
import InputBase from '@mui/material/InputBase'
import Typography from '@mui/material/Typography'
import SearchIcon from '@mui/icons-material/Search'

const latestQueriesStorageKey = 'latestQueries'

const Search = styled('div')(({theme}) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto'
  }
}))

const SearchIconWrapper = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({theme}) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  }
}))

interface Props {
  selectedMovie: MovieDto | null
  setSelectedMovie: (movie: MovieDto | null) => void
}

const MovieSearch = ({selectedMovie, setSelectedMovie}: Props) => {
  const [movies, setMovies] = useState<Array<MovieDto>>([])

  const [latestQueries, setLatestQueries] = useState<Array<MovieDto>>([])

  const [loading, setLoading] = useState(false)

  const [open, setOpen] = useState(false)

  const [query, setQuery] = useState('')

  const debouncedQuery = useDebounce<string>(query, 1000)

  const cacheQuery = (latestQuery: string) => {
    const cachedQueries = localStorageService.getItem<Array<string>>(latestQueriesStorageKey)

    if (cachedQueries && cachedQueries.length) {
      const queries = cachedQueries.filter(query => query !== latestQuery)

      queries.unshift(latestQuery)

      localStorageService.setItem(latestQueriesStorageKey, queries)
    } else {
      localStorageService.setItem(latestQueriesStorageKey, [latestQuery])
    }
  }

  useEffect(() => {
    if (!debouncedQuery.length) {
      setMovies([])
      return
    }

    setLoading(true)

    setOpen(true)

    movieAPI
      .search(debouncedQuery.trim())
      .then(result => {
        if (result.response === 'True') {
          setMovies(result.search)
        } else {
          setMovies([])
        }
      })
      .finally(() => {
        setLoading(false)
        cacheQuery(debouncedQuery)
      })
  }, [debouncedQuery])

  useEffect(() => {
    if (!query.length) {
      const cachedQueries = localStorageService.getItem<Array<string>>(latestQueriesStorageKey)

      if (!cachedQueries || !cachedQueries.length) return

      // generate movies from queries since we can't use different object types in one Autocomplete
      const queryMovies = cachedQueries.map((query, index) => {
        return {
          title: query,
          imdbID: `query_${index.toString()}`,
          year: '',
          type: '',
          poster: ''
        }
      })

      setLatestQueries(queryMovies)
    }
  }, [query])

  return (
    <Autocomplete
      id="movie-search"
      data-testid="test-movie-search"
      noOptionsText="Movie not found"
      blurOnSelect
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      loading={loading}
      value={selectedMovie}
      options={query.length ? movies : latestQueries}
      inputValue={query}
      sx={{width: 576}}
      onChange={(_, data) => {
        if (data && data.imdbID.includes('query')) {
          setQuery(data.title)
          return
        }

        setSelectedMovie(data)
      }}
      onInputChange={(_, value, reason) => {
        if (reason === 'reset') return

        setQuery(value)
      }}
      isOptionEqualToValue={(option, value) => option.imdbID === value.imdbID}
      getOptionLabel={option => option.title}
      ListboxProps={{
        className: 'customScrollbar'
      }}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.imdbID}>
            {!!option.poster && (
              <Box
                component="img"
                sx={{
                  height: 71,
                  width: 48
                }}
                alt={option.title}
                src={option.poster}
              />
            )}

            <Box sx={{ml: 2}}>
              <Typography variant="body1" style={{fontWeight: 600}}>
                {option.title}
              </Typography>

              {!!option.year && <Typography variant="body2">{option.year}</Typography>}
            </Box>
          </li>
        )
      }}
      renderInput={params => {
        const {InputLabelProps, InputProps, ...rest} = params

        return (
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>

            <StyledInputBase placeholder="Search movie…" {...params.InputProps} {...rest} />
          </Search>
        )
      }}
    />
  )
}

export default MovieSearch
