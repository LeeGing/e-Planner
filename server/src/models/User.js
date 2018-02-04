const Promise = require('bluebird')
// promisfyall will take any typical function with a callback structure and wraps it to allow us to use the promise format, 
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

// this helper function takes a userobject and options
// this function basically takes the user password and hashes and saves again
function hashPassword (user, options) {
  // to hash we need a salt factor
  const SALT_FACTOR = 8

  // we need to check if the password has changed, if not then we can just return this function
  if (!user.changed('password')) {
    return
  }
  // if it has changed, then we have to call bcrypt, generate using salt factor, then take that salt and bcrypt using the user's password
  // we take the plain text password, salt it giving us a hash, then we update the user's password value with that hash
  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash => {
      user.setDataValue('password', hash)
    })
}

module.exports = (sequelize, DataTypes) => {
	// we need the the const User to allow us to reference the user object
	const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  }, {
    // before we store the user, we want to hash the password,
    // these call back functions will hash the password
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword,
      beforeSave: hashPassword,
    }
  })
  // on the prototype, we want to attach a method called comparePassword to compare so the user model does the comparing instead of the controller
  User.prototype.comparePassword = function (password) {
  	// return the bcrypt hash to compare the candidate password to the models password
  	// compare the password sent in to the model's password
  	return bcrypt.compareAsync(password, this.password)
  }

  return User
}