import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, getTypes, filterPokemonsByType, filterCreated, order, cleanPokemons } from '../actions';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import Card from "./Card";
import Paginated from "./Paginated";
import SearchBar from "./SearchBar";
import fondo from '../../src/yCKv80D.jpeg';
import logo from '../pngwing.com.png'
import pikachu from '../../src/pikachu2.gif'

const Body = styled.body`
    background: linear-gradient(to right, #FDC830, #F37335);
    min-height: 96vh;
    font-family:'Roboto Mono', monospace;

    //font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    
`
const Menu = styled.div`
    height: 200px;
    background-image: url(${fondo});
    position: sticky;
    top: 0;
    border: 2px solid whitesmoke;

    img {
        width: 350px;
        margin-top: 10px;
        margin-left: auto;
        margin-right: auto;
        
        display: block;
    }
`
const MenuCrear = styled.div`
    position: fixed;
    top: 15px; 
    right: 60px;
    height: 185px;
    width: 220px;
    font-family: Arial, Helvetica, sans-serif;
    border: 3px outset lightgray;
    border-radius: 10px;
    display: inline;
    button {
        margin: 10px;
        width: 180px;
        height: 40px;
        font-size: 16px;
        border-radius: 5px;
        
        color:black;
        padding:12px 20px;
        background-color:lightgray;
        display:inline-block;
        cursor: pointer;
        :hover {
            background-color:grey;
        }

    }
`
const Order = styled.div`
    font-family: Arial, Helvetica, sans-serif;
    font-style: italic;
    //border: 3px outset lightgray;
    position: fixed;
    top: 50px; 
    left: 310px;
    height: 190px;
    width: 280px;
    p {
        font-size: 17px;
    }
    input {
        //padding: 10px;
        margin-left: 20px;
    }

    fieldset {
        font-size: 14px;
        font-style: normal;
        border-radius: 5px;
        border-color: lightgoldenrodyellow;
        margin: 10px;
    }
    legend {
        font-size: 14px;
        font-weight: bold;
    }
`
const Filter = styled.div`
    font-family: Arial, Helvetica, sans-serif;
    font-style: italic;
    //border: 3px outset lightgray;
    border-radius: 10px;
    position: fixed;
    top: 60px; 
    left: 20px;
    height: 190px;
    width: 280px;

    p {
        font-size: 17px;
    }
    fieldset {
        border-radius: 5px;
        border-color: lightgoldenrodyellow;
        
    }
    legend {
        font-size: 14px;
        font-style: normal;
        font-weight: bold;
    }
    select {
        background: beige;
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-weight: bold;
        height: 29px;
        overflow: hidden;
        width: 220px;
    }
`
export default function Home() {
    const dispatch = useDispatch();
    const allPokemons = useSelector(state => state.pokemons);
    const allTypes = useSelector(state => state.types);
    const message = useSelector(state => state.message);
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
        return () => {
            dispatch(cleanPokemons())
        }
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
    //console.log(allPokemons)
    const handleNextBtn = () => {
        if (currentPage !== Math.ceil(allPokemons.length / pokemonsPerPage)) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handleFilterType = (e) => {
        e.preventDefault();
        dispatch(filterPokemonsByType(e.target.value))
        
        console.log(message)
        // if (message === false) {
        document.getElementById('selectTipos').value = 'All'
        // }
        return message;
    }

    const handleFilterCreated = (e) => {
        e.preventDefault();
        dispatch(filterCreated(e.target.value))
        console.log(message)
        if (message !== undefined) {
            document.getElementById('selectCreados').value = 'all'
        }
        return message;
    }

    const resetFilters = () => {
        document.getElementById('nameDesc').checked = false
        document.getElementById('nameAsc').checked = false
        document.getElementById('attackDesc').checked = false
        document.getElementById('attackAsc').checked = false
        document.getElementById('selectCreados').value = 'all'
        document.getElementById('selectTipos').value = 'All'
        dispatch(getPokemons());
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
                <MenuCrear>
                    <Link to='/pokemon'><button>Crear Pokemon</button></Link>
                    <button onClick={e => handleClick(e)}>Cargar Todos</button>
                    <button onClick={resetFilters}>Limpiar Filtros</button>
                </MenuCrear>
                <img src={logo} alt="img" />
                
                <Order>
                {/*<p>Ordenamiento</p>*/}
                <fieldset onChange={(e) => handleOrder(e)}>
                    <legend>Nombre</legend>
                    <label>
                        <input id='nameAsc' type='radio' value='asc_name' name='name'/>A-Z
                    </label>
                    <label>
                        <input id='nameDesc' type='radio' value='desc_name' name='name'/>Z-A
                    </label>
                </fieldset>
                <fieldset onChange={(e) => handleOrder(e)}>
                    <legend>Fuerza💪</legend>
                    <label>
                        <input id='attackAsc' type='radio' value='asc_attack' name='attack'/>Menos Fuerte
                    </label>
                    <label>
                        <input id='attackDesc' type='radio' value='desc_attack' name='attack'/>Mas Fuerte
                    </label>
                </fieldset>
                </Order>

                <Filter>
                {/*<p>Filtros</p>*/}
                <fieldset>
                <legend>Tipos:</legend>
                <select id='selectTipos' onChange={e => handleFilterType(e)}>
                    {allTypes && allTypes.map(t => {
                        return (
                            <>
                            <option value={t.name} key={t.id}>
                                {t.name}
                            </option>
                            
                            </>
                        )
                    })}
                </select>
                </fieldset>
                <fieldset>
                <legend>Origen:</legend>
                <select id='selectCreados' onChange={e => handleFilterCreated(e)}>
                    <option value='all'>Todos</option>
                    <option value='api'>API</option>
                    <option value='created'>Base de Datos</option>
                </select>
                </fieldset>
                </Filter>

                <SearchBar />
            </Menu>

            <Paginated pokemonsPerPage={pokemonsPerPage} allPokemons={allPokemons.length} paginated={paginated} currentPage={currentPage} handlePrevBtn={handlePrevBtn} handleNextBtn={handleNextBtn}/>
            {
                currentPokemons.length > 0 ? currentPokemons.map(p => {
                    return (
                    <>
                    <Link to={'/home/'+ p.id} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                        <Card attack={p.attack} sprite={p.sprite} name={p.name} type={typeof p.types[0] === 'object' ? p.types.map(t => t.name + ' ') : p.types.map(t => t + ' ')} key={p.id}></Card>
                    </Link>
                    </>
                    )
                }) : <img src={pikachu} style={{height:250 }} alt="loading..." />
                
            }
        </div>
    </Body>
    )
}