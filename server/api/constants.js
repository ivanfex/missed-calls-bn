const messageButtons = {
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
		},
		{
			"name": "assign_call",
			"text": "Assign to...",
			"type": "select",
			"data_source": "users"
		}
	]
}

module.exports = {
	messageButtons
}