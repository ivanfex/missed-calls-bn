const router = require('express').Router()
const axios = require('axios')
const notifier = require('mail-notifier')

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
			{
				"text": "Call state?",
				"fallback": "The state couldn't be changed",
				"callback_id": "call_state",
				"color": "#3AA3E3",
				"attachment_type": "default",
				"actions": [
					{
						"name": "call_taken",
						"text": "Taken",
						"type": "button",
						"value": "taken"
					},
					{
						"name": "call_missed",
						"text": "Missed",
						"type": "button",
						"value": "missed"
					}
				]
			}
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

function actionResponse(message){
	return {
		attachments: [
			{
				text: message.original_message.attachments[0].text
			},
			{
				color: '#FF0000',
				text: message.user.name + ' marked this call as ' + message.actions[0].value
			}
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
