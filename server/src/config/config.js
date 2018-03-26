const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {
	port: 8000,
	// sequelizer configuration
	db: {
		database: process.env.DB_NAME || 'eplanner',
		user: process.env.DB_USER || 'eplanner',
		password: process.env.DB_PASS || 'eplanner',
		options: {
			dialect: process.env.DIALECT || 'sqlite',
			host: process.env.HOST || 'localhost',
			storage: './eplanner.sqlite'
		}
	},
	authentication: {
		// this signs the jwt token by passing it a secret string which one the server knows, 
		// used to determine if the jwt token is valid or not based on the secret
		jwtSecret: process.env.JWT_SECRET || 'secret'
	}
}
 