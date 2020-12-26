const path = require('path')

const CONFIG = {
    html: path.join(__dirname, './client/dist/index.html'),
    script: path.join(__dirname, './client/dist/script.js'),
    css: path.join(__dirname, './client/dist/style.css')
}

module.exports = CONFIG