import styled from "styled-components";

export const Container = styled.header`
  color: #fff;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  span {
    font-style: italic;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  table {
    width: 70%;
    border-collapse: separate;
    margin-top: 1rem;
    border-spacing: 5px 0.5rem;
    background-color: #1c2339;
    box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
      rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
      rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  }

  thead {
    background-color: #282c34;
  }

  th {
    color: #fff;
    padding: 1rem 2rem;
    text-align: center;
    font-size: 1.1rem;
    line-height: 1rem;
  }

  select {
    width: 200px;
    display: block;
    margin: auto;
    position: relative;
    left: 0rem;
    color: #000;
    border: 4px solid #fff;
    font-weight: bold;
  }

  td {
    padding: 1rem 2rem;
    text-align: center;
    border-right: 1px solid red;
    border: 0px;
    margin: 5px;
    background-color: #fff;
    color: #000;
    font-family: "Lato", sans-serif;
    font-weight: bold;
    font-size: 1rem;
    border-radius: 0.45rem;
    box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
      rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
      rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  }

  td:hover {
    background-color: #ddd;
  }

  h2 {
    text-align: center;
  }

  h1 {
    font-size: 2rem;
    margin: 2rem;
  }
`;

export const Card = styled.div`
  background-color: #282c34; // Cor de fundo do card
  border-radius: 8px; // Bordas arredondadas
  padding: 40px; // Espaçamento interno
  margin: 20px 0; // Margem vertical
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 10px; // Sombra para profundidade
  color: #ffffff; // Cor do texto

  h3 {
    margin: 0;
    text-align: center;
    font-weight: bold;
  }

  h2 {
    text-align: center; // Centralizar o valor
    font-size: 2em; // Tamanho da fonte da soma total
    margin-top: 10px; // Distância entre o título e o valor
  }
`;
