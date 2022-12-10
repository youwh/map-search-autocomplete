import { useCallback, useState } from 'react'
import { key } from '../App'

const api = 'https://maps.googleapis.com/maps/api/place/details/'

const usePlaceLocation = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  const locate = useCallback(async ($placeId: string, $handler: ($response: unknown) => void) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${api}json?placeid=${$placeId}&fields=geometry&key=${key}`)
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
    locate,
  }
}

export default usePlaceLocation
