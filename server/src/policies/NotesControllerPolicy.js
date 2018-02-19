const Joi = require('joi')

module.exports = {
  post (req, res, next) {
    const schema = {
      title: Joi.string(),
      duedate: Joi.string().regex(
        new RegExp('^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{4})*$')
      ),
      description: Joi.string(),
      userId: Joi.number(),
      completed: Joi.string(),
      overdue: Joi.string()
    }

    const {error, value} = Joi.validate(req.body, schema)

    if (error) {
      switch(error.details[0].context.key) {
        case 'title':
          res.status(400).send({
            error: 'An error has occured saving your title, please try again.'
          })
          break
        case 'duedate':
          res.status(400).send({
            error: 'Invalid date format. Please enter the due date as MM/DD/YYYY.'
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid input. Unable to save new task.'
          })
      }
    } else {
      next()
    }
  },
  put (req, res, next) {
    const schema = {
      id: Joi.number(),
      title: Joi.string(),
      duedate: Joi.string().regex(
        new RegExp('^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{4})*$')
      ),
      description: Joi.string(),
      userId: Joi.number(),
      completed: Joi.string(),
      createdAt: Joi.string(),
      updatedAt: Joi.string(),
      overdue: Joi.string()
    }
    
    const {error, value} = Joi.validate(req.body, schema)

    if (error) {
      switch(error.details[0].context.key) {
        case 'title':
          res.status(400).send({
            error: 'An error has occured saving your title, please try again.'
          })
          break
        case 'duedate':
          res.status(400).send({
            error: 'Invalid date format. Please enter the due date as MM/DD/YYYY.'
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid input. Unable to save new task.'
          })
      }
    } else {
      next()
    }
  }
}