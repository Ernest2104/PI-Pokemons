import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { getNamePokemons } from "../actions";

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
            <input type='search' placeholder="nombre a buscar..." onChange={handleInputChange} value={name}/>
            <button type='submit' onClick={handleSubmit}>Buscar</button>
        </div>
    )
}
 
export default SearchBar;