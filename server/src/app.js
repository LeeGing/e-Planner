console.log ('La La La')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
// we are assuming that there is a models folter which has a index.js file, 
// which returns an object with a sequelize attribute
const {sequelize} = require('./models')
const config = require('./config/config')

const app = express()
// morgan gives us logs in the terminal 
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./routes')(app)

sequelize.sync()
	.then(() => {
		app.listen(config.port)
    console.log(`Server started on port ${config.port}`)
	})
app.listen(process.env.PORT)
// app.listen(process.env.PORT || 8081)
