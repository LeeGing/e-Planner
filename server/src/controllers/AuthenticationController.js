// with this import, we can use the user object that we defined in models, inside of our callback
const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

// function to sign a user object using jwt library to give us jwt token
function jwtSignUser (user) {
	const ONE_WEEK = 60 * 60 * 24 * 7
	// give jwt.sign the user, authentication.jwtSecret options, and {more options which allows us to pass in when it expires}
	return jwt.sign(user, config.authentication.jwtSecret, {
		expiresIn: ONE_WEEK
	})
}

module.exports = {
	// controllers are used to declare endpoints
	// here we export whatever routes that need authentication
	// here we only care about the callback function. 
	async register (req, res) {
			try {
				const user = await User.create(req.body)
				// if success
				const userJson = user.toJSON()
				res.send({
					user: userJson,
					// users the jwtSignUser helper function to sign a user and create a token
					token: jwtSignUser(userJson)
				})
				// if fails
			} 	catch (err) {
				res.status(400).send({
					error: 'This email account is already in use.'
				})
			}
	},
	async login (req, res) {
			try {
				// take email and password from the body
				const {email, password} = req.body
				// findOne users in the database that matches the email
				const user = await User.findOne({
					where: {
						email: email
					}
				})
				// if we cannot findOne user that matches, return a 403 status.
				if(!user) {
					return res.status(403).send({
						error: 'The login information was incorrect.'
					})
				}
				// verify password, the password entered has to match the password in the user model
				// this will call the method function in models which will use bcrypt to compare the password to the models pasword
				const isPasswordValid = await user.comparePassword(password)
				console.log(isPasswordValid)
				if (!isPasswordValid) {
					return res.status(403).send({
						error: 'The login information was incorrect.'
					})
				}

				// if success, return a jwt token with the user information
				const userJson = user.toJSON()
				res.send({
					user: userJson,
					// users the jwtSignUser helper function to sign a user and create a token
					token: jwtSignUser(userJson)
				})
				// if fails
			} catch (err) {
				res.status(403).send({
					error: 'This email account is already in use.'
				})
			}
	}
}
