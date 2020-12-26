const express = require('express')
const dogsPages = express.Router()
const path = require('path')
const CONFIG = require('../config')

const configSSR = require('ssr-render-page')
const renderDogs = configSSR('http://localhost:3000', 'dogs', CONFIG.html)

dogsPages.get('/', async (req, res) => {
    res.send(await renderDogs('/'))
})

dogsPages.get('/:id', async (req, res) => {
    const id = req.params.id
    res.send(await renderDogs('/' + id))
})

dogsPages.get('/new', async (req, res) => {
    res.send(await renderDogs('/new'))
})

// dogsPages.get('/', pagesHandler)
// dogsPages.get('/:page', pagesHandler)

// /** @type {import("express").RequestHandler} */
// async function pagesHandler(req, res, next) {
//     const page = req.params.page
//     switch (page) {
//         case undefined:
//             res.send(await renderDogs('/'))
//             break;
//         case 'new':
//             res.send(await renderDogs('/new'))
//             break;
//         case 'script.js':
//             res.sendFile(CONFIG.script)
//             break;
//         default:
//             break;
//     }
// }

module.exports = dogsPages