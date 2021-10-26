import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"

import { Quiz } from "components/Quiz"
import { Home } from "components/Home"
import { Result } from "components/Result"
import { Container, styled, Typography } from "@mui/material"

const WallPaper = styled('div')({
  position: 'fixed',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  overflow: 'hidden',
  background: '#474141',
  zIndex: -1,
})

const App = () => {
  return (
    <Router>
      <WallPaper />
      <Typography 
        variant="h2"
        textAlign="center"
        component="h1"
        color="white"
        p={3}
      >
        Quiz App
      </Typography>
      <Container disableGutters sx={{ mb: 2 }}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/quiz">
            <Quiz />
          </Route>
          <Route exact path="/result">
            <Result />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Container>
    </Router>
  )
}

export default App
