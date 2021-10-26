import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"

import { Home } from "components/Home"
import { Quiz } from "components/Quiz"
// import { Result } from "Result"

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/quiz">
          <Quiz />
        </Route>
        <Route exact path="/result">
          {/* <Result /> */}
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  )
}

export default App