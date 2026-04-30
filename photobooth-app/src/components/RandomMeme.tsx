import { useState, useEffect, memo} from 'react'
import styled from "styled-components";

//scarlet's file

const StyledMeme = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MemeImg = styled.img`
  width: 400px;
  height: 400px;
  border: 10px ridge #B562BAFF;
  border-radius: 60px;
`


const GIPHY_API_KEY = 'EoESnCwx83gxyCOj8BBbFYIibohstfdw'

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
  changeMemeUrl: (url: string) => void;
}

function RandomMeme({ changeMemeUrl }: RandomMemeProps) {
  // memeUrl holds the GIF link; memeTitle holds the GIF's name from Giphy
  const [memeUrl, setLocalMemeUrl] = useState<string | null>(null)
  const [memeTitle, setMemeTitle] = useState<string>('')
  // loading shows a placeholder while the request is in-flight
  const [loading, setLoading] = useState(false)
  // error stores any message if the fetch fails
  const [error, setError] = useState<string | null>(null)

  // Runs every time photoTaken changes — fetches a new random meme when it becomes true
  useEffect(() => {
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
        setLocalMemeUrl(img.url)
        // send up to App
        changeMemeUrl(img.url)
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
  }, []) // dependency: re-runs each time photoTaken changes

  // Hide the component entirely until a photo has been taken
  if(error) {console.log(error);}
  return (
      <div className="random-meme">
        <StyledMeme><h1>Your Meme</h1>
        {/* Show a loading message while waiting for Giphy to respond */}
        {loading && <p>Loading meme...</p>}
        {/* Show the error message if something went wrong */}

        {/* Once loaded, display the GIF and its title */}
        {memeUrl && !loading && (
            <>
              <MemeImg src={memeUrl} alt={memeTitle} />
            </>
        )}
        </StyledMeme>
      </div>
  )
}

export default memo(RandomMeme)
