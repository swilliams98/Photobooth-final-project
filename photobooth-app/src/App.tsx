import { useState } from 'react'
import './App.css'
import RandomMeme from './components/RandomMeme'
import RandomAnimal from './components/RandomAnimal'
import Webcam, { StyledButton } from './components/Webcam'
import RandomColor from "./components/RandomColor.tsx";
import styled from "styled-components"
import PhotoStrip from "./components/Photostrip.tsx";
import { useScreenshot } from "use-react-screenshot";


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




function App() {


    const codes = [100, 101, 102, 103, 200, 201, 202, 203, 204, 205, 206, 207, 208, 214, 226, 300, 301, 302, 303, 304, 305, 307, 308, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 428, 429, 431, 444, 450, 451, 495, 496, 497, 498, 499, 500, 501, 502, 503, 504, 506, 507, 508, 509, 510, 511, 521, 522, 523, 525, 530, 599]

    const [capturedImage, setCapturedImage] = useState<string | null>(null)
    const [randomCode, setRandomCode] = useState(() => codes[Math.floor(Math.random() * codes.length)])
    const [randomColor, setRandomColor] = useState(() => "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0"))
    const [memeUrl, setMemeUrl] = useState<string | null>(null)

    return (
        <>
            <StyledHeader>Selfie Generator</StyledHeader>

            <div>
                <StyledContainer>
                    <h1>snap a pic</h1>
                    {!capturedImage && (
                        <Webcam setCapturedImage={setCapturedImage} />
                    )}
                    {capturedImage && <StyledImg src={capturedImage}/>}
                    {capturedImage && <StyledButton onClick={() => {
                        setCapturedImage(null)
                        setRandomCode(codes[Math.floor(Math.random() * codes.length)])
                        setRandomColor("#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0"))
                    }}>
                        Retake
                    </StyledButton>}
                </StyledContainer>
            </div>

            <div className="ticks"></div>
            <section id="spacer"></section>
            <div className="heyy">
                <StyledBox>
                    {capturedImage && (
                        <RandomMeme photoTaken={true} setMemeUrl={setMemeUrl} />
                    )}
                    {capturedImage && <RandomColor photoTaken={true} randomColor={randomColor} />}
                    {capturedImage && <RandomAnimal photoTaken={true} randomCode={randomCode} />}
                </StyledBox>

                {capturedImage && memeUrl && (
                    <PhotoStrip
                        selfieUrl={capturedImage}
                        memeUrl={memeUrl}
                        randomColor={randomColor}
                        catUrl={`https://http.cat/${randomCode}`}
                    />
                )}



            </div>
        </>
    )
}


export default App
