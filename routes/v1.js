const express = require('express')
const router = express.Router()

const Category = require('../controllers/category')
const Company = require('../controllers/company')
const Customer = require('../controllers/customer')
const Product = require('../controllers/product')
const Profile = require('../controllers/profile')
const Status = require('../controllers/status')
const Store = require('../controllers/store')
const Supplier = require('../controllers/supplier')
const Unit = require('../controllers/unit')
const User = require('../controllers/user')

router.get('/api/categories', Category.getAll)
router.post('/api/categories', Category.create)
router.delete('/api/categories', Category.deleteRecord)

router.get('/api/companies', Company.getAll)
router.post('/api/companies', Company.create)
router.delete('/api/companies/:id', Company.deleteRecord)

router.get('/api/customers', Customer.getAll)
router.post('/api/customers', Customer.create)
router.delete('/api/customers/:id', Customer.deleteRecord)

router.get('/api/customers', Customer.getAll)
router.post('/api/customers', Customer.create)
router.delete('/api/customers/:id', Customer.deleteRecord)

router.get('/api/products', Product.getAll)
router.post('/api/products', Product.create)
router.delete('/api/products/:id', Product.deleteRecord)

router.get('/api/profiles', Profile.getAll)
router.post('/api/profiles', Profile.create)
router.delete('/api/profiles/:id', Profile.deleteRecord)

router.get('/api/statuses', Status.getAll)
router.post('/api/statuses', Status.create)
router.delete('/api/statuses/:id', Status.deleteRecord)

router.get('/api/stores', Store.getAll)
router.post('/api/stores', Store.create)
router.delete('/api/stores/:id', Store.deleteRecord)

router.get('/api/suppliers', Supplier.getAll)
router.post('/api/suppliers', Supplier.create)
router.delete('/api/suppliers/:id', Supplier.deleteRecord)

router.get('/api/units', Unit.getAll)
router.post('/api/units', Unit.create)
router.delete('/api/units/:id', Unit.deleteRecord)

router.get('/api/users', User.getAll)
router.post('/api/users', User.create)
router.delete('/api/users/:id', User.deleteRecord)
router.post('/api/auth', User.auth)

module.exports = router
