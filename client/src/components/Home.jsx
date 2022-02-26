import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, getTypes, filterPokemonsByType, filterCreated, order } from '../actions';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import Card from "./Card";
import Paginated from "./Paginated";
import SearchBar from "./SearchBar";
import fondo from '../../src/rEWUdzp.jpeg';
import logo from '../pngwing.com.png'

const Body = styled.body`
    background: linear-gradient(to right, #FDC830, #F37335);
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    
`
const Menu = styled.div`
    height: 250px;
    background-image: url(${fondo});
    position: sticky;
    top: 0;
    border: 2px solid whitesmoke;

    img {
        width: 350px;
        margin-left: auto;
        margin-right: auto;
        display: block;
    }
 

`
const Order = styled.div`
    border: 1px solid black;
    position: fixed;
    top: 10px; 
    right: 20px;
    background-color: lightblue;
`
const Filter = styled.div`
    border: 1px solid black;
    position: fixed;
    top: 10px; 
    left: 20px;
    background-color: lightgray;
`

export default function Home() {
    const dispatch = useDispatch();
    const allPokemons = useSelector(state => state.pokemons);
    const allTypes = useSelector(state => state.types);
    const [orden, setOrden] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
    const indexOfLastPokemon = currentPage * pokemonsPerPage // 12
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage // 0
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getPokemons())
    }, [dispatch])

    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch])

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getPokemons());
        setCurrentPage(1);
    }

    const handlePrevBtn = () => {
        if (currentPage !== 1)
        setCurrentPage(currentPage - 1)
    }

    const handleNextBtn = () => {
        if (currentPage !== Math.ceil(allPokemons.length / pokemonsPerPage)) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handleFilterType = (e) => {
        e.preventDefault();
        dispatch(filterPokemonsByType(e.target.value))
    }

    const handleFilterCreated = (e) => {
        e.preventDefault();
        dispatch(filterCreated(e.target.value))
    }

    const handleOrder = (e) => {
        dispatch(order(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }

    return (
    <Body>
        <div>
            <Menu>
                <Link to='/pokemon'>Crear Pokemon</Link>
                {/*<h1>POKEMONS</h1>*/}
                <img src={logo} alt="img" />
                <button onClick={e => handleClick(e)}>Volver a cargar todos los pokemones</button>
        
                <Order>
                <h3>Ordenamiento</h3>
                <fieldset onChange={(e) => handleOrder(e)}>
                    {/*<optgroup label="Nombre">*/}
                    <legend>Orden x Nombre</legend>
                    <label>
                        <input type='radio' value='asc_name' name='name'/>Ascendente
                    </label>
                    <label>
                        <input type='radio' value='desc_name' name='name'/>Descendente
                    </label>
                </fieldset>
                <fieldset onChange={(e) => handleOrder(e)}>
                    {/*</optgroup>*/}
                    {/*<optgroup label="Fuerza">*/}
                    <legend>Orden x Fuerza</legend>
                    <label>
                        <input type='radio' value='asc_attack' name='attack'/>Ascendente
                    </label>
                    <label>
                        <input type='radio' value='desc_attack' name='attack'/>Descendente
                    </label>
                    {/*</optgroup>*/}
                </fieldset>
                </Order>

                <Filter>
                <h3>Filtros</h3>
                <select onChange={e => handleFilterType(e)}>
                    { allTypes && allTypes.map(t => {
                        return (
                            <option value={t.name} key={t.id}>
                                {t.name}
                            </option>
                        )
                    })}
                </select>
                    <select onChange={e => handleFilterCreated(e)}>
                    <option value='all'>Todos</option>
                    <option value='api'>API</option>
                    <option value='created'>Base de Datos</option>
                </select>
                </Filter>

                <SearchBar />
            </Menu>

            <Paginated pokemonsPerPage={pokemonsPerPage} allPokemons={allPokemons.length} paginated={paginated} currentPage={currentPage} handlePrevBtn={handlePrevBtn} handleNextBtn={handleNextBtn}/>
            {
                currentPokemons?.map(p => {
                    return (
                    <>
                    <Link to={'/home/'+ p.id} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                        <Card attack={p.attack} sprite={p.sprite} name={p.name} type={typeof p.types[0] === 'object' ? p.types.map(t => t.name + ' ') : p.types.map(t => t + ' ')} key={p.id}></Card>
                    </Link>
                    </>
                    )
                })
            }
        </div>
    </Body>
    )
}