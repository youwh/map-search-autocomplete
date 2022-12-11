import { useCallback, useState } from 'react'
import { key } from '../App'

const api = 'https://maps.googleapis.com/maps/api/place/photo'

const usePlacePhoto = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  const photo = useCallback(async ($photoId: string, $handler: ($response: unknown) => void) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${api}?maxwidth=600&photo_reference=${$photoId}&key=${key}`)
      if (!response.ok) {
        throw new Error('Request failed')
      }
      $handler(response.url)
    } catch (error: unknown) {
      setError(error)
      throw error
    }
    setIsLoading(false)
  }, [])

  return {
    isLoading,
    error,
    photo,
  }
}

export default usePlacePhoto
