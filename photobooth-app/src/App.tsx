import { useState } from 'react'
import './App.css'
import RandomMeme from './components/RandomMeme'
import RandomAnimal from './components/RandomAnimal'
import Webcam from './components/Webcam'
import RandomColor from "./components/RandomColor.tsx";
import styled from "styled-components"
import PhotoStrip from "./components/Photostrip.tsx";

// centers the webcam and captured screenshotted image in a column
const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    padding-top: -20px;
`

// button styling
const StyledButton = styled.button`
    margin: 20px;
    padding: 10px 30px;
    background-color: #dd9fe3;
    color: white;
    border: 5px outset #b562ba;
    border-radius: 8px;
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background-color: #c872d5;
    }
`

// lays out the three different results side by side and stacks them by a row
// the @media screen changes the layout when the screen gets smaller (different devices)
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

// styles the captured photo with a matching border and shadow
const StyledImg = styled.img`
    border: 10px ridge #B562BAFF;
    border-radius: 8px;
    object-fit: cover;
    box-shadow: 8px 8px 0px #111;
`
const StyledComponentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

// the header at the top
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

const StyledFooter = styled.footer`
    width: 100%;
    background-color: #b562ba;
    padding: 20px;
    text-align: center;
    color: white;
    font-weight: bold;
    margin-top: auto;     /* Pushes the footer to the bottom by consuming all leftover space above it */

`


function App() {
    // stores the image captured
    const [capturedImage, setCapturedImage] = useState('')

    const [randomColor,setRandomColor] = useState('');
    const [randomAnimal, setRandomAnimal] = useState(0);
    const [memeUrl, setMemeUrl] = useState('')

  return (
      <>
          <StyledHeader>Selfie Generator</StyledHeader>
          <div>

              <StyledContainer>
                  <h1>Snap A Pic</h1>
                  {/* show webcam until a photo is taken */}
                  {!capturedImage && (
                      <Webcam
                          changeCapturedImage={setCapturedImage}
                      />
                  )}

                  {/* show captured photo after taking it */}
                  {capturedImage && <StyledImg src={capturedImage}/>}
                  {/* retake button resets capturedImage so the webcam reappears */}
                  {capturedImage && <StyledButton onClick={() => setCapturedImage(null)}>Retake</StyledButton>}
              </StyledContainer>
          </div>
          <div className="heyy">
          <StyledBox>
              {/* all three result cards only render after a photo is taken */}
              {capturedImage && (
                  <>
                      <RandomMeme  changeMemeUrl={setMemeUrl} />
                      <StyledComponentWrapper>
                          <RandomColor changeRandomColor ={setRandomColor}/>
                      </StyledComponentWrapper>

                      <RandomAnimal changeRandomAnimal = {setRandomAnimal}/>
                </>
              )}

          </StyledBox>
              {/* photostrip only renders once the meme URL is available,
                  since it needs all 4 pieces of data to build the strip */}
              {capturedImage && memeUrl && (
                  <PhotoStrip
                      selfieUrl={capturedImage}
                      memeUrl={memeUrl}
                      randomColor={randomColor}
                      catUrl={`https://http.cat/${randomAnimal}`}
                  />
              )}
          </div>

          <StyledFooter> Made with 💜 | Created by Serenity Williams, Scarlet Alvarez Marte, Faria Zaman, Lingyin Li </StyledFooter>

      </>
  )
}

export default App