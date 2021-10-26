import { useEffect, useState } from "react"
import { api } from "api"

export const useApiCall = (filter) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    api(filter).then(res => {
      setData(res)
      setLoading(false)
    }).catch(e => {
      console.log(e)
      setError(true)
    })
  }, [filter])

  return { data, loading, error }
} 