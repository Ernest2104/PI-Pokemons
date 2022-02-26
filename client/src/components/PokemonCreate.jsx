import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom';
import {getTypes, postPokemon} from '../actions/index.js'

const validateInput = (input) => {
    let errors = {};
    if (!input.name) {
        errors.name = 'Se requiere un nombre';
    } 
    else if (/^([0-9])*$/.test(input.name)){
        errors.name = 'Solo caracteres!!'
    }

    if (!input.hp) {
        errors.hp = 'Se requiere puntos de vida'
    }

    if (!/^[0-9]+([.])?([0-9]+)?$/.test(input.weight)){
        errors.weight = 'Solo números!!'
    }
    else if(input.weight < 0 || input.weight > 100)
        errors.weight = 'Valor debe estar entre 0 y 100 kgs.!!'
    
    if (!/^[0-9]+([.])?([0-9]+)?$/.test(input.weight)){
        errors.weight = 'Solo números!!'
    }
    else if(input.height < 0 || input.weight > 20)
        errors.weight = 'Valor debe estar entre 0 y 20 mts.!!'

    return errors;
}

const PokemonCreate = () => {
    const dispatch = useDispatch()
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
        dispatch(getTypes())
    },[])

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validateInput({
            ...input,
            [e.target.name]: e.target.value
        }))
        console.log(input)
    }

    const handleSelect = (e) => {
        setInput({
            ...input,
            type: [...input.type, e.target.value ]
        })
    }

    const handleDelete = (type) => {
        setInput({
            ...input,
            type: input.type.filter(t => t !== type)
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input);
        dispatch(postPokemon(input));
        alert('Pokemon creado!');
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
        <div>
            <Link to='home'><button>Volver</button></Link>
            <h1>Crea tu Pokemon!</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre: </label>
                    <input type="text" value={input.name} name="name" onChange={handleChange}/><br/><br/>
                    {errors.name && <p>{errors.name}</p>}
                    <label>Puntos de vida (hp): </label>
                    <input type="range" min="0" max="255" step="10" value={input.hp} name="hp" onChange={handleChange}/>{input.hp}<br/><br/>
                    {errors.hp && <p>{errors.hp}</p>}
                    <label>Fuerza: </label>
                    <input type="range" min="0" max="255" step="10" value={input.attack} name="attack" onChange={handleChange}/>{input.attack}<br/><br/>
                    <label>Defenza: </label>
                    <input type="range" min="0" max="255" step="10" value={input.defense} name="defense" onChange={handleChange}/>{input.defense}<br/><br/>
                    <label>Velocidad: </label>
                    <input type="range" min="0" max="255" step="10" value={input.speed} name="speed" onChange={handleChange}/>{input.speed}<br/><br/>
                    <label>Peso: </label>
                    <input type="text" value={input.weight} name="weight" onChange={handleChange}/><br/><br/>
                    {errors.weight && <p>{errors.weight}</p>}
                    <label>Altura: </label>
                    <input type="text" value={input.height} name="height" onChange={handleChange}/><br/><br/>
                    {errors.height && <p>{errors.height}</p>}
                    <label>Imagen: </label>
                    <input type="text" value={input.sprite} name="sprite" onChange={handleChange}/><br/><br/>
                    <label>Tipos: </label>
                    <select onChange={handleSelect}>
                        {types.map(t => (
                            <option value={t.name}>{t.name}</option>
                        ))}
                    </select><br/><br/>
                    {/*<ul><li>{input.type.map(t => t + ', ')}</li></ul>*/}
                    <button 
                        type="submit"
                        disabled={
                            !input.name || !input.hp || !input.attack || !input.defense ? true : false
                        }>
                        Crear pokemon
                    </button>
                </div>
            </form>
            {input.type.map(t => 
                <div>
                    <p>{t}</p>
                    <button onClick={() => handleDelete(t)}>x</button>
                </div>
                )
            }
        </div>
    );
}
 
export default PokemonCreate; 
