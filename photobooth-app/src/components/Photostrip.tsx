import { useRef } from "react";
import { useScreenshot } from "use-react-screenshot";
import styled from "styled-components";


const Strip = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background: white;
  border: 3px solid #111;
  border-radius: 6px;
  padding: 16px;
  box-shadow: 8px 8px 0px #111;
  width: 260px;
`;

const Title = styled.p`
  font-family: "Courier New", monospace;
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #aaa;
  margin: 0 0 8px;
`;

const Photo = styled.img`
  width: 228px;
  height: 180px;
  object-fit: cover;
  border: 2px solid #ddd;
  display: block;
`;

// For the color block since it's a div not an image
const ColorBlock = styled.div<{ color: string }>`
  width: 228px;
  height: 180px;
  background-color: ${(props) => props.color};
  border: 2px solid #ddd;
  display: block;
`;

const DownloadBtn = styled.button`
  margin-top: 16px;
  background: #111;
  color: #ffe500;
  font-family: "Courier New", monospace;
  font-size: 13px;
  font-weight: bold;
  letter-spacing: 2px;
  text-transform: uppercase;
  border: 3px solid #111;
  padding: 12px 28px;
  cursor: pointer;
  box-shadow: 4px 4px 0px #ffe500;

  &:hover { opacity: 0.85; }
  &:disabled { opacity: 0.4; cursor: not-allowed; }
`;

interface PhotoStripProps {
    selfieUrl: string | null;
    catUrl: string | null;
    memeUrl: string | null;
    randomColor: string | null; // hex string like "#a3f1bc"
}

export default function PhotoStrip({ selfieUrl, catUrl, memeUrl, randomColor }: PhotoStripProps) {
    const stripRef = useRef(null);
    const [, takeScreenshot] = useScreenshot();

    const allReady = selfieUrl && catUrl && memeUrl && randomColor;

    const handleDownload = async () => {
        const img = await takeScreenshot(stripRef.current);
        const link = document.createElement("a");
        link.download = "photostrip.png";
        link.href = img;
        link.click();
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Strip ref={stripRef}>
                <Title> Photo Strip </Title>
                {selfieUrl && <Photo src={selfieUrl} alt="Selfie" />}
                {catUrl && <Photo src={catUrl} alt="HTTP Cat" />}
                {memeUrl && <Photo src={memeUrl} alt="Meme" />}
                {randomColor && <ColorBlock color={randomColor} />}
            </Strip>

            <DownloadBtn onClick={handleDownload} disabled={!allReady}>
                {allReady ? "⬇ Download" : "Waiting for photos…"}
            </DownloadBtn>
        </div>
    );
}