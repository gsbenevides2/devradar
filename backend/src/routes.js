const { Router } = require('express')
const DevController = require('./controllers/dev.js')
const DevsController = require('./controllers/devs.js')
const SearchController = require('./controllers/search.js')
const {callback} = require('./auth')
const routes = Router()

routes.get('/dev', DevController.index)
routes.post('/dev', DevController.store)
routes.put('/dev', DevController.update)
routes.delete('/dev', DevController.delete)

routes.get('/devs', DevsController.index)
routes.get('/search', SearchController.index)

routes.get('/auth/callback',callback)
module.exports = routes
