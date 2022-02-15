const { Router } = require('express');
const { Type } = require('../db');
const router = Router();
const axios = require('axios');

// GET /types
router.get('/', async (req, res) => {
    const typesApi = await axios.get(`https://pokeapi.co/api/v2/type`);
    const types = await typesApi.data.results.map(t => t.name);
    types.forEach( t => {
        Type.findOrCreate({
            where: { name: t }
        })
    })
    const allTypes = await Type.findAll();
    res.status(200).send(allTypes);
});

module.exports = router;