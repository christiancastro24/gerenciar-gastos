import styled from "styled-components";

export const Container = styled.header`
  height: 145px;
  width: 100%;
  background-color: dodgerblue;
  display: flex;
  z-index: -1000;
  border-top: 0.2px solid #000;
  align-items: center;

  select {
    width: 200px;
    display: block;
    margin-left: auto;
    position: relative;
    left: -6rem;
    border: 4px solid #fff;
    font-weight: bold;
  }

  h1 {
    color: #f0f0f0;
    font-family: "Lato", sans-serif;
    font-size: 36px;
    text-align: left;
    padding: 45px 30px;
    font-weight: bold;
  }

  h2 {
    color: #000;
    font-family: "Lato", sans-serif;
    font-size: 25px;
    padding: 55px 30px;
    font-weight: bold;
    margin-right: 5rem;
  }
`;

export const ContainerMonth = styled.section`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  margin-right: 50px;

  div {
    margin-right: 10px;
    cursor: pointer;

    p {
      border-radius: 20%;
      color: #fff !important;
      font-weight: bold !important;
      background-color: #d4c9ad;
    }

    .active {
      color: #000;
      cursor: pointer;
      background-color: #a4c972;
      padding: 10px;
      box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
        rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
        rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    }

    .disabled {
      padding: 10px;
    }
  }
`;
