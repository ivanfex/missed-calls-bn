const router = require('express').Router()
const axios = require('axios')
const notifier = require('mail-notifier')
const { messageButtons } = require('./constants')

const imap = {
	user: "ninja.listener@gmail.com",
	password: "Iml1st3n1ng",
	host: "imap.gmail.com",
	port: 993, // imap port
	tls: true,// use secure connection
	tlsOptions: { rejectUnauthorized: false }
};

function sendHook(message){
	axios.post('https://hooks.slack.com/services/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', {
		// text: message,
		attachments: [
			{
				text: message
			},
			messageButtons
		]
	})
	.then(() => console.log('action received'))
	.catch(console.error)
}

notifier(imap)
  .on('mail', mail => sendHook(mail.text))
  .start();

router.post('/', (req, res) => {
	if(req.body.type === 'url_verification'){
		res.status(200)
		res.send({
			challenge: req.body.challenge
		})
	} else {
		const payload = JSON.parse(req.body.payload)
		if(payload.type === 'interactive_message') {
			console.log('action!')
			res.status(200)
			res.send(actionResponse(payload))
		}
	}
})

function actionType(actions){
	const action = actions[0]
	if(action.value) return action.value
	else {
		console.log(action)
		const userId = action.selected_options[0].value
		console.log('USER ID', userId)
		return action.selected_options && action.selected_options.length ? `assigned to <@${userId}>` : ''
	}
}

function actionResponse(message){
	const name = message.user.name[0].toUpperCase() + message.user.name.slice(1)
	const action = actionType(message.actions)

	return {
		attachments: [
			{
				text: message.original_message.attachments[0].text
			},
			{
				color: action === 'taken' ? '#78CAD2' : '#FE5F55',
				text: name + ' marked this call as ' + action
			},
			action !== 'taken' ? messageButtons : null
		]
	}
}

// if route is not found, this will be hit
router.use((req, res, next) => {
	const error = new Error('Not found.')
	error.status = 404
	next(error)
	
})

module.exports = router
