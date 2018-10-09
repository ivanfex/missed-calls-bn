const { messageButtons } = require('./constants')
const axios = require('axios')
require('dotenv').config()

const sendHook = message => {
	axios.post(process.env.SLACK_API, {
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

const actionType = actions => {
	const action = actions[0]
	if(action.value) return action.value
	else {
		console.log(action)
		const userId = action.selected_options[0].value
		console.log('USER ID', userId)
		return action.selected_options && action.selected_options.length ? `assigned to <@${userId}>` : ''
	}
}

const actionResponse = message => {
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

module.exports = {
	sendHook,
	actionResponse
}