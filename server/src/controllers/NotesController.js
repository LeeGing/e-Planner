// with this import, we can use the user object that we defined in models, inside of our callback
const {Note} = require('../models')

module.exports = {
	async index (req, res) {
			try {
				const notes = await Note.findAll()
				res.send(notes)
			} catch (err) {
				res.status(403).send({
					error: 'An error has occured trying to load notes.'
				})
			}
	},
	async show (req, res) {
			try {
				const note = await Note.findById(req.params.noteId)
					res.send(note)
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
	},
	async put (req, res) {
			try {
				// console.log("we at put")
				// call update on req.body, the second param is to declare where we want to updated,
				// we are only updating the note that matches the note id
				const note = await Note.update(req.body, {
					where: {
						id: req.params.noteId
					}
				})
				res.send(req.body)
			} catch (err) {
				res.status(403).send({
					error: 'An error has occured trying to update a note.'
				})
			}
	},
	async delete (req, res) {
			try {
				// THIS WORKS BUT THERE IS SOME KIND OF BUG. FIGURE OUT WHAT req.params says. it returns object.
				const {noteId} = req.params
				const note = await Note.findById(noteId)
				await note.destroy()
				res.send(note)
			} catch (err) {
				res.status(403).send({
					error: 'An error has occured trying to delete a note.'
				})
			}
	}
}
