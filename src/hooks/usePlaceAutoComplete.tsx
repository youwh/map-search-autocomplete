import { useCallback, useState } from 'react'
import { key } from '../App'

const api = 'https://maps.googleapis.com/maps/api/place/autocomplete/json'

const usePlaceAutoComplete = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  const search = useCallback(async ($place: string, $handler: ($response: unknown) => void) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${api}?input=${$place}&key=${key}`)
      if (!response.ok) {
        throw new Error('Request failed')
      }

      const data = await response.json()
      $handler(data)
    } catch (error: unknown) {
      setError(error)
      throw error
    }
    setIsLoading(false)
  }, [])

  return {
    isLoading,
    error,
    search,
  }
}

export default usePlaceAutoComplete
