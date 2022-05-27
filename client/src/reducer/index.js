import {
        GET_POKEMONS, ORDER, FILTER_BY_TYPE, CLEAN_DETAIL_POKEMON, FILTER_CREATED, 
        GET_DETAIL_POKEMON, GET_NAME_POKEMONS, GET_TYPES, CLEAN_POKEMONS, 
        CLEAN_TYPES_POKEMON, DELETE_POKEMON, UPDATE_POKEMON
       } from '../actions/index'

const initialState = {
    pokemons: [],
    allPokemons: [],
    types: [],
    detail: [],
    message: ''
}

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }
        
        case CLEAN_POKEMONS:
            return {
                ...state,
                pokemons:[]
            }

        case GET_TYPES:
            return {
                ...state,
                types: action.payload,
            }
        
        case CLEAN_TYPES_POKEMON:
            return {
                ...state,
                types:[]
            } 
        
        case GET_NAME_POKEMONS:
            return {
                ...state,
                pokemons: action.payload
            }
        
        case DELETE_POKEMON:
            return {
                ...state
            }

        case UPDATE_POKEMON:
            return {
                ...state
            }
        
        case 'POST_TYPE':
            return {
                ...state
            }

        case GET_DETAIL_POKEMON:
            return {
                ...state,
                detail: action.payload
            }
        
        case CLEAN_DETAIL_POKEMON:
            return {
                ...state,
                detail:[]
            }

        case 'POST_POKEMON':
            return {
                ...state
            }

        case FILTER_BY_TYPE:
            const allPokemons = state.allPokemons;
            const typeFiltered = action.payload === 'All' ? state.allPokemons : allPokemons.filter(p => typeof p.types[0] !== 'object' ? p.types.includes(action.payload) : p.types.some(t => t.name.includes(action.payload)));
            const returnMessageType = () => {
                document.getElementById('selectTipos').value = 'All';
                alert('No existes pokemomes de ese tipo!!');
            }
            return {
                ...state,
                message: typeFiltered.length === 0 && returnMessageType(),
                pokemons: typeFiltered.length > 0 ? typeFiltered : state.allPokemons,
            }

        case FILTER_CREATED:
            const allPokemons2 = state.allPokemons;
            let createdFiltered = [];
            if (action.payload === 'all') {
                createdFiltered = state.allPokemons
            } else if (action.payload === 'created') {
                createdFiltered = allPokemons2.filter(p => p.createInDb)
            } else createdFiltered = allPokemons2.filter(p => !p.createInDb)
            
            const returnMessageCreated = () => {
                document.getElementById('selectCreados').value = 'all';
                alert('No existes pokemomes en la base de datos!!!');
            }

            return {
                ...state,
                message: createdFiltered.length === 0 && returnMessageCreated(),
                pokemons: createdFiltered.length > 0 ? createdFiltered : state.allPokemons
            }

        case ORDER:
            let sortedPokemons;
            if (action.payload === 'asc_name') {
                sortedPokemons = state.pokemons.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return -1;
                    }
                    return 0;
                })
            } 
            if (action.payload === 'desc_name') {
                sortedPokemons = state.pokemons.sort(function(a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                    }
                    if (b.name.toLowerCase > a.name.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                })
            }
            if (action.payload === 'asc_attack') {
                sortedPokemons = state.pokemons.sort(function (a, b) {
                    if (a.attack > b.attack) {
                        return 1;
                    }
                    if (b.attack > a.attack) {
                        return -1;
                    }
                    return 0;
                })
            } 
            if (action.payload === 'desc_attack') {
                sortedPokemons = state.pokemons.sort(function(a, b) {
                    if (a.attack > b.attack) {
                        return -1;
                    }
                    if (b.attack > a.attack) {
                        return 1;
                    }
                    return 0;
                })
            }
            return {
                ...state,
                pokemons: sortedPokemons
            }

        default:
            return state;
    }
}

export default rootReducer;