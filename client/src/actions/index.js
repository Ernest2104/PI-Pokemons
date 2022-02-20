import axios from 'axios';

export const getPokemons = () => {
    return async function(dispatch) {
        const json = await axios.get('http://localhost:3001/pokemons');
        return dispatch({
            type: 'GET_POKEMONS',
            payload: json.data
        })
    }
}

export const getTypes = () => {
    return async function(dispatch) {
        const json = await axios.get('http://localhost:3001/types');
        return dispatch({
            type: 'GET_TYPES',
            payload: json.data
        })
    }
}

export const getNamePokemons = (name) => {
    return async function(dispatch) {
        try {
            var json = await axios.get('http://localhost:3001/pokemons?name=' + name);
            return dispatch({
                type: 'GET_NAME_POKEMONS',
                payload: json.data
            })
        }
        catch (error) {
            //console.log(error)
            alert('Pokemon no encontrado!!')
        }
    }
}

export const getDetailPokemon = (id) => {
    return async function(dispatch) {
        try {
            var json = await axios.get('http://localhost:3001/pokemons/' + id)
            return dispatch ({
                type: 'GET_DETAIL_POKEMON',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};




export const postPokemon = (payload) => {
    return async function(dispatch) {
        const response = await axios.post('http://localhost:3001/pokemons', payload);
        console.log(response);
        return response;
    }
}

export const filterPokemonsByType = (payload) => {
    console.log(payload)
    return {
        type: 'FILTER_BY_TYPE',
        payload
    }
}

export const filterCreated = (payload) => {
    console.log(payload)
    return {
        type: 'FILTER_CREATED',
        payload
    }
}

export const order = (payload) => {
    return {
        type: 'ORDER',
        payload
    }
}
