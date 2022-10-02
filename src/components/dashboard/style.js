import styled from "styled-components";

export const Container = styled.div `
    margin: 15px auto;
    display: flex;
    text-align: center;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    h2 {
        font-size: 30px;
        text-decoration: underline #0095f6;
    }

    table {
        width: 70%;
        border-collapse: separate;
        margin-top: 5rem;
        border-spacing: 10px 0.5rem;
        background-color: #1c2339;
        box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
    
    }

    thead {
        background-color: #282c34;
    }


    th {
        color: #fff;
        padding: 1rem 2rem;
        text-align: center;
        font-size: 1.5rem;
        line-height: 1rem;
    }

    td {
        padding: 1rem 2rem;
        border-right: 1px solid red;
        border: 0px;
        margin: 5px;
        background-color: #fff;
        color: #000;
        font-family: 'Lato', sans-serif;
        font-weight: bold;
        font-size: 1.2rem;
        border-radius: 0.45rem;
        box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
    }

    td:hover {
        background-color: #ddd;
    }


    button {
        margin-left: auto;
        margin-right: 2rem;
    }

    .entrada {
        color: green;
    }

    .saida {
        color: red;
    }

    .container-boxes {
        display: flex;
        margin: 30px;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        margin-top: -10rem;
        z-index: 1000;

        .entrada, .saida, .total {
            border-radius: 0.55rem;
            width: 22rem;
            height: 12rem;
            margin: 15px;
            color: #363F5F;
            padding-top: 1rem;
            box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;

            h3 {
                font-size: 35px;
                color: #fff;
                font-family: 'Lato', sans-serif;
                padding-left: 2.5rem;
                text-align: left;
            }

            strong {
                display: block;
                font-family: 'Lato', sans-serif;
                padding-top: 1.8rem;
                color: #FFF;
                text-align: right;
                padding-right: 2.5rem;
                font-size: 30px;
            }
        }

        .entrada {
            background-color: #008000;
        }

        .saida {
            background-color: #ed9121;
        }

        .total {
            background-color: #708090;
        }
    }

    input {
        width: 20em;
        padding: 0.5em;
    }

    label {
        margin: 0.3em;
    }
`
