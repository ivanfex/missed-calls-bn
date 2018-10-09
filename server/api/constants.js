require('dotenv').config()

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

const { GMAIL_ACC, GMAIL_PASS, IMAP_HOST } = process.env

const imap = {
	user: GMAIL_ACC,
	password: GMAIL_PASS,
	host: IMAP_HOST,
	port: 993, // imap port
	tls: true,// use secure connection
	tlsOptions: { rejectUnauthorized: false }
}

module.exports = {
	messageButtons,
	imap
}