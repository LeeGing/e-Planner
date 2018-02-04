const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {
	port: 8000,
	// sequelizer configuration
	db: {

		database: process.env.DB_NAME || 'tabtracker',
		user: process.env.DB_USER || 'tabtracker',
		password: process.env.DB_PASS || 'tabtracker',
		options: {
			dialect: process.env.DIALECT || 'sqlite',
			host: process.env.HOST || 'localhost',
			storage: './tabtracker.sqlite'
		}
	}
}
 