import React from "react";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import fondo from '../background_landing.png'
import logo from '../pngwing.com.png'

const Body = styled.body`
    background: url(${fondo});
    //background-size: cover;
    height: 94vh;
    background-position: center;
    border-width:20px;
    border-style: solid;
    border-color:orange;
    border-radius: 5px;
    overflow: hidden;

    h1 {
        color: black; 
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
        font-size: 60px; 
        font-weight: bold; 
        letter-spacing: -1px; 
        text-align: center;
        margin-top: 0px;
        padding-top: 50px;
        position: relative;
        top: 30px;
    }
`
const Button = styled.button`
    padding: 1.3em 3em;
    font-size: 14px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    color: red;
    background-color: yellow;
    border: none;
    border-radius: 45px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    position: relative;
    top: 150px; /* ajustar los valores para mover la imagen */
    left: -20px;
    
    &:hover {
        background-color: orange;
        box-shadow: 0px 15px 20px rgba(107, 105, 235, 0.4);
        color: #fff;
        transform: translateY(-7px);
    }

    &:active {
    transform: translateY(-1px);
   }
`
const Logo = styled.div`
    position: relative;
    top: 150px; /* ajustar los valores para mover la imagen */
    left: -30px;
`

export default function LandingPage() {
    return(
        
        <Body>
            <h1>WELCOME TO MY POKÉMONS SPA</h1>
            <Logo>
                <img src={logo} alt='logo'/>
            </Logo>
            <Link to="/home" >
                <Button>Ingresar</Button>
            </Link>
        </Body>
        
    )
}
