import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom';
import {getTypes, postPokemon, getPokemons, postType} from '../actions/index.js'
import Swal from 'sweetalert2'
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
    width: 450px;
    label {
        //background: none repeat scroll 0 0 #F3F3F3;
        display: block;
        float: left;
        font-size: 13px;
        font-weight: bold;
        height: 24px;
        margin: 0 10px 0 0;
        padding: 3px 3px;
        width: 110px;
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
    /* button {
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
    } */
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
const Buttons = styled.div`
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    /* text-align: center; */
    /* margin-left: auto;
    margin-right: auto; */
    /* margin: 0 10px;
    position: static; */
    /* align-content:center; */
    button {
        text-align: center;
        width: 100px;
    }
`

const validateInput = (input) => {
    let errors = {};
    if (!input.name) {
        errors.name = '¡Se requiere nombre!';
    } 
    else if (/^([0-9])*$/.test(input.name)){
        errors.name = '¡Solo caracteres!'
    }
    
    if (!input.hp) {
        errors.hp = '¡Se debe ingresar vida!'
    }
    
    if (!input.weight) {
        errors.weight = '¡Se debe ingresar el peso!'
    }
    else if (!/^[0-9]+([.])?([0-9]+)?$/.test(input.weight)){
        errors.weight = '¡Solo números!'
    }
    else if(input.weight < 0 || input.weight > 100){
        errors.weight = '¡Rango entre 0 y 100 kgs.!'
    }

    if (!input.height) {
        errors.height = '¡Se debe ingresar la altura!'
    }
    else if (!/^[0-9]+([.])?([0-9]+)?$/.test(input.height)){
        errors.height = '¡Solo números!'
    }
    else if(input.height < 0 || input.height > 20){
        errors.height = '¡Rango entre 0 y 20 mts.!'
    }
  
    return errors;
}

const PokemonCreate = () => {
    const dispatch = useDispatch();
    const allPokemons = useSelector(state => state.pokemons);
    const types = useSelector(state => state.types);
    const [show, setShow] = useState(true)
    const [errors, setErrors] = useState({});
    const [inputType, setInputType] = useState({
        name:""
    })
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
        dispatch(getTypes())
    },[dispatch])

    const handleChange = (e) => {
        if (allPokemons.filter(p => p.name === input.name.trim()).length) {
            Swal.fire({
                position: 'center',
                icon: 'info',
                title: '¡Ya existe ese Pokémon!',
                background: 'linear-gradient(to right, #FDC830, #F37335)',
            })
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
        Swal.fire({
            position: 'center',
            icon: 'info',
            title: '¡Ya seleccionó ese tipo!',
            background: 'linear-gradient(to right, #FDC830, #F37335)',
        })
        else if (input.type.length < 2) {
        setInput({
            ...input,
            type: [...input.type, e.target.value]
        })
        setErrors(validateInput({
            ...input,
            [e.target.name]: e.target.value
        }))
        } else {
            Swal.fire({
                position: 'center',
                icon: 'info',
                title: '¡Dos tipos máximo!',
                background: 'linear-gradient(to right, #FDC830, #F37335)',
            })
        }
    }

    const handleDelete = (tipo) => {
        document.getElementById('selectTypes').value = 'Seleccione el tipo'
        setInput({
            ...input,
            type: input.type.filter(t => t !== tipo)
        })
    }

    const handleShow = (e) => {
        e.preventDefault();
        setShow(!show)
    }

    const handleTypeChange = (e) => {
        console.log(e.target.value)
        setInputType({
            name: e.target.value})
    }

    const handleSubmitType = (e) => {
        // e.preventDefault();
        if (types.filter(t => t.name === inputType.name.trim().toLowerCase()).length) {
            Swal.fire({
                position: 'center',
                icon: 'info',
                title: '¡Ya existe ese tipo!',
                background: 'linear-gradient(to right, #FDC830, #F37335)',
            })
            document.getElementById('typeName').focus()
            // setInputType(inputType.typeName="")
            
        } else {
        dispatch(postType(inputType))
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: '!Tipo creado!',
            showConfirmButton:false,
            background: 'linear-gradient(to right, #FDC830, #F37335)',
            timer:1500
        })
        dispatch(getTypes())
        setInputType({
            name:""
        })
        setShow(!show)
    }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.sprite === "") {
            input.sprite = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/601px-Pokebola-pokeball-png-0.png"
        }
        dispatch(postPokemon(input));
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Pokemon creado con exito!',
            showConfirmButton: false,
            background: 'linear-gradient(to right, #FDC830, #F37335)',
            timer: 1500
        })
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
                        <input type="text" value={input.name} name="name" onChange={handleChange} id="inputName" autoFocus/></p>
                        {errors.name && <Error>{errors.name}</Error>}
                    <p><label>Vida: </label>
                        <input type="range" min="0" max="255" step="10" value={input.hp} name="hp" onChange={handleChange}/>{input.hp}</p>
                        {errors.hp && <Error>{errors.hp}</Error>}
                    <p><label>Fuerza: </label>
                        <input type="range" min="0" max="255" step="10" value={input.attack} name="attack" onChange={handleChange}/>{input.attack}</p>
                    <p><label>Defenza: </label>
                        <input type="range" min="0" max="255" step="10" value={input.defense} name="defense" onChange={handleChange}/>{input.defense}</p>
                    <p><label>Velocidad: </label>
                        <input type="range" min="0" max="255" step="10" value={input.speed || 130} name="speed" onChange={handleChange}/>{input.speed}</p>
                    <p><label>Peso: </label>
                        <input type="text" value={input.weight} name="weight" onChange={handleChange}/></p>
                        {errors.weight && <Error>{errors.weight}</Error>}
                    <p><label>Altura: </label>
                        <input type="text" value={input.height} name="height" onChange={handleChange}/></p>
                        {errors.height && <Error>{errors.height}</Error>}
                    <p><label>Imagen: </label>
                        <input type="text" value={input.sprite} name="sprite" onChange={handleChange}/></p>
                    <p><label>Tipos-Mínimo 1: </label>
                        <select name="types" selected='All' onChange={handleSelect} id='selectTypes'>
                            {types.map(t => (
                                <>
                                <option value='Seleccione el tipo' selected disabled hidden>Seleccione el tipo</option>
                                <option value={t.name} hidden={t.name === 'All' ? true : false}>{t.name}</option>
                                </>
                            ))}
                        </select>
                        <button type='button' onClick={handleShow}>Nuevo Tipo!</button>
                        <p><input type='text' value={inputType.name} name='typeName' id='typeName' onChange={handleTypeChange} hidden={show}></input>
                        <button type='button' hidden={show} onClick={handleSubmitType} disabled={inputType.name === ''}>Guardar Tipo</button></p>
                    </p>
                        
                        {input.type.map(t => 
                            <Type>
                            {/*input.type.includes(t) && */}{t}<button type='button' onClick={() => handleDelete(t)}>x</button>
                            </Type>
                        )}
                    <Buttons>    
                        <button
                            type="submit"
                            disabled={
                                !input.name || !input.hp || !input.attack || !input.defense || !input.speed ||!input.type.length ? true : false
                            }>Crear Pokemon!</button>
                        <Link to='home'><button>Volver al Home</button></Link>
                    </Buttons>
                </Carga>
            </form>
        </Body>
    );
}
 
export default PokemonCreate; 
