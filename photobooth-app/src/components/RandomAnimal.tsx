import styled from "styled-components";
import type { Cat } from "../interfaces/cats";

const CatWrapper = styled.div`
    width: 220px;
    height: 280px;
    background-color: #6b3d3d;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const CatImg = styled.img`
    width: 180px;
    height: 180px;
    object-fit: cover;
    margin-bottom: 1rem;
`;

export default function CatBlock(props: Cat) {
    if (!props.code) {
        return <CatWrapper>this is your cat</CatWrapper>;
    }

    return (
        <CatWrapper>
            <CatImg
                src={`https://http.cat/${props.code}`}
                alt={`http cat ${props.code}`}
            />
            <p>{props.code}</p>
        </CatWrapper>
    );
}