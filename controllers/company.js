const Company = require('../models').company
const Sequelize = require('sequelize')
const TableHints = Sequelize.TableHints;
const updateOrCreate = require('../helpers').updateOrCreate
const Op = Sequelize.Op
const sequelize = require("sequelize");

const create = async (req, res) => {
  const { id } = req.body
  await updateOrCreate(Company,
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
  Company.belongsTo(Status);
  return Company
    .findAll({
      raw: true,
      tableHint: TableHints.NOLOCK, attributes: ['id', 'code', 'name'],
      include: [{
        model: Status,
        where: {
          id: sequelize.col('company.statusId')
        },
        attributes: [
          ['id', 'statusId'], 'name'

        ]
      }]
    })
    .then(companies => res
      .status(200)
      .json({ success: true, companies }))
}
module.exports.getAll = getAll

const deleteRecord = (req, res) => {
  return Company
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then(company =>
      company.destroy().then(result => {
        res.status(204).json(result)
      })
    )
    .catch(error => res.status(400).send(error))
}
module.exports.deleteRecord = deleteRecord
