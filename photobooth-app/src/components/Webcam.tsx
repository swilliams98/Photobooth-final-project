import ReactWebcam from "react-webcam"
import styled from "styled-components";



const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const StyledButton = styled.button`
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


const Webcam = ({setCapturedImage} : any) => (

    <StyledDiv>

        <ReactWebcam
            audio={false}
            mirrored
            height={360}
            screenshotFormat="image/jpeg"
            width={640}
            videoConstraints={videoConstraints}
            style={{

                objectFit: "cover",
                border: "10px ridge #B562BAFF",
                borderRadius: "8px",
            }}
        >
            {/* @ts-expect-error */}
            {({ getScreenshot }) => (
                <>
                    <StyledButton
                        onClick={() => {
                            const imageSrc = getScreenshot()
                            setCapturedImage(imageSrc)
                        }}
                    >
                        Capture photo
                    </StyledButton>
                    {/*<StyledButton onClick={() => setCapturedImage(null)}>*/}
                    {/*    Retake*/}
                    {/*</StyledButton>*/}
                </>
            )}
        </ReactWebcam>
    </StyledDiv>
)

export default Webcam

