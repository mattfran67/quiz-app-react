import React from 'react'
import ReactDOM from 'react-dom'
import App from 'components/App'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from 'theme'

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
