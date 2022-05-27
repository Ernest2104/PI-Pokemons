import React from "react";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import fondo from '../background_landing.png'
import logo from '../pngwing.com.png'

const Body = styled.body`
    background: url(${fondo});
    /* background-size: calc(1.5rem + 2vw); */
    height: 94vh;
    background-position: center;
    border-width:1rem;
    border-style: solid;
    border-color:orange;
    border-radius: 1rem;
    overflow: hidden;

    h1 {
        color: black; 
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
        font-size: calc(1.5rem + 2vw); 
        font-weight: bold; 
        letter-spacing: 0.2rem; 
        text-align: center;
        margin-top: 0;
        padding-top: 2%;
        position: relative;
        top: 10%;
    }
`
const Buttons = styled.div`
    position: relative;
    top: 15%;

    button {
        padding: 1.3em 3em;
        font-size: (1.5rem + 1.5vw);
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 0.2rem;
        color: red;
        background-color: yellow;
        border: none;
        border-radius: 5rem;
        box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease 0s;
        cursor: pointer;
        &:hover {
            background-color: orange;
            box-shadow: 0px 15px 20px rgba(107, 105, 235, 0.4);
            color: #fff;
            transform: translateY(-7px);
        }
        &:active {
        transform: translateY(-1px);
        }
    }
`
const Logo = styled.div`
    position: relative;
    top: 15%;
    img {
        width: calc(15rem + 15vw);
    } 
`

const closeWindow = () => {
    window.open("about:blank","_self").close() 
}

export default function LandingPage() {
    return(
        <Body>
            <h1>WELCOME TO MY POKÉMONS SPA</h1>
            <Logo>
                <img src={logo} alt='logo'/>
            </Logo>
            <Buttons>
                <Link to="/home" >
                    <button>Ingresar</button>
                </Link>
                <p><button onClick={closeWindow}>Cerrar</button></p>
            </Buttons>
        </Body>
    )
}
