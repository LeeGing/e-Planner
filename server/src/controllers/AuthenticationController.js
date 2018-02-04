// with this import, we can use the user object that we defined in models, inside of our callback
const {User} = require('../models')

module.exports = {
	// controllers are used to declare endpoints
	// here we export whatever routes that need authentication
	// here we only care about the callback function. 
	async register (req, res) {
			try {
				const user = await User.create(req.body)
				// if success
				res.send(user.toJSON())
				// if fails
			} catch (err) {
				res.status(400).send({
					error: 'This email account is already in use.'
				})
			}
	}
}
