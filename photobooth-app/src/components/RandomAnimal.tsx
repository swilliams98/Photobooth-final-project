//Lingyin Li

import { useState, memo } from "react";
import styled from "styled-components";

// Wrapper div that centers the cat card on the page
const CatWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
`;

// Styled img tag for the cat photo
const CatImg = styled.img`
    width: 400px;
    height: 400px;
    object-fit: cover;
    border: 10px ridge #B562BAFF;
    border-radius: 60px;
`;

interface RandomAnimalProps{
    changeRandomAnimal: (animal:number) =>void
}
// All valid HTTP status codes that http.cat has a cat photo for
const codes = [100, 101, 102, 103, 200, 201, 202, 203, 204, 205, 206, 207, 208, 214, 226, 300, 301, 302, 303, 304, 305, 307, 308, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 428, 429, 431, 444, 450, 451, 495, 496, 497, 498, 499, 500, 501, 502, 503, 504, 506, 507, 508, 509, 510, 511, 521, 522, 523, 525, 530, 599];

function RandomAnimal({changeRandomAnimal}: RandomAnimalProps) {
    console.log("animal called");
    // Pick a random code once when the component first mounts and never change it
    const [randomAnimal] = useState(() =>  codes[Math.floor(Math.random() * codes.length)]);
    changeRandomAnimal(randomAnimal);
    return (
        <CatWrapper>
            {/* Label above the image */}
            <h1>Your HTTP Cat Picture</h1>

            {/* Fetches the cat image from http.cat using the random code */}
            <CatImg
                src={`https://http.cat/${randomAnimal}`}
                alt={`http cat ${randomAnimal}`}
            />
        </CatWrapper>
    );
}
export default memo(RandomAnimal);