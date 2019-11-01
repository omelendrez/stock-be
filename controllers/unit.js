const Unit = require('../models').unit
const Sequelize = require('sequelize')
const TableHints = Sequelize.TableHints;
const updateOrCreate = require('../helpers').updateOrCreate
const Op = Sequelize.Op
const sequelize = require("sequelize");

const create = async (req, res) => {
  const { id } = req.body
  await updateOrCreate(Unit,
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
  const Company = require("../models").company;
  Unit.belongsTo(Company);
  return Unit
    .findAll({
      raw: true, tableHint: TableHints.NOLOCK, attributes: ['id', 'code', 'name'],
      include: [{
        model: Company,
        where: {
          id: sequelize.col('unit.companyId')
        },
        attributes: [
          ['id', 'companyId'], 'name'
        ]
      }]
    })
    .then(units => res
      .status(200)
      .json({ success: true, units }))
}
module.exports.getAll = getAll

const deleteRecord = (req, res) => {
  return Unit
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then(unit =>
      unit.destroy().then(result => {
        res.status(204).json(result)
      })
    )
    .catch(error => res.status(400).send(error))
}
module.exports.deleteRecord = deleteRecord