const { Router } = require('express');
const routePokemon = require('./pokemon');
const routeType = require('./type');

// Importar todos los routers;
const router = Router();
// Configurar los routers
router.use('/pokemons', routePokemon);
router.use('/types', routeType);

// const getApiInfo = async () => {
    
//     // const getPokemons = async (id) => {
//     //     try {
//     //         const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
//     //         return response.data;
                  //return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
//                //.then(response => response.json())
//                //.then(data => data)
//     //     } catch (error) {
//     //         console.log(error);
//     //     }
//     // }

//     const arrayPokemons = []
//     for (let i=1; i <= 40; i++) {
//         const data = await getPokemons(i)
//         arrayPokemons.push(data)
//     }

//     const apiInfo = arrayPokemons.map(poke => {
//         return {
//             id: poke.id,
//             name: poke.name,
//             hp: poke.stats[0].base_stat,
//             attack: poke.stats[1].base_stat,
//             defense: poke.stats[2].base_stat,
//             speed: poke.stats[5].base_stat,
//             height: poke.height,
//             weight: poke.weight,
//             sprites: poke.sprites.front_default,
//             types: poke.types.map(t => t.type.name)
//         }
//     });
//     return apiInfo;
// }

module.exports = router;
