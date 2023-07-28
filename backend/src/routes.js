const { Router } = require('express')
const DevController = require('./controllers/dev.js')
const DevsController = require('./controllers/devs.js')
const SearchController = require('./controllers/search.js')
const { callback, redirectForMobile: getAuthUrlForMobile } = require('./auth')
const routes = Router()

routes.get('/dev', DevController.index)
routes.post('/dev', DevController.store)
routes.put('/dev', DevController.update)
routes.delete('/dev', DevController.delete)

routes.get('/devs', DevsController.index)
routes.get('/search', SearchController.index)

routes.get('/auth/callback', callback)
routes.get('/mobileAuth', getAuthUrlForMobile)
module.exports = routes
