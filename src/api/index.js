import axios from "axios"
import { decode } from "html-entities"

export const api = (filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(
        'https://opentdb.com/api.php',
        { params: filter }
      )
    
      const results = data.results.map(questions => {
        return {
          category: questions.category,
          question: decode(questions.question), 
          answers: [
            ...questions.incorrect_answers.map(q => {
              return { text: decode(q), isCorrect: false }
            }),
            {
              text: decode(questions.correct_answer),
              isCorrect: true
            }
          ]
        }
      })

      resolve(results)

    } catch(e) {
      reject(`An error has occurred: ${e}`)
    }
  })
}