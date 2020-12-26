const fs = require('fs')
const express = require('express')
const app = express()
const dogsRouter = require('./routes/dogs.router')
const { sequelize } = require('./models')
const dogsPages = require('./pages/dogs.pages')
const CONFIG = require('./config')
// const dogsPages = require('./pages/dogs.pages')

async function sync() {
    await sequelize.authenticate()
    console.log('Successful connection')
    await sequelize.sync()
    console.log('Successful sync')
}
sync()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('App root')
})

app.use('/api/dog', dogsRouter)

app.use('/dogs', dogsPages)

app.get('*/script.js', (req, res) => {
    res.sendFile(CONFIG.script)
})

// app.use(express.static('./client/dist'))

app.listen(3000, () => {
    console.log('Server started at http://localhost:3000')
})