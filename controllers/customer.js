const Customer = require('../models').customer
const Sequelize = require('sequelize')
const TableHints = Sequelize.TableHints;
const updateOrCreate = require('../helpers').updateOrCreate
const Op = Sequelize.Op
const sequelize = require("sequelize");

const create = async (req, res) => {
  const { id } = req.body
  await updateOrCreate(Customer,
    {
      id: {
        [Op.eq]: id
      }
    },
    req.body
  )
    .then(() => res
      .status(201)
      .json({ success: true })
    )
}
module.exports.create = create

const getAll = (req, res) => {
  const Status = require("../models").status;
  const Company = require("../models").company;
  Customer.belongsTo(Status);
  Customer.belongsTo(Company);

  return Customer
    .findAll({
      raw: true,
      tableHint: TableHints.NOLOCK, attributes: ['id', 'code', 'name', 'address', 'phone', 'email', 'contact', 'vat', 'companyId', [sequelize.col('company.name'), 'company'], 'statusId', [sequelize.col('status.name'), 'status']],
      include: [{
        model: Company,
        where: {
          id: sequelize.col('customer.companyId')
        },
        attributes: []
      }, {
        model: Status,
        where: {
          id: sequelize.col('customer.statusId')
        },
        attributes: []
      }]
    })
    .then(customers => res
      .status(200)
      .json({ success: true, customers }))
}
module.exports.getAll = getAll

const deleteRecord = (req, res) => {
  return Customer
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then(customer =>
      customer.destroy().then(result => {
        res.status(204).json(result)
      })
    )
    .catch(error => res.status(400).send(error))
}
module.exports.deleteRecord = deleteRecord