import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { formatDistance } from "date-fns"

const categories = [
  { value: 0, category: 'Any Category' },
  { value: 9, category: 'General Knowledge' },
  { value: 10, category: 'Entertainment: Books' },
  { value: 11, category: 'Entertainment: Film' },
  { value: 12, category: 'Entertainment: Music' },
  { value: 13, category: 'Entertainment: Musicals & Theatres' },
  { value: 14, category: 'Entertainment: Television' },
  { value: 15, category: 'Entertainment: Video Games' },
  { value: 16, category: 'Entertainment: Board Games' },
  { value: 17, category: 'Science & Nature' },
  { value: 18, category: 'Science: Computers' },
  { value: 19, category: 'Science: Mathematics' },
  { value: 20, category: 'Mythology' },
  { value: 21, category: 'Sports' },
  { value: 22, category: 'Geography' },
  { value: 23, category: 'History' },
  { value: 24, category: 'Politics' },
  { value: 25, category: 'Art' },
  { value: 26, category: 'Celebrities' },
  { value: 27, category: 'Animals' },
  { value: 28, category: 'Vehicles' },
  { value: 29, category: 'Entertainment: Comics' },
  { value: 30, category: 'Science: Gadgets' },
  { value: 31, category: 'Entertainment: Japanese Anime & Manga' },
  { value: 32, category: 'Entertainment: Cartoon & Animations' },
]

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
    <div>
      <select 
        value={selectInput.amount}
        name="amount"
        onChange={handleChange}
      >
        <option value={3}>3</option>
        <option value={5}>5</option>
        <option value={10}>10</option>
      </select>

      <select
        name="category" 
        value={selectInput.category}
        onChange={handleChange}
      >
        {categories.map(({ value, category }) => (
          <option value={value} key={value}>
            {category}
          </option>
        ))}
      </select>

      <ul>
        {quizResults.map((item, index) => (
          <li key={index}>
            <Link to={{ pathname: "/result", state: item.quizResult }}>
              Quiz {index + 1}
            </Link>
            <div>
              {formatDistance(item.date, Date.now(), { addSuffix: true })}
            </div>
          </li>
        ))}
      </ul>

      <Link to={{ pathname: "/quiz", state: selectInput }}>Next</Link>
    </div>
  )
}
