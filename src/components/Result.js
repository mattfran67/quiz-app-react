import React from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'

export const Result = () => {
  const { state } = useLocation()

  if (!state) {
    return (
      <div>
        <p>You have not done the quiz!</p>
        <Link to="/">Go back to Home</Link>
      </div>
    )
  }

  const userScore = state.filter(({ userAnswer }) => {
    return userAnswer.isCorrect
  }).length

  return (
    <div>
      Correct Answers: {userScore} / {state.length}
      <ul>
        {state.map((item, index) => (
          <li key={index}>
            <b>
              {item.question}
            </b>
            <div>Correct answer: {item.correctAnswer.text}</div>
            <div>Your Answer: {item.userAnswer.text}</div>
          </li>
        ))}
      </ul>
      <Link to="/">Go back to Home</Link>
    </div>
  )
}
