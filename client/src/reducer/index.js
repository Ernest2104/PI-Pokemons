const initialState = {
    pokemons: [],
    allPokemons: [],
    types: [],
    detail: []
}

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }

        case 'GET_TYPES':
            return {
                ...state,
                types: action.payload
            }
        
        case 'GET_NAME_POKEMONS':
            return {
                ...state,
                pokemons: action.payload
            }

        case 'GET_DETAIL_POKEMON':
            return {
                ...state,
                detail: action.payload
            }
        
        case 'POST_POKEMON':
            return {
                ...state
            }

        case 'FILTER_BY_TYPE':
            const allPokemons = state.allPokemons;
            console.log(allPokemons)
            const typefiltered = allPokemons.filter(p => p.types && p.types.includes(action.payload));
            //p => typeof p.types[0] !== 'object' ? p => p.types.includes(action.payload) : p => p.types.map(t => t.name.includes(action.payload))
            return {
                ...state,
                pokemons: typefiltered
            }

        case 'FILTER_CREATED':
            const allPokemons2 = state.allPokemons;
            const createdfiltered = action.payload === 'created' ?  allPokemons2.filter(p => p.createInDb) : allPokemons2.filter(p => !p.createInDb)
            return {
                ...state,
                pokemons: action.payload === 'all' ? state.allPokemons : createdfiltered
            }

        case 'ORDER':
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