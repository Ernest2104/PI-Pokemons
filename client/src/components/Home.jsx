import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, getTypes, filterPokemonsByType, filterCreated, order } from '../actions';
import { Link } from 'react-router-dom';
import Card from "./Card";
import Paginated from "./Paginated";
import SearchBar from "./SearchBar";

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

//Pag.1 -->  0 ---- 12
//Pag.2 --> 12 ---- 24
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
    <div>
        <Link to='/pokemon'>Crear Pokemon</Link>
        <h1>POKEMONS</h1>
        <button onClick={e => handleClick(e)}>Volver a cargar todos los pokemones</button>
        <div>
            <select onChange={handleOrder}>
                <optgroup label="Nombre">
                    <option value='asc_name'>Ascendente</option>
                    <option value='desc_name'>Descendente</option>
                </optgroup>
                <optgroup label="Fuerza">
                    <option value='asc_attack'>Ascendente</option>
                    <option value='desc_attack'>Descendente</option>
                </optgroup>
            </select>
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
            <SearchBar />
            <Paginated pokemonsPerPage={pokemonsPerPage} allPokemons={allPokemons.length} paginated={paginated} currentPage={currentPage} handlePrevBtn={handlePrevBtn} handleNextBtn={handleNextBtn}/>
            {
                currentPokemons?.map(p => {
                    return (
                    <>
                    <Link to={'/home/'+ p.id}>
                        <Card attack={p.attack} sprite={p.sprite} name={p.name} type={typeof p.types[0] === 'object' ? p.types.map(t => t.name + ' ') : p.types.map(t => t + ' ')} key={p.id}></Card>
                    </Link>
                    </>
                    )
                })
            }
        </div>
    </div>
)
}