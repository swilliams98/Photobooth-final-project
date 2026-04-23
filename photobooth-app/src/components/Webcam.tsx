import ReactWebcam from "react-webcam"


const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};



const WebcamCapture = ({setCapturedImage} : any) => (
    <ReactWebcam
        audio={false}
        mirrored
        height={720}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
    >
        {/* @ts-expect-error */}
        {({ getScreenshot }) => (
            <button
                onClick={() => {
                    const imageSrc = getScreenshot()
                    setCapturedImage(imageSrc)
                }}
            >
                Capture photo
            </button>
        )}
    </ReactWebcam>
)

export default WebcamCapture

