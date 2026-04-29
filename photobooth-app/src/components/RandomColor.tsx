import styled from "styled-components";
// import {useState} from "react";

const StyledRandColor = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

`
const StyledBlock = styled.div<{color : string}>`
    background-color: ${(props)=>props.color};
    width: 400px;
    height: 400px;
    border: 10px ridge #B562BAFF;
    border-radius: 60px;
`
interface RandomColorProps {
    photoTaken: boolean
}

export default function RandomColor({ photoTaken, randomColor }: RandomColorProps) {
    // const [randomColor] = useState(
    //     () =>  "#" + Math.floor(Math.random() * 0xffffff).toString(16)
    // );
     if (!photoTaken) return (<></>)
    return(
        <StyledRandColor>
            <h1>Your Color Is</h1>
            <StyledBlock color = {randomColor}/>
        </StyledRandColor>
    );

}