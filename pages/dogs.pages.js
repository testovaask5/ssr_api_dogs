const express = require('express')
const dogsPages = express.Router()
const path = require('path')
const CONFIG = require('../config')

const renderPage = require('./renderPage')
const renderDogs = renderPage('http://localhost:3000', 'dogs')

dogsPages.get('/', pagesHandler)
dogsPages.get('/:page', pagesHandler)

/** @type {import("express").RequestHandler} */
async function pagesHandler(req, res, next) {
    const page = req.params.page
    switch (page) {
        case undefined:
            res.send(await renderDogs('/'))
            break;
        case 'new':
            res.send(await renderDogs('/new'))
            break;
        case 'script.js':
            res.sendFile(CONFIG.script)
            break;
        default:
            break;
    }
}

module.exports = dogsPages