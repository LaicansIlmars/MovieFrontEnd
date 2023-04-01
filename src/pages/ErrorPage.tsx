import {useRouteError, isRouteErrorResponse} from 'react-router-dom'

const MoviesPage = () => {
  const error = useRouteError()

  return (
    <div>
      <h1>Oops!</h1>

      <p>Sorry, an unexpected error has occurred.</p>

      {isRouteErrorResponse(error) && (
        <p>
          <i>
            {error.status} {error.statusText}
          </i>
        </p>
      )}
    </div>
  )
}

export default MoviesPage
