const router = require('express').Router()
const notifier = require('mail-notifier')
const { imap } = require('./constants')
const { sendHook, actionResponse } = require('./utils')

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

// if route is not found, this will be hit
router.use((req, res, next) => {
	const error = new Error('Not found.')
	error.status = 404
	next(error)
	
})

module.exports = router
