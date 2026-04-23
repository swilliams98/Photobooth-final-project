import { useState } from "react";
import styled from "styled-components";

// Wrapper div that centers the cat card on the page
const CatWrapper = styled.div`
    width: 400px;
    min-height: 200px;
    color: white;
    display: flex;                /* lines up the text and image vertically */
    flex-direction: column;
    align-items: center;          /* centers children horizontally */
    justify-content: center;      /* centers children vertically */
    border-radius: 16px;          /* rounded corners */
    padding: 1rem;
    margin: 2rem auto;            /* centers the card on the page */
    outline: none;                /* removes the pink browser focus border */
`;

// Styled img tag for the cat photo
const CatImg = styled.img`
    width: 400px;
    height: 400px;
    object-fit: cover;            /* crops the image to fill the box without stretching */
    margin-bottom: 1rem;
    border-radius: 12px;          /* rounded corners on the image */
`;

// All valid HTTP status codes that http.cat has a cat photo for
const codes = [100, 101, 102, 103, 200, 201, 202, 203, 204, 205, 206, 207, 208, 214, 226, 300, 301, 302, 303, 304, 305, 307, 308, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 428, 429, 431, 444, 450, 451, 495, 496, 497, 498, 499, 500, 501, 502, 503, 504, 506, 507, 508, 509, 510, 511, 521, 522, 523, 525, 530, 599];

export default function RandomAnimal({ photoTaken }: { photoTaken: boolean }) {
    // Pick a random code once when the component first mounts and never change it
    const [randomCode] = useState(
        () => codes[Math.floor(Math.random() * codes.length)]
    );

    // Don't show anything until the user has taken a photo
    if (!photoTaken) return null;

    return (
        <CatWrapper>
            {/* Label above the image */}
            <p>Your HTTP cat picture :D</p>

            {/* Fetches the cat image from http.cat using the random code */}
            <CatImg
                src={`https://http.cat/${randomCode}`}
                alt={`http cat ${randomCode}`}
            />
        </CatWrapper>
    );
}