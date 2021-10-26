import { createTheme } from "@mui/material"
import { green } from "@mui/material/colors"

export const theme = createTheme({
  palette: {
    primary: {
      main: green[600]
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 15
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          boxShadow: 'none'
        }
      }
    },
  }
})