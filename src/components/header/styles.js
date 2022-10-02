import styled from "styled-components";

export const Container = styled.header `
    height: 205px;
    width: 100%;
    background-color: #e2e2e2;
    display: flex;
    justify-content: space-between;
    z-index: -1000;
    border-top: 0.2px solid #000;

    h1 {
        color: #000;
        font-family: 'Lato', sans-serif;
        font-size: 56px;
        text-align: left;
        padding: 45px 30px;
        font-weight: bold;
    }

    h2 {
        color: #000;
        font-family: 'Lato', sans-serif;
        font-size: 40px;
        padding: 75px 30px;
        font-weight: bold;
        margin-right: 5rem;
    }
`