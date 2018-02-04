// with this import, we can use the user object that we defined in models, inside of our callback
const {Note} = require('../models')

module.exports = {
	async index (req, res) {
			try {
				const notes = await Note.findAll({
					limit: 30
				})
				res.send(notes)
			} catch (err) {
				res.status(403).send({
					error: 'An error has occured trying to load notes.'
				})
			}
	},
	async post (req, res) {
			try {
				const note = await Note.create(req.body)
				res.send(note)
			} catch (err) {
				res.status(403).send({
					error: 'An error has occured trying to create a note.'
				})
			}
	}
}
