import { useState } from 'react'
import './App.css'
import RandomMeme from './components/RandomMeme'
import RandomAnimal from './components/RandomAnimal'
import Webcam from './components/Webcam'
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
    box-shadow: 8px 8px 0px #111;
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


const codes = [100, 101, 102, 103, 200, 201, 202, 203, 204, 205, 206, 207, 208, 214, 226, 300, 301, 302, 303, 304, 305, 307, 308, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 428, 429, 431, 444, 450, 451, 495, 496, 497, 498, 499, 500, 501, 502, 503, 504, 506, 507, 508, 509, 510, 511, 521, 522, 523, 525, 530, 599];


function App() {
    const [capturedImage, setCapturedImage] = useState<string | null>(null)

    const [randomColor] = useState(
        () => "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")
    )
    const [randomAnimal] = useState(
        () =>  codes[Math.floor(Math.random() * codes.length)]
    );

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
          <div className="heyy">
          <StyledBox>
              {capturedImage && (
                  <>
                      <RandomMeme  setMemeUrl={setMemeUrl} />
                      <RandomColor randomColor ={randomColor}/>
                      <RandomAnimal randomAnimal = {randomAnimal}/>
                </>
              )}


          </StyledBox>

              {capturedImage && memeUrl && (
                  <PhotoStrip
                      selfieUrl={capturedImage}
                      memeUrl={memeUrl}
                      randomColor={randomColor}
                      catUrl={`https://http.cat/${randomAnimal}`}
                  />
              )}
          </div>

      </>
  )
}

export default App