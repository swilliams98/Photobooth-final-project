// Faria Zaman

import ReactWebcam from "react-webcam"
import styled from "styled-components";

// the resolutions for the webcam and the settings passed into
const videoConstraints = {
    width: 1280,
    height: 720,
    // this is the front-facing camera
    facingMode: "user"
};

// centering the webcam and button in one column
const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
// styled button for capturing photo
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

interface WebcamProps {
    changeCapturedImage: (url : string) => void
}

// webcam component that accepts setCapturedImage from App.tsx to send the captured photo up to the parent
function Webcam ({changeCapturedImage} : WebcamProps) {
    console.log("webcam");
    return (
        <StyledDiv>
            {/*using react-webcam which renders a live camera feed*; all other restrictions
            and variables are given by the npm react-webcam page*/}
            <ReactWebcam
                audio={false}
                mirrored
                height={360}
                // what happens when you take a picture; it takes a screenshot and saves it as such
                screenshotFormat="image/jpeg"
                width={640}
                videoConstraints={videoConstraints}
                // styling for the webcam
                style={{
                    objectFit: "cover",
                    border: "10px ridge #B562BAFF",
                    borderRadius: "8px",
                    boxShadow: "8px 8px 0px #111",
                }}
            >
                {({ getScreenshot }) => (
                    <>
                        {/* Captures a screenshot from the webcam and
                        sends it up to App.tsx via setCapturedImage */}
                        <StyledButton
                            onClick={() => {
                                const imageSrc = getScreenshot()
                                changeCapturedImage(imageSrc)
                            }}

                        >
                            Capture photo
                        </StyledButton>
                    </>
                )}
            </ReactWebcam>
        </StyledDiv>
    );
}


export default Webcam

