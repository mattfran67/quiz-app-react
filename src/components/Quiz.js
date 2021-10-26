import React, { useState } from "react"
import { useApiCall } from "hooks/useApiCall"
import { useHistory, useLocation } from "react-router"

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

  if (error) {
    return <div>Error</div>
  }

  if (loading) {
    return <div>loading</div>
  }

  const questionsEl = data.map((currentQuestion, index) => (
    <div key={index} style={{ display: index === position ? 'block' : 'none' }}>
      <p>{currentQuestion.category}</p>
      <p>{currentQuestion.question}</p>
        {currentQuestion.answers.map((answer, i) => (
          <div key={i}>
            <label>
              <input
                type="radio" 
                name={`question${index + 1}`}
                value={answer.text}
                onChange={() => handleChange(answer)}
              />
              {answer.text}
            </label>
          </div>
        ))}
      <p>{validationMessage}</p>
      <button
        onClick={handleClick}
        type={index !== data.length - 1 ? 'button' : 'submit'}
      >
        Next
      </button>
    </div>
  ))

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        {questionsEl}
      </form>
    </div>
  )
}