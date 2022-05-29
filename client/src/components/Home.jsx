import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, getTypes, filterPokemonsByType, filterCreated, order, cleanPokemons, deletePokemon } from '../actions';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
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
`
const Menu = styled.div`
    /* border: 1px solid red; */
    height: 12rem;
    background-image: url(${fondo});
    img {
        width: calc(10rem + 10vw);
        margin-left: auto;
        margin-right: auto;
    }
`
const MenuCrear = styled.div`
    position: absolute;
    display: block;
    right: 2%;
    height: 11rem;
    width: 12rem;
    font-family: Arial, Helvetica, sans-serif;
    border: 0.3rem outset lightgray;
    button {
        margin: 0.65rem;
        width: 10rem;
        height: 2.5rem;
        font-size: calc(0.4rem + 0.4vw);
        border-radius: 0.5rem;
        color:black;
        padding:0.5rem 0.5rem;
        background-color:lightgray;
        display:inline-block;
        cursor: pointer;
        :hover {
            background-color:grey;
        }
    }
`
const OrderFilter = styled.div`
    top: 2%;
    left: 1.5%;

    position: absolute;
    display: inline;
    width: 15%;
`
const Order = styled.div`
    font-family: Arial, Helvetica, sans-serif;
    font-style: italic;
    /* border: 1px solid black; */
    position: absolute;
    height: auto;
    width: 17rem;
    p {
        font-size: calc(2rem + 2vw);
    }
    input {
        margin-left: 5%;
    }

    fieldset {
        font-size: calc(0.4rem + 0.4vw);
        font-style: normal;
        border-radius: 0.5rem;
        border-color: lightgoldenrodyellow;
        margin: 0.1rem;
    }
    legend {
        font-size: calc(0.4rem + 0.4vw);
        font-weight: bold;
    }
`
const Filter = styled.div`
    /* border: 1px solid black; */
    position: absolute;
    top: 2%;
    left: 100%;
    font-family: Arial, Helvetica, sans-serif;
    font-style: italic;
    position: relative;
    height: auto;
    width: 17rem;

    p {
        font-size: calc(1rem + 1vw);
    }
    fieldset {
        border-radius: 0.5rem;
        border-color: lightgoldenrodyellow;
        width: 90%;
        
    }
    legend {
        font-size: calc(0.4rem + 0.4vw);
        font-style: normal;
        font-weight: bold;
    }
    select {
        background: beige;
        font-size: calc(0.4rem + 0.4vw);
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-weight: bold;
        height: 1.7rem;
        overflow: hidden;
        width: 90%;
    }
`
export default function Home() {
    const dispatch = useDispatch();
    const history = useHistory();
    // const { id } = useParams();
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
        dispatch(getPokemons());
        dispatch(getTypes());
        return () => {
            dispatch(cleanPokemons())
        }
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
    
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Estás seguro?',
            text: "El pokémon será borrado permanentemente!",
            icon: 'warning',
            showCancelButton: true,
            background: 'linear-gradient(to right, #FDC830, #F37335)',
            cancelButtonText: 'Cancelar!',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borralo!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Tu Pokémon fue borrado.',
                    showConfirmButton: false,
                    background: 'linear-gradient(to right, #FDC830, #F37335)',
                    timer: 2500,
                },
                    dispatch(deletePokemon(id)),
                    dispatch(getPokemons())
                )
            }
        })
    }

    const handleUpdate = async (id) => {
        Swal.fire({
            title: 'Está seguro que quiere modificar este pokémon?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Si',
            denyButtonText: `No`,
            background: 'linear-gradient(to right, #FDC830, #F37335)'
          }).then((result) => {
            if (result.isConfirmed) {
                history.push('/pokemon/update/' + id)
            } else if (result.isDenied) {
              Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'No se hicieron modificaciones.',
                showConfirmButton: false,
                background: 'linear-gradient(to right, #FDC830, #F37335)',
                timer: 1500,
            })
            }
          })
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
                
                <img src={logo} alt="img" /><SearchBar />

                <OrderFilter>
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
                </OrderFilter>

                {/* <SearchBar /> */}
            </Menu>

            <Paginated pokemonsPerPage={pokemonsPerPage} allPokemons={allPokemons.length} paginated={paginated} currentPage={currentPage} handlePrevBtn={handlePrevBtn} handleNextBtn={handleNextBtn}/>
            {
                currentPokemons.length > 0 ? currentPokemons.map(p => {
                    return (
                    <>
                        <Card 
                            id={p.id}
                            attack={p.attack}
                            sprite={p.sprite}
                            name={p.name} 
                            type={typeof p.types[0] === 'object' ? p.types.map(t => t.name + ' ') : p.types.map(t => t + ' ')} 
                            createInDb={p.createInDb}
                            key={p.id}>
                        </Card>
                        <button onClick={() => handleUpdate(p.id)} hidden={p.createInDb ? false : true}>✅</button>
                        <button onClick={() => handleDelete(p.id)} hidden={p.createInDb ? false : true}>🗑️</button>
                    </>
                    )
                }) : <img src={pikachu} style={{height:250 }} alt="loading..." />
            }
        </div>
    </Body>
    )
}