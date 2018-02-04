const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const config = require('../config/config')
const db = {}

const sequelize = new Sequelize(
	config.db.database,
	config.db.user,
	config.db.password,
	config.db.options,
)
// a helper function that allows us to easily add more models later
fs
	.readdirSync(__dirname)
	.filter((file) =>
		// reads all the files that do not === index.js and loads them into sequelize
		file !== 'index.js'
	)
	.forEach((file) => {
		const model = sequelize.import(path.join(__dirname, file))
		db[model.name] = model
	})

db.sequelize = sequelize 
db.Sequelize = Sequelize

module.exports = db