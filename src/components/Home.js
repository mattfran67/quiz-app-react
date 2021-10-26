import React, { useState, useEffect } from "react"
import { Grid } from "@mui/material"

import { QuizOptions } from "components/QuizOptions"
// import { RecentQuizzes } from "components/RecentQuizzes"

export const Home = () => {
  const [selectInput, setSelectInput] = useState({ amount: 3, category: 0 })
  const [quizResults, setQuizResults] = useState([])

  useEffect(() => {
    const latestResults = localStorage.getItem("latestResults")
    if (latestResults) {
      const latestResultsArray = JSON.parse(latestResults)
      setQuizResults(latestResultsArray)
    }
  }, [])

  const handleChange = ({ target }) => {
    const { name, value } = target
    setSelectInput(prevState =>  ({ ...prevState, [name]: value }))
  }

  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item sm={quizResults.length ? 6 : 12} xs={12}>
        <QuizOptions 
          selectInput={selectInput}
          handleChange={handleChange} 
        />
      </Grid>
      {quizResults.length > 0 &&
        <Grid item sm={6} xs={12}>
          {/* <RecentQuizzes quizResults={quizResults} /> */}
        </Grid>
      }
    </Grid>
  )
}
