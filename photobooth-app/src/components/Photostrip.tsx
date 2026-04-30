import { useRef,useState, useEffect, memo} from "react";
import html2canvas from "html2canvas";
//Scarlet Alvarez, Lingyin Li, Faria Zaman, Serenity Williams

import styled from "styled-components";
const LoadingBox = styled.div`
  width: 228px;
  height: 180px;
  background: #f0f0f0;
  border: 2px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  color: #aaa;
  letter-spacing: 2px;
  text-transform: uppercase;
`;


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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
  margin-top: 40px;
`;

const Title = styled.p`
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

//

const ColorBlock = styled.div<{ color: string }>`
  width: 228px;
  height: 180px;
  background-color: ${(props) => props.color};
  border: 2px solid #ddd;
  display: block;
`;

const DownloadBtn = styled.button`
    margin: 25px 0;
    background: #5c489a;
    color: #d6cde6;
    font-size: 13px;
    font-weight: bold;
    letter-spacing: 2px;
    text-transform: uppercase;
    border: 3px solid #5c489a;
    padding: 12px 28px;
    cursor: pointer;
    box-shadow: 4px 4px 0px #d6cde6;
    &:hover {
        opacity: 0.85;
    }

    &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }
`;

// Converts an external image URL to a base64 data URL.
// Uses images.weserv.nl for image proxying because http.cat blocks grabbing the image directly
async function toDataUrl(url: string): Promise<string> {
    const fetchAsDataUrl = async (fetchUrl: string): Promise<string> => {
        const res = await fetch(fetchUrl);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const blob = await res.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };
    try {
        // Try direct fetch first (works for Giphy which supports CORS)
        return await fetchAsDataUrl(url);
    } catch {
        // Fall back to images.weserv.nl — a dedicated image proxy that adds CORS headers
        return await fetchAsDataUrl(`https://images.weserv.nl/?url=${encodeURIComponent(url)}`);
    }
}

interface PhotoStripProps {
    selfieUrl: string;
    catUrl: string ;
    memeUrl: string;
    randomColor: string; // hex string like "#a3f1bc"
}

function PhotoStrip({ selfieUrl, catUrl, memeUrl, randomColor }: PhotoStripProps) {
    const stripRef = useRef<HTMLDivElement>(null);
    const [downloading, setDownloading] = useState(false);
    // Convert external images to data URLs before rendering.
    const [memeDataUrl, setMemeDataUrl] = useState("");
    const [catDataUrl, setCatDataUrl]   = useState("");

    useEffect(() => {
        if (!memeUrl) return;
        setMemeDataUrl(null); // reset while new meme converts
        toDataUrl(memeUrl)
        .then(setMemeDataUrl)
        .catch(() => setMemeDataUrl(memeUrl)); // last resort: original URL
    }, [memeUrl]);

    useEffect(() => {
        if (!catUrl) return;
        setCatDataUrl(null); // reset while new cat converts
        toDataUrl(catUrl)
        .then(setCatDataUrl)
        .catch(() => setCatDataUrl(catUrl)); // last resort: original URL
    }, [catUrl]);

    const allReady = !!(selfieUrl && memeDataUrl && catDataUrl && randomColor);

    const handleDownload = async () => {
        if (!stripRef.current) return;
            setDownloading(true);
        try {
            const canvas = await html2canvas(stripRef.current, {
            scale: 2,
            backgroundColor: "#ffffff",
            useCORS: false,
            allowTaint: false,
            });
            const link = document.createElement("a");
            link.download = "photostrip.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
        } catch (err) {
            console.error("Download failed:", err);
        } finally {
            setDownloading(false);
        }
    };

    return (
        <Wrapper>
            <Strip ref={stripRef}>
                <Title>Photo Strip</Title>
                {/* Selfie is fine */}
                {selfieUrl && <Photo src={selfieUrl} alt="Selfie" />}
                {/* Loading visual as the meme photo is converted */}
                {!memeDataUrl
                ? <LoadingBox>Loading meme…</LoadingBox>
                : <Photo src={memeDataUrl} alt="Meme" />
                }
                {/* Color block is also fine */}
                {randomColor && <ColorBlock color={randomColor} />}
                {/* Loading visual as the cat photo is converted */}
                {!catDataUrl
                ? <LoadingBox>Loading cat…</LoadingBox>
                : <Photo src={catDataUrl} alt="HTTP Cat" />
                }
            </Strip>
            <DownloadBtn onClick={handleDownload} disabled={!allReady || downloading}>
                {!allReady ? "Loading images…" : downloading ? "Saving…" : "⬇ Download Strip"}
            </DownloadBtn>
        </Wrapper>
    );
}

export default memo(PhotoStrip);