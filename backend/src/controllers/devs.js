const Dev = require('../models/dev.js')

module.exports = {
 async index(request, response) {
	const devs = await Dev.find()
	return response.json(devs)
 }
 }
