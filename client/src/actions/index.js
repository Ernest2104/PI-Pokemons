import axios from 'axios';
export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_TYPES = 'GET_TYPES';
export const GET_NAME_POKEMONS = 'GET_NAME_POKEMONS';
export const GET_DETAIL_POKEMON = 'GET_DETAIL_POKEMON';
export const CLEAN_DETAIL_POKEMON = 'CLEAN_DETAIL_POKEMON';
export const FILTER_BY_TYPE = 'FILTER_BY_TYPE';
export const FILTER_CREATED = 'FILTER_CREATED';
export const ORDER = 'ORDER';
export const CLEAN_POKEMONS = 'CLEAN_POKEMONS';
export const CLEAN_TYPES_POKEMON = 'CLEAN_TYPES_POKEMON';

export const getPokemons = () => {
    return async (dispatch) => {
        //const pokemons = await axios.get('http://localhost:3001/pokemons');
        const pokemons = await axios.get('/pokemons/');
        return dispatch({
            type: 'GET_POKEMONS',
            payload: pokemons.data
        })
    }
}

export const cleanPokemons = () => {
    return {
        type: 'CLEAN_POKEMONS'
    }
}

export const getTypes = () => {
    return async (dispatch) => {
        //const types = await axios.get('http://localhost:3001/types');
        const types = await axios.get('/types/');
        return dispatch({
            type: 'GET_TYPES',
            payload: types.data
        })
    }
}

export const cleanTypesPokemon = () => {
    return {
        type: 'CLEAN_TYPES_POKEMON'
    }
}

export const getNamePokemons = (name) => {
    return async (dispatch) => {
        try {
            //const pokemon = await axios.get('http://localhost:3001/pokemons?name=' + name);
            const pokemon = await axios.get('/pokemons?name=' + name);
            return dispatch({
                type: 'GET_NAME_POKEMONS',
                payload: pokemon.data
            })
        }
        catch (error) {
            alert('Pokémon no encontrado!!!')
        }
    }
}

export const getDetailPokemon = (id) => {
    return async (dispatch) => {
        try {
            //const pokemon = await axios.get('http://localhost:3001/pokemons/' + id)
            const pokemon = await axios.get('/pokemons/' + id)
            return dispatch ({
                type: 'GET_DETAIL_POKEMON',
                payload: pokemon.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};

export const cleanDetailPokemon = () => {
    return {
        type: 'CLEAN_DETAIL_POKEMON'
    }
}

export const postPokemon = (payload) => {
    return async () => {
        //const response = await axios.post('http://localhost:3001/pokemons', payload);
        const response = await axios.post('/pokemons', payload);
        return response;
    }
}

export const filterPokemonsByType = (payload) => {
    return {
        type: 'FILTER_BY_TYPE',
        payload
    }
}

export const filterCreated = (payload) => {
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

