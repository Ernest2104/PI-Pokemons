const { Router } = require('express');
const { Type } = require('../db');
const router = Router();
const axios = require('axios');

// GET /types -> async/await
router.get('/', async (req, res) => {
    await Type.findOrCreate({where: {name: 'All'}})
    const typesApi = await axios.get(`https://pokeapi.co/api/v2/type`);
    const types = await typesApi.data.results.map(t => t.name.charAt(0).toUpperCase() + t.name.slice(1));
    types.forEach( t => {
        Type.findOrCreate({
            where: { name: t }
        })
    })
    const allTypes = await Type.findAll();
    res.status(200).send(allTypes);
});

// GET /types -> promises
// router.get('/', (req, res) => {
//     Type.findOrCreate({where: {name: 'All'}})
//     axios.get(`https://pokeapi.co/api/v2/type`)
//     .then(typeApi => typeApi.data.results.map(t => t.name.charAt(0).toUpperCase() + t.name.slice(1)))
//     .then(types => types.forEach(t => {
//         Type.findOrCreate({
//             where: {name: t}
//         })
//     }))
//     Type.findAll()
//     .then((alltypes) => res.status(200).send(alltypes))
// })

module.exports = router;