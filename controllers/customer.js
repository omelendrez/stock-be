const Customer = require('../models').customer
const Sequelize = require('sequelize')
const TableHints = Sequelize.TableHints;
const Op = Sequelize.Op
const sequelize = require("sequelize");
const { ReS, ReE, updateOrCreate } = require('../helpers')

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
    .then(record => {
      const resp = {
        message: 'Datos guardados satisfactoriamente',
        record
      }
      return ReS(res, resp, 201)
    })
    .catch(err => ReE(res, err, 422))
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
    .catch(err => ReE(res, err, 422))
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
      customer.destroy()
        .then(customer => {
          const resp = {
            message: `Cliente "${customer.name}" eliminado`,
            customer
          }
          return ReS(res, resp, 200)
        })
        .catch(() => ReE(res, 'Error ocurrido intentando eliminar el cliente'))
    )
    .catch(() => ReE(res, 'Error ocurrido intentando eliminar el cliente'))
}
module.exports.deleteRecord = deleteRecord