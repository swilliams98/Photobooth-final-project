import { useState } from 'react'
import './App.css'
import RandomMeme from './components/RandomMeme'
import RandomAnimal from './components/RandomAnimal'
import Webcam, { StyledButton } from './components/Webcam'
import RandomColor from "./components/RandomColor.tsx";
import styled from "styled-components"
import PhotoStrip from "./components/Photostrip.tsx";

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    padding-top: -20px;
    
    
`

const StyledBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;

    @media screen and (max-width: 1000px) {
        flex-direction: column;
        align-items: center;

    }
`
const StyledImg = styled.img`
    border: 10px ridge #B562BAFF;
    border-radius: 8px;
    object-fit: cover;
    
`
const StyledHeader = styled.header`
    width: 100%;
    background-color: #b562ba;
    padding: 20px;
    text-align: center;
    color: white;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
`



function App() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
    const [randomCode] = useState(() => {
        const codes = [200, 404, 500, 418] // or full list
        return codes[Math.floor(Math.random() * codes.length)]
    })

    const [randomColor] = useState(
        () => "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")
    )

    const [memeUrl, setMemeUrl] = useState<string | null>(null)

  return (
      <>
          <StyledHeader>Selfie Generator</StyledHeader>
          
          <div>
              <StyledContainer>

                  <h1>snap a pic</h1>

                  {!capturedImage && (
                      <Webcam
                          setCapturedImage={setCapturedImage}
                      />

                  )}
                  {capturedImage && <StyledImg src={capturedImage}/>}
                  {capturedImage && <StyledButton onClick={() => setCapturedImage(null)}>Retake</StyledButton>}
              </StyledContainer>
          </div>

          <div className="ticks"></div>
          <section id="spacer"></section>
          <div className="heyy">
          <StyledBox>
              {capturedImage && (
                  <RandomMeme photoTaken={true} setMemeUrl={setMemeUrl} />
              )}

              {capturedImage && <RandomColor photoTaken={true}/>}

              {capturedImage && <RandomAnimal photoTaken={true}/>}
          </StyledBox>
              {capturedImage && memeUrl && (
                  <PhotoStrip
                      selfieUrl={capturedImage}
                      catUrl={`https://http.cat/${randomCode}`}
                      memeUrl={memeUrl}
                      randomColor={randomColor}
                  />
              )}
          </div>

      </>
  )
}

export default App
