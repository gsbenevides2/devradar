const simpleOauth2 = require("simple-oauth2")
const webSocket = require('./websocket')
require('dotenv').config()
const credentials = {
	client: {
		id: process.env.GITHUB_CLIENT_ID,
		secret: process.env.GITHUB_CLIENT_SECRET
	},
	auth: {
		tokenHost: 'https://github.com',
		tokenPath: '/login/oauth/access_token',
		authorizePath: '/login/oauth/authorize'
	}
}
const oauth2 = simpleOauth2.create(credentials)

function getAuthUrl(id) {
	const callbackUrl = `${process.env.GITHUB_CALLBACK_URL}?id=${id}`
	const authorizationUri = oauth2.authorizationCode.authorizeURL({
		redirect_uri: callbackUrl,
		scope: 'user',
		state: '3(#0/!~',
	});
	return authorizationUri
}

module.exports = {
	redirectForMobile(request, response) {
		const id = request.query.id
		response.redirect(getAuthUrl(id))
	},
	getAuthUrl: getAuthUrl,
	async callback(request, response) {
		const { code, id } = request.query
		const options = { code }
		oauth2.authorizationCode.getToken(options)
			.then(token => {
				webSocket.sendMessage(
					[{ id }],
					"receiveToken",
					token["access_token"]
				)
				response.send(`<!DOCTYPE html><html lang="pt"><head> <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"> <meta charset="UTF-8"> <title></title> <script>setTimeout(window.close,1000)</script></head><body> Por favor <a href="#" onclick="window.close()">Feche está janela.</a></body></html>`)
			})
	}
}
