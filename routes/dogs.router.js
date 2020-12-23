const express = require('express')
const dogsRouter = express.Router()
const { Dog } = require('../models')

// API http
// routing
// Restful API (CRUD)
// C - create R - read U - update D - delete
// C - POST (HTTP)
// R - GET (HTTP)
// U - PATCH/PUT (HTTP)
// D - DELETE (HTTP)

dogsRouter.get('/', async (req, res) => {
    const dogs = await Dog.findAll()
    res.send(dogs)
})

dogsRouter.get('/:dogId', async (req, res) => {
    const dogId = req.params.dogId
    const dog = await Dog.findOne({
        where: {
            id: dogId
        }
    })
    res.send(dog)
})

dogsRouter.post('/', async (req, res) => {
    const { name, breed, age } = req.body
    const dog = await Dog.create({ name, breed, age })
    res.send(dog)
})

dogsRouter.patch('/:dogId', async (req, res) => {
    const dogId = req.params.dogId
    const updatedDog = req.body
    await Dog.update(updatedDog, {
        where: {
            id: dogId
        }
    })
    res.send({
        message: "Successful update"
    })
})

dogsRouter.delete('/:dogId', async (req, res) => {
    const dogId = +req.params.dogId
    await Dog.destroy({
        where: {
            id: dogId
        }
    })
    res.send({
        message: "Successful destroy"
    })
})

module.exports = dogsRouter