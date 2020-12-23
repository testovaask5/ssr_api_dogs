// @ts-check
const { Sequelize } = require('sequelize')
const dogInit = require('./Dog')

const sequelize = new Sequelize('dogs', 'san', 'YOS6bi', {
    host: '109.206.169.221',
    dialect: 'mysql'
});

const Dog = dogInit(sequelize)

module.exports = {
    sequelize,
    Dog
}