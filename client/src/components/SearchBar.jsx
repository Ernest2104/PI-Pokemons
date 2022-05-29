import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { getNamePokemons } from "../actions";
import styled from "styled-components";

const Search = styled.input`
    border: 0;
    margin: 1rem 0.5rem;
    padding: 0.5rem calc(var(--searchButtonWidth) + 0.5rem) 0.5rem 0.5rem;
    border-radius: 0.5rem;
    width: 15rem;
    height: 1.9rem;
    min-height: 0.7rem;
    background: #ddd;
    top:15%;
    font-size: calc(0.55rem + 0.55vw);
    :focus {
        outline: 0;
        background: white;
    }
`
const Button = styled.button`
        width: 6rem;
        height: 1.9rem;
        min-height: 0.7rem;
        padding: 0.1rem;
        background: rgb(14, 81, 204);
        color: white;
        font-size: calc(0.55rem + 0.55vw);
        border: 1px solid grey;
        border-left: none;
        border-radius: 0.6rem;
        cursor: pointer;
        :hover {
            background: #1b11a5;
        }
    
`
const SearchBar = () => {
const dispatch = useDispatch();
const [name, setName] = useState('');

const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value)
}

const handleSubmit = (e) => {
    e.preventDefault();
    if (name !== ''){ 
    dispatch(getNamePokemons(name));
    setName('');
    } else alert('debe ingresar un nombre!!')
}

    return (  
        <div>
            <Search type='search' placeholder="ingrese nombre exacto..." onChange={handleInputChange} value={name}/>
            <Button type='submit' onClick={handleSubmit}>Buscar</Button>
        </div>
    )
}
 
export default SearchBar;