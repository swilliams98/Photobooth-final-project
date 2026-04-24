import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'
import RandomMeme from './components/RandomMeme'
import RandomAnimal from './components/RandomAnimal'
import Webcam, { StyledButton } from './components/Webcam'
import RandomColor from "./components/RandomColor.tsx";
import styled from "styled-components"

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
`

const StyledBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    margin: auto;

    @media screen and (max-width: 1000px) {
        flex-direction: column;

    }

    
`

function App() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null)

  return (
      <>
          
          <div>
              <StyledContainer>
                  <h1>Webcam Feature</h1>
                  {!capturedImage && (
                      <Webcam
                          setCapturedImage={setCapturedImage}
                      />

                  )}
                  {capturedImage && <img src={capturedImage}/>}
                  {capturedImage && <StyledButton onClick={() => setCapturedImage(null)}>Retake</StyledButton>}
              </StyledContainer>
          </div>

          <div className="ticks"></div>
          <section id="spacer"></section>
          <div className="heyy">
          <StyledBox>
              {capturedImage && <RandomMeme photoTaken={true}/>}

              {capturedImage && <RandomColor photoTaken={true}/>}

              {capturedImage && <RandomAnimal photoTaken={true}/>}
          </StyledBox>
          </div>

      </>
  )
}

export default App
