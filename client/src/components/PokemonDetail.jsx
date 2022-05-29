import React, {useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetailPokemon, cleanDetailPokemon } from "../actions";
import styled from "styled-components";
import pikachu from '../../src/pikachu2.gif'

const Body = styled.body`
    width: 100vw;
`
const Card = styled.div`
    height: fit-content;
    font-family: 'Roboto Mono', monospace;
    width: 30%;
    border-radius: 3rem;
    padding: 0.5rem;
    margin: 0 auto;
    
    ::before {
        content: '';
        background: radial-gradient(#ffffff, #f8b500);
        height: 100%;
        width: 100%;
        position: absolute;
        left: 1rem;
        top: 1rem;
        z-index: -1;
    }

    div {
        display: flex;
        justify-content: center;  
        img {
            width: calc(8rem + 8vw);
        }
    }
    h1 {
        font-size: calc(1.5rem + 1.5vw);
        font-style: italic;
    }
    
    h3 {
        min-width: auto;
        display: table;
        padding: 0.1rem;
        margin: 0.5rem;
        font-size: calc(0.6rem + 0.6vw);
    }
    h4 {
        padding: 0.4rem;
        margin: 0.4rem;
        border-radius: 0.4rem;
        border: 1px dashed red;
        font-size: calc(0.65rem + 0.65vw);
        color: darkblue;
    }
`
const Button = styled.button`
    margin-top: 0;
    font-family: 'Roboto Mono', monospace;
    font-size: calc(0.55rem + 0.55vw);
    border-radius: 0.5rem;
    color:black;
    padding:0.7rem 1.5rem;
    background-color:lightgrey;
    display:inline-block;
    cursor: pointer;
    :hover {
        background-color:grey;
    }
`
const PokemonDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    
    useEffect(() => {
        dispatch(getDetailPokemon(id));
        return () => {
            dispatch(cleanDetailPokemon());
        }
    }, [dispatch, id])

    const myPokemon = useSelector(state => state.detail);
    console.log(myPokemon.length > 0 && myPokemon[0].name)

    return (
        <Body>
            {    
                myPokemon.length > 0 ?
                <Card>
                    <h1>{myPokemon[0].name}</h1>
                    <div>
                        <img src={myPokemon[0].sprite} alt='img not found' />
                    </div>
                    <h4>Tipos: {typeof myPokemon[0].types[0] === 'object' ? myPokemon[0].types.map(t => t.name + ' ') : myPokemon[0].types.map(t => t + ' ')}</h4>
                    <h3>Id: {myPokemon[0].id}</h3>
                    <h3>Puntos de vida: {myPokemon[0].hp}</h3>
                    <h3>Fuerza: {myPokemon[0].attack}</h3>
                    <h3>Defenza: {myPokemon[0].defense}</h3>
                    <h3>Velocidad: {myPokemon[0].speed}</h3>
                    <h3>Altura: {myPokemon[0].height}</h3>
                    <h3>Peso: {myPokemon[0].weight}</h3>
                    <br/>
            <Link to='/home'>
                <Button>Home</Button>
            </Link>
                </Card> : <img src={pikachu} style={{height:300 }} alt="loading..." />
            }
            {/* <br/>
            <Link to='/home'>
                <Button>Home</Button>
            </Link> */}
        </Body>
    );
}
 
export default PokemonDetail;