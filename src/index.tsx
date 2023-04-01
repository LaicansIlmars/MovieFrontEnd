import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {ThemeProvider} from '@mui/material/styles'
import MoviesPage from './pages/MoviesPage'
import ErrorPage from './pages/ErrorPage'
import theme from './theme'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MoviesPage />,
    errorElement: <ErrorPage />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ThemeProvider>
)
