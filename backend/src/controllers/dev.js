const axios = require('axios')
const Dev = require('../models/dev.js')
const parseStringAsArray = require("../utils/parseStringAsArray")
const { findConnections, sendMessage } = require("../websocket")

module.exports = {
	async index(request, response) {
		const { accessToken } = request.query
		if (!accessToken) {
			return response.status(401).json({
				message: 'Não autorizado.',
				code: 'not-authorized'
			})
		}
		axios.get('https://api.github.com/user', {
			headers: {
				'Authorization': `token ${accessToken}`
			}
		})
			.then(async apiresponse => {
				const { login } = apiresponse.data
				const dev = await Dev.findOne({ github_username: login })
				if (!dev) {
					response.status(404).json({
						message: 'Usuário não encontrado'
					})
				}
				else {
					response.json(dev)
				}

			})
			.catch(() => { })
	},
	async store(request, response) {
		const {
			accessToken,
			techs,
			longitude,
			latitude } = request.body
		axios.get(`https://api.github.com/user`, {
			headers: {
				'Authorization': `token ${accessToken}`
			}
		})
			.then(async githubResponse => {
				const {
					name = login,
					avatar_url,
					bio
				} = githubResponse.data
				const github_username = githubResponse.data.login
				let dev = await Dev.findOne({ github_username })
				if (!dev) {
					const techsArray = parseStringAsArray(techs)

					dev = await Dev.create({
						github_username,
						name,
						avatar_url,
						bio,
						techs: techsArray,
						location: {
							type: 'Point',
							coordinates: [longitude, latitude]
						}
					})
					const sendSocketMessageTo = findConnections(
						{ latitude, longitude },
						techsArray)
					sendMessage(sendSocketMessageTo, "new-dev", dev)
					response.json(dev)
				}
				else {
					response.status(400).json({
						message: 'Usuário já existe.',
						code: 'user-already-exists'
					})
				}
			})
			.catch(error => {
				console.log(error)
				if (error.response.status === 404)
					response.status(400).json({
						message: 'Usuário não existe no GitHub.',
						code: 'user-not-found-in-github'
					})
				else {
					response.status(400).json({
						message: 'Erro desconhecido.',
						code: 'unknown-error'
					})
				}

			})
	},
	async update(request, response) {
		const { github_username, accessToken, techs, longitude, latitude } = request.body
		let dev = await Dev.findOne({ github_username })
		if (dev) {
			const idOfDev = dev._id
			axios.get(`https://api.github.com/user`, {
				headers: {
					'Authorization': `token ${accessToken}`
				}
			})
				.then(async githubResponse => {
					const { name = login, avatar_url, bio } = githubResponse.data
					const techsArray = parseStringAsArray(techs)

					dev = await Dev.findOneAndUpdate({
						_id: idOfDev
					}, {
						github_username,
						name,
						avatar_url: `${avatar_url}&${Date.now()}`,
						bio,
						techs: techsArray,
						location: {
							type: 'Point',
							coordinates: [longitude, latitude]
						}
					}, { new: true })
					response.json(dev)
				})
				.catch(error => {
					console.log(error)
					if (error.response.status === 404)
						response.status(400).json({
							message: 'Usuário não existe no GitHub.',
							code: 'user-not-found-in-github'
						})

				})
		}
		else {
			response
				.status(404)
				.json({
					message: "Usuário náo encontrado na base de dados.",
					code: "user-not-found"
				})
		}
	},
	async delete(request, response) {
		const { github_username, accessToken } = request.body
		let dev = await Dev.findOne({ github_username })
		if (dev) {
			const idOfDev = dev._id
			axios.get(`https://api.github.com/user`, {
				headers: {
					'Authorization': `token ${accessToken}`
				}
			})
				.then(async githubResponse => {
					dev = await Dev.findOneAndRemove({
						_id: idOfDev
					})
					response.send("OK")
				})
				.catch(error => {
					console.log(error)
					if (error.response.status === 404)
						response.status(400).json({
							message: 'Usuário não existe no GitHub.',
							code: 'user-not-found-in-github'
						})

				})
		}
		else {
			response
				.status(404)
				.json({
					message: "Usuário náo encontrado na base de dados.",
					code: "user-not-found"
				})
		}
	}

}
