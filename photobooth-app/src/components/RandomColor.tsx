import styled from "styled-components";
import {useState, memo} from "react";

//Serenity Williams
const StyledBlock = styled.div`
    background-color: ${props => props.color};
    width: 400px;
    height: 400px;
    border: 10px ridge #B562BAFF;
    border-radius: 60px;
`

interface RandomColorProps{
    changeRandomColor: (color: string) => void;
}

function RandomColor({changeRandomColor}:RandomColorProps) {
    // Usestate fo r
    const [randomColor] = useState(
        () => "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")
    )
    changeRandomColor(randomColor)
    return (
        <>
            <h1>Your Color</h1>
            <StyledBlock color={randomColor} />

        </>
    );
}

export default memo(RandomColor)
//don't want this to render twice if not necessary - doesn't change until the next time the user takes a different photo