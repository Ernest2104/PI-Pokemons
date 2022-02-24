const { Router } = require('express');
const { Pokemon, Type } = require('../db');
const router = Router();
const axios = require('axios');

// pokemones de la API
const getApiInfo = async () => {
    const arrayPokemons = []   
    for (let id = 1; id <= 40; id++) {    
        arrayPokemons.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`));// arrayPokemons -> array de promesas         
    }

    const apiInfo = await Promise.all(arrayPokemons)// Promise -> retorna un promesa cuando todas las promesas del argumento concluyeron
    .then(pokemon => {
        const apiPokes = pokemon.map(poke => {
            return {
                id: poke.data.id,
                name: poke.data.name.charAt(0).toUpperCase() + poke.data.name.slice(1),
                hp: poke.data.stats[0].base_stat,
                attack: poke.data.stats[1].base_stat,
                defense: poke.data.stats[2].base_stat,
                speed: poke.data.stats[5].base_stat,
                weight: poke.data.weight,
                height: poke.data.height,
                sprite: poke.data.sprites.other.dream_world.front_default,
                types: poke.data.types.map(t => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1))
            }
        })
        return apiPokes;
    })            
    return apiInfo;
};
// pokemones de la base de datos
const getDbInfo = async () => {
    return (
        await Pokemon.findAll({
        include:{
            model: Type,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
        })
    )
    // .map(p => {
    //     const data = p.toJSON();
    //     console.log(data)
    //     return {
    //       ...data,
    //       types: data.types.map(t => t.name),
    //     };
    //   });
};


// pokemones de la base de datos + pokemones de la API
const getAllPokemons = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = [...apiInfo, ...dbInfo];
    return infoTotal;
};

// GET /pokemons + GET /pokemons?name="..." -> async/await
// router.get('/', async (req, res) => {
//     const name = req.query.name
//     try {
//         const pokemonsTotal = await getAllPokemons();
//         if (name) {
//             const pokemonName = pokemonsTotal.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
//             pokemonName.length ? res.status(200).send(pokemonName) : res.status(404).send('Pokemon no encontrado!');
//         } else {
//             res.status(200).send(pokemonsTotal);
//         }
//     } catch(error) {
//         res.status(500).send(error);
//     }
// });

// GET /pokemons + GET /pokemons?name="..." -> promise
router.get('/', (req, res) => {
    const name = req.query.name
    getAllPokemons()
    .then(pokemonsTotal => {
        if (name) {
            const pokemonName = pokemonsTotal.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
            pokemonName.length ? res.status(200).send(pokemonName) : res.status(404).send('Pokemon no encontrado!');
        } else {
            res.status(200).send(pokemonsTotal);
        }
    })
});

// POST /pokemons -> async/await 
// router.post('/', async (req, res) => {
//     const { name, hp, attack, defense, speed, weight, height, sprite, type, createInDb } = req.body;
//     const pokemonCreated = await Pokemon.create ({
//         name,
//         hp,
//         attack,
//         defense,
//         speed,
//         weight,
//         height,
//         sprite,
//         createInDb
//     })
//     const typesDb = await Type.findAll({
//         where: { name: type }
//     });
//     pokemonCreated.addType(typesDb);
//     res.status(200).send('Pokemon creado con éxito!')
// });

// POST /pokemons -> promise
router.post('/', (req, res) => {
    const { name, hp, attack, defense, speed, weight, height, sprite, type, createInDb } = req.body;
    Pokemon.create ({
        name,
        hp,
        attack,
        defense,
        speed,
        weight,
        height,
        sprite,
        createInDb
    })
    .then(pokemon => {
    Type.findAll({
            where: { name : type }
        })
        .then(typesDb => pokemon.addType(typesDb))
        .then(() => res.status(200).send('Pokemon creado con éxito!'))
    })
});

// GET /pokemons/{idPokemon} -> async/await
// router.get('/:id', async (req, res) => {
//     const { id } = req.params;
//     const pokemonTotal = await getAllPokemons();
//     if (id) {
//         const pokemonId = pokemonTotal.filter(p => p.id == id);
//         pokemonId.length ? res.status(200).json(pokemonId) : res.status(404).send('Pokemon no encontrado!');
//     }
// });

// GET /pokemons/{idPokemon} -> promise
router.get('/:id', (req, res) => {
    const { id } = req.params;
    getAllPokemons()
    .then((pokemon) => {
        if (id) {
            const pokemonId = pokemon.filter(p => p.id == id);
            pokemonId.length ? res.status(200).json(pokemonId) : res.status(404).send('Pokemon no encontrado!');
        }
    })
});

module.exports = router;