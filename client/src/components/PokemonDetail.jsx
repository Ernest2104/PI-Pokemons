import React, {useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetailPokemon, cleanDetailPokemon } from "../actions";
import styled from "styled-components";
import pikachu from '../../src/pikachu2.gif'

const Card = styled.div`
    height: fit-content;
    font-family: 'Roboto Mono', monospace;
    max-width: 400px;
    border-radius: 4px;
    //color: #000;
    text-align: center;
    padding: 10px;
    margin: 0 auto;
    //background-color: #FFF;
    //border: 1px solid black;
    
    ::before {
        content: '';
        background: radial-gradient(#ffffff, #f8b500);
        /* background-size: 3px 3px;
        border-radius: 4px; */
        height: 100%;
        width: 100%;
        position: absolute;
        left: 10px;
        top: 10px;
        z-index: -1;
    }

    div {
        width: 350px;
        margin: 10px auto;
        img {
            width: 300px;
            border-radius: 10%;
        }
    }
    h1 {
        font-size: 40px;
        font-style: italic;
    }
    
    h3 {
        display: table;
        //justify-content: space-between;
        //align-content: space-between;
        padding: 2px;
        margin: 7px;
        font-size: 20px;
    }
    h4 {
        padding: 5px;
        margin: 5px;
        border-radius: 4px;
        border: 1px dashed red;
        font-size: 20px;
        color: darkblue;
    }
`
const Button = styled.button`
    margin-top: 0px;
    font-family: 'Roboto Mono', monospace;
    font-size: 16px;
    border-radius: 5px;
    color:black;
    padding:10px 20px;
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
        <>
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
                </Card> : <img src={pikachu} style={{height:300 }} alt="loading..." />
            }
            <br/>
            <Link to='/home'>
                <Button>Home</Button>
            </Link>
        </>
    );
}
 
export default PokemonDetail;