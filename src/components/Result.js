import { styled, Button, Card, CardContent, Typography } from '@mui/material'
import { green, red } from '@mui/material/colors'
import { Box } from '@mui/system'
import React from 'react'
import { useLocation } from 'react-router'
import { Link as RouterLink } from 'react-router-dom'

const Answer = styled((props) => {
  const { correct, ...other } = props
  return <div {...other} />
})(({ correct }) => ({
  borderWidth: 2, 
  borderStyle: 'solid',
  borderColor: correct ? green[500] : red[500],
  borderRadius: 5,
  marginBottom: 10,
  padding: 12,
  backgroundColor: correct ? green[50] : red[50]
}))

export const Result = () => {
  const { state } = useLocation()

  if (!state) {
    return (
      <Card sx={{ m: 'auto', maxWidth: 800 }}>
        <CardContent>
        <p>You have not done the quiz!</p>
        <Box textAlign="right">
          <Button component={RouterLink} to="/" variant="outlined">
            Go back to Home
          </Button>
        </Box>
        </CardContent>
      </Card>
    )
  }

  const userScore = state.filter(({ userAnswer }) => {
    return userAnswer.isCorrect
  }).length

  return (
    <Card sx={{ m: 'auto', maxWidth: 800 }}>
      <CardContent>
        <Typography
          textAlign="right"
          fontSize={18}
        >
          Correct Answers: {userScore} / {state.length}
        </Typography>
          {state.map((item, index) => (
            <div key={index}>
              <Typography fontSize={18}>
                {item.question}
              </Typography>
              <Answer correct>
                Correct answer: {item.correctAnswer.text}
              </Answer>
              <Answer correct={item.userAnswer.isCorrect}>
                Your Answer: {item.userAnswer.text}
              </Answer>
            </div>
          ))}
        <Box textAlign="right">
          <Button component={RouterLink} to="/" variant="outlined">
            Go back to Home
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}
