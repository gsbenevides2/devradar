const Dev = require('../models/dev.js')
const parseStringAsArray = require("../utils/parseStringAsArray")
module.exports = {
    async index(request, response) {
        const { longitude, latitude, techs } = request.query
        console.log(request.query)
        const techsArray = parseStringAsArray(techs)
        console.log(techsArray)
        const devs = await Dev.find({
            techs: {
                $in: techsArray
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000
                }
            }
        })

        response.json(devs)
    }
}