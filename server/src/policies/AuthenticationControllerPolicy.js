// joi framework is used for validation
const Joi = require('joi')

module.exports = {
	// register method, express middlware, 
	// req is request that comes in, res is when we send something back, next is what you call to invoke the next thing in the routes path
	register (req, res, next) {
		const schema = {
			// joi will validate such things
			email: Joi.string().email(),
			password: Joi.string().regex(
				// regex determining what is allowed and 8-32 char
				new RegExp('^[a-zA-Z0-9]{8,32}$')
			)
		}
		// we are trying to validate the req.body with the schema
		// this will return an error if there is an error, if there is no error we will go to next()
		const {error, value} = Joi.validate(req.body, schema)
		// if there is an error, we will see which one failed
			if (error) {
				// we check the error and the key of the error and return different error messages depending on the error
				switch (error.details[0].context.key) {
					case 'email':
						res.status(400).send({
							error: 'You must provide a valid email address.'
						})
						break
					case 'password':
						res.status(400).send({
							error: `The password provided failed to match the following rules:
							<br>
							1. It must contain ONLY the following characters: [a-z A-Z 0-9].
							<br>
							2. It must be at between 8-32 characters.`
						})
						break
					default:

				}
			} else {
			 next()
			}
			
	}
}