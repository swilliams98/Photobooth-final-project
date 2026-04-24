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
              {capturedImage && <RandomMeme photoTaken={true}/>}

              {capturedImage && <RandomColor photoTaken={true}/>}

              {capturedImage && <RandomAnimal photoTaken={true}/>}
          </StyledBox>
          </div>

      </>
  )
}

export default App
