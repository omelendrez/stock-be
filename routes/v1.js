const express = require('express')
const router = express.Router()

const Category = require('../controllers/category')
const Company = require('../controllers/company')
const User = require('../controllers/user')

router.get('/api/categories', Category.getAll)
router.post('/api/categories', Category.create)

router.get('/api/companies', Company.getAll)
router.post('/api/companies', Company.create)
router.delete('/api/companies/:id', Company.deleteRecord)

router.get('/api/users', User.getAll)
router.post('/api/users', User.create)
router.post('/api/auth', User.auth)

module.exports = router
