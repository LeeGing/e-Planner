const AuthenticationController = require ('./controllers/AuthenticationController')

const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

module.exports = (app) => {
	// get request to a /status end point
	// when we hit this endpoint, we will then go to AuthenticationControllerPolicy.register, it will hit next() and it will go to the next like here
	// bringing us to AuthenticationController.register.
	app.post('/register', 
		AuthenticationControllerPolicy.register, 
		AuthenticationController.register)
}

// Line 3 replaced this by simplyfing it and using the AuthenticationController to declare endpoints
// module.exports = (app) => {
// 	// get request to a /status end point
// 	app.post('/register', (req, res) => {
// 	  	// what to do that this end point
// 	  	res.send({
// 	  		message: `Hello ${req.body.email}! User has been registered.`,
// 	  	})
//   })
// }