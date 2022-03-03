import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { getNamePokemons } from "../actions";
import styled from "styled-components";

const Search = styled.input`
    border: 0;
    margin: 20px 5px;
    padding: 0.5rem calc(var(--searchButtonWidth) + 0.5rem) 0.5rem 0.5rem;
    border-radius: 8px;
    width: 15%;
    background: #ddd;
    top:150px;
    font-size: 18px;
    :focus {
        outline: 0;
        background: white;
    }
`
const Button = styled.button`
        width: 5%;
        padding: 5px;
        background: rgb(14, 81, 204);
        color: white;
        font-size: 16px;
        border: 1px solid grey;
        border-left: none;
        border-radius: 10px;
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
    dispatch(getNamePokemons(name));
    setName('');
}

    return (  
        <div>
            <Search type='search' placeholder="ingrese nombre exacto..." onChange={handleInputChange} value={name}/>
            <Button type='submit' onClick={handleSubmit}>Buscar</Button>
        </div>
    )
}
 
export default SearchBar;