const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

module.exports = (sequelize, DataTypes) => {
	const Note = sequelize.define('Note', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    duedate: DataTypes.STRING,
    userId: DataTypes.INTEGER
  })
  return Note
}