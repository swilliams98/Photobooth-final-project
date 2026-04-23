import styled from "styled-components";


import {useState} from "react";

const StyledRandColor = styled.div`
    margin: 0 auto;
    box-sizing: border-box;
   
`
const StyledBlock = styled.div<{color : string}>`
    background-color: ${(props)=>props.color};
    width: 400px;
    height: 400px;
    border-radius: 15px;
`
interface RandomColorProps {
    photoTaken: boolean
}

export default function RandomColor({ photoTaken }: RandomColorProps) {
    const [randomColor] = useState(
        () =>  "#" + Math.floor(Math.random() * 0xffffff).toString(16)
    );
     if (!photoTaken) return (<></>)
    return(
        <StyledRandColor>
            <h1>Your color is:</h1>
            <StyledBlock color = {randomColor}/>
        </StyledRandColor>
    );

}