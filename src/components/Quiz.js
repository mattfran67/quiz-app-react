import React, { useState } from "react"
import { useApiCall } from "hooks/useApiCall"
import { useHistory, useLocation } from "react-router"
import { Link as RouterLink } from "react-router-dom"
import { 
  Card,
  CardContent, 
  Button,  
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  MobileStepper,
  Box,
  CircularProgress,
  Alert,
  CardActions
} from "@mui/material"

export const Quiz = () => {
  const { state } = useLocation()
  const history = useHistory()

  const { data, loading, error } = useApiCall(state)
  const [position, setPosition] = useState(0)
  const [userAnswer, setUserAnswer] = useState({})
  const [userAnswers, setUserAnswers] = useState([])
  const [validationMessage, setValidationMessage] = useState('')
  
  const handleClick = () => {
    if (!Object.keys(userAnswer).length) {
      setValidationMessage('Select an option!')
      return
    }

    setUserAnswers(prevState => [...prevState, userAnswer])

    if (position === data.length - 1) return

    setPosition(prevPos => prevPos + 1)
    setUserAnswer({})
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (!Object.keys(userAnswer).length) return

    let quizResult = data.map(({ question, answers }, index) => {
      return {
        question,
        correctAnswer: answers.find(q => q.isCorrect),
        userAnswer: userAnswers[index]
      }
    })

    quizResult = { quizResult, date: Date.now() }

    const latestResults = localStorage.getItem('latestResults')

    if (latestResults) {
      const latestResultsArray = JSON.parse(latestResults).slice(0, 4)
      const quizResultArray = [quizResult, ...latestResultsArray]
      localStorage.setItem('latestResults', JSON.stringify(quizResultArray))
    } else {
      localStorage.setItem('latestResults', JSON.stringify([quizResult]))
    }

    history.push('/result', quizResult.quizResult)
  }

  const handleChange = answer => {
    setUserAnswer(answer)
    setValidationMessage('')
  }

  if (!state) {
    return (
      <Card>
        <CardContent>
          <Alert severity="warning" variant="filled">
            Invalid Data!
          </Alert>
        </CardContent>
        <CardActions>
          <Button
            variant="outlined"
            component={RouterLink} 
            to="/"
          >
            Go back to Home
          </Button>
        </CardActions>
      </Card>
    )
  }

  if (error) {
    return (
      <Alert severity="error" variant="filled">
        Some error has happened!
      </Alert>
    )
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size={100} />
        <Typography 
          color="white"
          fontSize={18}
          fontWeight="bold"
          letterSpacing={2}
          sx={{position: 'absolute'}}
        >
          Loading...
        </Typography>
      </Box>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      {data.map((currentQuestion, index) => (
        <Card
          key={index}
          sx={{ maxWidth: 800, m: 'auto' }}
          style={{ display: index === position ? 'block' : 'none' }}
        >
          <CardContent>
            <MobileStepper
              variant="dots"
              steps={data.length}
              position="static"
              activeStep={index}
              sx={{ justifyContent: 'center' }}
            />
            <Typography fontSize={17} mb={2}>
              Category:{' '}
              <Box 
                component="span" 
                sx={{ 
                  bgcolor: '#ccc',
                  p: '5px',
                  borderRadius: 2,
                  whiteSpace: 'nowrap'
                }}
              >
                {currentQuestion.category}
              </Box>
            </Typography>
            <Typography fontWeight={400} fontSize={18}>
              {currentQuestion.question}
            </Typography>
            <RadioGroup>
              {currentQuestion.answers.map(answer => (
                <FormControlLabel
                  key={answer.text}
                  control={<Radio />} 
                  label={answer.text}
                  value={answer.text}
                  onChange={() => handleChange(answer)}
                />
              ))}
            </RadioGroup>
            <Typography color="red" fontSize={18}>
              {validationMessage}
            </Typography>
            <Box textAlign="right">
              <Button
                variant="contained"
                onClick={handleClick}
                type={index !== data.length - 1 ? 'button' : 'submit'}
              >
                Next
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}
    </form>
  )
}