const express = require('express')
const router = express.Router()

const Category = require('../controllers/category')
const User = require('../controllers/user')

router.get('/api/categories', Category.getAll)
router.post('/api/categories', Category.create)

router.get('/api/users', User.getAll)
router.post('/api/users', User.create)
router.post('/api/auth', User.auth)

module.exports = router
