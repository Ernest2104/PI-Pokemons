import React from "react";
//import styles from './Card.module.css'
import styled from 'styled-components';

const Body = styled.body`
    margin: 15px;
    padding: 0px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    //float: left;
    display: inline-block;
    
`    
const CardContainer = styled.div`
    background: linear-gradient(to right, #fad61f, #fad61f);
    width: 250px;
    height: auto;
    margin: 5%;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px black;
`
const Content = styled.div`
    background: linear-gradient(to right, #f5e593, #fff2af);
    padding: 10px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    h1 {
        text-align: center;
        font-style:italic;
        font-size: 26px;
        font-weight: lighter;
        padding: 5px;
    }
    h3 {
        font-size: 14px;
        font-weight: lighter;
        letter-spacing: 1px;
        text-align: left;
    }
    p{
        width: auto;
        background-color: black;
        padding: 7px;
        color: white;
        border-radius: 5px;
        text-align: center;
        top: 10px;
    }
`
const Background = styled.div`
    text-align: center;
    background: linear-gradient(to right,#b09711,#504921);
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;

    img{
        width: 170px;
        height: 170px;
    }
    img:hover {
        transform: scale(1.1);
    }
`
export default function Card({ attack, sprite, name, type }) {
    return (
        <Body>
            <CardContainer>
                <Background>
                    <img src={sprite} alt="img not found"/>
                </Background>
                <Content>
                    <h1>{name}</h1>
                    <h3>Strength: {attack}</h3>
                    <p>{type}</p>
                </Content>
            </CardContainer>
        </Body>
    )
}