const router = require('express').Router()
module.exports = router

// /api/cloudvision
router.use('/cloudvision', require('./cloudvision'))

router.use((req, res, next) => {
    const error = new Error('not found')
    error.status = 404
    next(error)
})
