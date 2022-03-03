import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom';
import {getTypes, postPokemon, getPokemons} from '../actions/index.js'
import styled from "styled-components";
import deco from '../../src/pokemon-transparent.png'

const Body = styled.body`
    background: linear-gradient(to right, #FDC830, #F37335);
    min-height: 96vh;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    h1 {
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 40px;
        padding: 20px;
        color: crimson;
    }
`
const Error = styled.p`
    font-size: 13px;
    font-weight: bold;
    color: red;
`
const Imagen = styled.img`
    height: 500px;
    position: fixed;
    top: 150px;
    left: 200px;
`
const Carga = styled.body`
    padding: 25px;
    background-color: orange;
    text-align: left;
    display: inline-table;
    border: 2px solid black;
    border-radius: 10px;
    position: absolute;
    top:150px;
    right: 550px;
    height: auto;
    width: 350px;
    label {
        //background: none repeat scroll 0 0 #F3F3F3;
        display: block;
        float: left;
        font-size: 13px;
        font-weight: bold;
        height: 24px;
        margin: 0 10px 0 0;
        padding: 3px 7px;
        width: 60px;
    }
    input[type='text'] {
        background-color: lightgray;
        border: 1px solid #CCCCCC;
        height: 12px;
        padding: 6px;
        width: 180px;
    }
    input[type='range'] {
        width: 180px;
    }
    input[type='submit'] {
        padding: 0.5em 1em;
        border-radius: 5px;
        background: lightgrey;
        cursor: pointer;
        margin-top: 15px;
        margin-left: 50%;
        transform: translateX(-50%);
        :hover {
        background-color:grey;
        }
    }
    select {
        background-color: lightgray;
        border: 1px solid #CCCCCC;
        height: 30px;
        padding: 4px;
        width: 180px;
    }
    button {
        padding: 0.5em 1em;
        border-radius: 5px;
        background: lightgrey;
        cursor: pointer;
        margin-top: 15px;
        margin-left: 50%;
        transform: translateX(-50%);
        :hover {
        background-color:grey;
        }
    }
`
const Type = styled.li`
    text-align: center;
    display: inline-block;
    font-size: 14px;
    font-weight: bold;
    margin: 0;
    padding:0;
    button {
        font-weight: bold;
        background-color: red;
    }
`

const validateInput = (input) => {
    let errors = {};
    if (!input.name) {
        errors.name = 'Se requiere nombre!!';
    } 
    else if (/^([0-9])*$/.test(input.name)){
        errors.name = 'Solo caracteres!!'
    }
    
    if (!input.hp) {
        errors.hp = 'Se debe ingresar vida!!'
    }
    
    if (!input.weight) {
        errors.weight = 'Se debe ingresar el peso!!'
    }
    else if (!/^[0-9]+([.])?([0-9]+)?$/.test(input.weight)){
        errors.weight = 'Solo números!!'
    }
    else if(input.weight < 0 || input.weight > 100){
        errors.weight = 'Rango entre 0 y 100 kgs.!!'
    }

    if (!input.height) {
        errors.height = 'Se debe ingresar la altura!!'
    }
    else if (!/^[0-9]+([.])?([0-9]+)?$/.test(input.height)){
        errors.height = 'Solo números!!'
    }
    else if(input.height < 0 || input.height > 20){
        errors.height = 'Rango entre 0 y 20 mts.!!'
    }

    if (!input.type.length) {
            console.log(input.type)
        errors.type = 'Debe colocar por lo menos un tipo!!'
    }
  
    return errors;
}

const PokemonCreate = () => {
    const dispatch = useDispatch();
    const allPokemons = useSelector(state => state.pokemons);
    const types = useSelector(state => state.types);
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name:"",
        hp:"",
        attack:"",
        defense:"",
        speed:"",
        weight:"",
        height:"",
        sprite:"", 
        type: []
    })

    useEffect(() => {
        dispatch(getPokemons())
    },[dispatch])

    useEffect(() => {
        dispatch(getTypes())
    },[dispatch])

    const handleChange = (e) => {
        if (allPokemons.filter(p => p.name === input.name).length) {
            alert('Ya existe ese nombre')
            setInput(input.name="")
            document.getElementById('inputName').focus()
        }
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validateInput({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    const handleSelect = (e) => {
        if ( input.type == e.target.value) 
            alert('Ya seleccionó ese tipo...')
        
        else if ( input.type.length < 2) {
        
        setInput({
            ...input,
            type: [...input.type, e.target.value]
        })
        setErrors(validateInput({
            ...input,
            [e.target.name]: e.target.value
        }))
        } else {
            alert('Un Pokémon puede tener como máximo 2 tipos!!')
        }
    }

    const handleDelete = (tipo) => {
        setInput({
            ...input,
            type: input.type.filter(t => t !== tipo)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.sprite === "") {
            input.sprite = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/601px-Pokebola-pokeball-png-0.png"
        }
        dispatch(postPokemon(input));
        alert('Pokémon creado con éxito!!')
        setInput({
            name:"",
            hp:"",
            attack:"",
            defense:"",
            speed:"",
            weight:"",
            height:"",
            sprite:"", 
            type: []
        })
    }

    return (  
        <Body>
            <h1>Crea tu Pokemon!</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <Imagen src={deco} alt='img' />
                <Carga>
                    <p><label>Nombre: </label>
                        <input type="text" value={input.name} name="name" onChange={handleChange} id="inputName"/></p>
                        {errors.name && <Error>{errors.name}</Error>}
                    <p><label>Vida: </label>
                        <input type="range" min="0" max="255" step="10" value={input.hp} name="hp" onChange={handleChange}/>{input.hp}</p>
                        {errors.hp && <Error>{errors.hp}</Error>}
                    <p><label>Fuerza: </label>
                        <input type="range" min="0" max="255" step="10" value={input.attack} name="attack" onChange={handleChange}/>{input.attack}</p>
                    <p><label>Defenza: </label>
                        <input type="range" min="0" max="255" step="10" value={input.defense} name="defense" onChange={handleChange}/>{input.defense}</p>
                    <p><label>Velocidad: </label>
                        <input type="range" min="0" max="255" step="10" value={input.speed} name="speed" onChange={handleChange}/>{input.speed}</p>
                    <p><label>Peso: </label>
                        <input type="text" value={input.weight} name="weight" onChange={handleChange}/></p>
                        {errors.weight && <Error>{errors.weight}</Error>}
                    <p><label>Altura: </label>
                        <input type="text" value={input.height} name="height" onChange={handleChange}/></p>
                        {errors.height && <Error>{errors.height}</Error>}
                    <p><label>Imagen: </label>
                        <input type="text" value={input.sprite} name="sprite" onChange={handleChange}/></p>
                    <p><label>Tipos: </label>
                        <select name="types" selected='All' onChange={handleSelect} id='selectTypes'>
                            {types.map(t => (
                                <>
                                <option selected disabled hidden>Seleccione el tipo</option>
                                <option value={t.name} hidden={t.name === 'All' ? true : false}>{t.name}</option>
                                </>
                            ))}
                        </select></p>
                        {errors.type && <Error>{errors.type}</Error>}
                        {input.type.map(t => 
                            <Type>
                                {input.type.includes(t) && t}<button type='button' onClick={() => handleDelete(t)}>x</button>
                            </Type>
                        )}
                    <button
                        type="submit"
                        disabled={
                            !input.name || !input.hp || !input.attack || !input.defense || !input.type.length ? true : false
                        }>Crear Pokemon!</button>
                    <Link to='home'><button>Volver al Home</button></Link>
                </Carga>
            </form>
        </Body>
    );
}
 
export default PokemonCreate; 
