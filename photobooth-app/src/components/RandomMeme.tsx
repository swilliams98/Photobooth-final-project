import { useState, useEffect } from 'react'

// Your Giphy API key — get one free at developers.giphy.com
const GIPHY_API_KEY = '2P1VkbCPRbPBy6KV6rrzzs9aBH0IvNDd'

// Describes the shape of an image object returned by Giphy
interface GiphyImage {
  url: string
  width: string
  height: string
}

// Describes the part of the Giphy API response we actually use
interface GiphyResponse {
  data: {
    title: string
    images: {
      original: GiphyImage
      downsized_medium: GiphyImage
    }
  }
}

// photoTaken flips to true when the user takes a photo, triggering a new meme fetch
interface RandomMemeProps {
  photoTaken: boolean
}

export default function RandomMeme({ photoTaken }: RandomMemeProps) {
  // memeUrl holds the GIF link; memeTitle holds the GIF's name from Giphy
  const [memeUrl, setMemeUrl] = useState<string | null>(null)
  const [memeTitle, setMemeTitle] = useState<string>('')
  // loading shows a placeholder while the request is in-flight
  const [loading, setLoading] = useState(false)
  // error stores any message if the fetch fails
  const [error, setError] = useState<string | null>(null)

  // Runs every time photoTaken changes — fetches a new random meme when it becomes true
  useEffect(() => {
    if (!photoTaken) return

    const fetchMeme = async () => {
      setLoading(true)
      setError(null)
      try {
        // Calls Giphy's random endpoint filtered to the "meme" tag, G-rated
        const res = await fetch(
          `https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_API_KEY}&tag=meme&rating=g`
        )
        if (!res.ok) throw new Error(`Giphy error: ${res.status}`)
        const json: GiphyResponse = await res.json()
        // Prefer the smaller downsized_medium size; fall back to full original
        // Prefer the smaller downsized_medium size; fall back to full original
        const img = json.data.images.downsized_medium ?? json.data.images.original
        // Save the GIF URL so the <img> tag can display it
        setMemeUrl(img.url)
        // Save the title so it shows as a caption below the GIF
        setMemeTitle(json.data.title)
      } catch (err) {
        // If anything went wrong (bad key, network error, etc.), show the message
        setError(err instanceof Error ? err.message : 'Failed to fetch meme')
      } finally {
        // Always turn off the loading spinner, whether the fetch succeeded or failed
        setLoading(false)
      }
    }

    fetchMeme()
  }, [photoTaken]) // dependency: re-runs each time photoTaken changes

  // Hide the component entirely until a photo has been taken
  if (!photoTaken) return null

  return (
    <div className="random-meme">
      <h3>Your Random Meme</h3>
      {/* Show a loading message while waiting for Giphy to respond */}
      {loading && <p>Loading meme...</p>}
      {/* Show the error message if something went wrong */}
      {error && <p className="error">{error}</p>}
      {/* Once loaded, display the GIF and its title */}
      {memeUrl && !loading && (
        <>
          <img src={memeUrl} alt={memeTitle} style={{ maxWidth: '100%', borderRadius: '8px' }} />
          <p>{memeTitle}</p>
        </>
      )}
    </div>
  )
}
