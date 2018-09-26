const router = require('express').Router()
const axios = require('axios')

function fileReader(file) {
	console.log('reading')
	// console.log(file)
	axios.get(file.url_private_download)
	.then(data => data)
	.then(data => {
		console.log(data)
	})
	.catch(console.error)
}

router.post('/', (req, res) => {
	if(req.body.event.files){
		fileReader(req.body.event.files[0])
	}else{
		console.log('REQUEST ENTERED', req.body.event.text);
	}
	
	if(req.body.type === 'url_verification'){
		// console.log('REQUEST ENTERED', req);
		res.status(200)
		res.send({
			challenge: req.body.challenge
		})
	}
})

// if route is not found, this will be hit
router.use((req, res, next) => {
	const error = new Error('Not found.')
	error.status = 404
	next(error)
	
})

module.exports = router
