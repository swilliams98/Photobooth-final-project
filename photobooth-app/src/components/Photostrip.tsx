import { useRef, memo} from "react";
// import html2canvas from "html2canvas";
import { useScreenshot } from "use-react-screenshot";
import styled from "styled-components";

//
// // Converts an external image URL to a base64 data URL.
// // Uses images.weserv.nl as a proxy — it's purpose-built for image proxying
// // and always returns CORS headers, unlike http.cat which blocks direct fetches.
// async function toDataUrl(url: string): Promise<string> {
//   const fetchAsDataUrl = async (fetchUrl: string): Promise<string> => {
//     const res = await fetch(fetchUrl);
//     if (!res.ok) throw new Error(`HTTP ${res.status}`);
//     const blob = await res.blob();
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => resolve(reader.result as string);
//       reader.onerror = reject;
//       reader.readAsDataURL(blob);
//     });
//   };
//
//   try {
//     // Try direct fetch first (works for Giphy which supports CORS)
//     return await fetchAsDataUrl(url);
//   } catch {
//     // Fall back to images.weserv.nl — a dedicated image proxy that adds CORS headers
//     return await fetchAsDataUrl(`https://images.weserv.nl/?url=${encodeURIComponent(url)}`);
//   }
// }
//
// // ─── Styled components ────────────────────────────────────────────────────────
//
// const Wrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

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
    margin-top: 16px;
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

interface PhotoStripProps {
    selfieUrl: string;
    catUrl: string ;
    memeUrl: string;
    randomColor: string; // hex string like "#a3f1bc"
}

 function PhotoStrip({ selfieUrl, catUrl, memeUrl, randomColor }: PhotoStripProps) {
    const stripRef = useRef(null);
    const [, takeScreenshot] = useScreenshot();

    const allReady = (selfieUrl && catUrl && memeUrl && randomColor);

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
                <Photo src={selfieUrl} alt="Selfie" />
                <Photo src={catUrl} alt="HTTP Cat" />
                <Photo src={memeUrl} alt="Meme" />
                <ColorBlock color={randomColor} />
            </Strip>

            <DownloadBtn onClick={handleDownload} disabled={!allReady}>
                {allReady ? "⬇ Download" : "Waiting for photos…"}
            </DownloadBtn>
        </div>
    );
  // const stripRef = useRef<HTMLDivElement>(null);
  // const [downloading, setDownloading] = useState(false);
  //
  // // Convert external images to data URLs before rendering.
  // // null = still loading/converting
  // const [memeDataUrl, setMemeDataUrl] = useState<string | null>(null);
  // const [catDataUrl, setCatDataUrl]   = useState<string | null>(null);
  //
  // useEffect(() => {
  //   if (!memeUrl) return;
  //   setMemeDataUrl(null); // reset while new meme converts
  //   toDataUrl(memeUrl)
  //     .then(setMemeDataUrl)
  //     .catch(() => setMemeDataUrl(memeUrl)); // last resort: original URL
  // }, [memeUrl]);
  //
  // useEffect(() => {
  //   if (!catUrl) return;
  //   setCatDataUrl(null); // reset while new cat converts
  //   toDataUrl(catUrl)
  //     .then(setCatDataUrl)
  //     .catch(() => setCatDataUrl(catUrl)); // last resort: original URL
  // }, [catUrl]);
  //
  // // Download button stays disabled until every image is ready
  // const allReady = !!(selfieUrl && memeDataUrl && catDataUrl && randomColor);
  //
  // const handleDownload = async () => {
  //   if (!stripRef.current) return;
  //   setDownloading(true);
  //   try {
  //     // All images are data URLs — no cross-origin canvas issues
  //     const canvas = await html2canvas(stripRef.current, {
  //       scale: 2,
  //       backgroundColor: "#ffffff",
  //       useCORS: false,
  //       allowTaint: false,
  //     });
  //     const link = document.createElement("a");
  //     link.download = "photostrip.png";
  //     link.href = canvas.toDataURL("image/png");
  //     link.click();
  //   } catch (err) {
  //     console.error("Download failed:", err);
  //   } finally {
  //     setDownloading(false);
  //   }
  // };
  //
  // return (
  //   <Wrapper>
  //     <Strip ref={stripRef}>
  //       <Title>Photo Strip</Title>
  //
  //       {/* Selfie is already a data URL straight from the webcam */}
  //       {selfieUrl && <Photo src={selfieUrl} alt="Selfie" />}
  //
  //       {/* Meme: placeholder while converting, then the data URL */}
  //       {!memeDataUrl
  //         ? <LoadingBox>Loading meme…</LoadingBox>
  //         : <Photo src={memeDataUrl} alt="Meme" />
  //       }
  //
  //       {/* Color block needs no async loading */}
  //       {randomColor && <ColorBlock color={randomColor} />}
  //
  //       {/* Cat: placeholder while converting via proxy, then the data URL */}
  //       {!catDataUrl
  //         ? <LoadingBox>Loading cat…</LoadingBox>
  //         : <Photo src={catDataUrl} alt="HTTP Cat" />
  //       }
  //     </Strip>
  //
  //     <DownloadBtn onClick={handleDownload} disabled={!allReady || downloading}>
  //       {!allReady ? "Loading images…" : downloading ? "Saving…" : "⬇ Download Strip"}
  //     </DownloadBtn>
  //   </Wrapper>
  // );
}

export default memo(PhotoStrip);