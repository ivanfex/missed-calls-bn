const router = require('express').Router()

// if route is not found, this will be hit
router.use((req, res, next) => {
	const error = new Error('Not found.')
	error.status = 404
	next(error)
})

module.exports = router
