const Unit = require('../models').unit
const Sequelize = require('sequelize')
const TableHints = Sequelize.TableHints;
const Op = Sequelize.Op
const sequelize = require("sequelize");
const { ReS, ReE, updateOrCreate } = require('../helpers')

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
  const Company = require("../models").company;
  Unit.belongsTo(Company);
  return Unit
    .findAll({
      raw: true, tableHint: TableHints.NOLOCK, attributes: ['id', 'code', 'name',
        'companyId', [sequelize.col('company.name'), 'company']
      ],
      include: [{
        model: Company,
        where: {
          id: sequelize.col('unit.companyId')
        },
        attributes: []
      }]
    })
    .then(units => res
      .status(200)
      .json({ success: true, units }))
    .catch(err => ReE(res, err, 422))
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
      unit.destroy()
        .then(unit => {
          const resp = {
            message: `Unidad de medida "${unit.name}" eliminada`,
            unit
          }
          return ReS(res, resp, 200)
        })
        .catch(() => ReE(res, 'Error ocurrido intentando eliminar la unidad de medida'))
    )
    .catch(() => ReE(res, 'Error ocurrido intentando eliminar la unidad de medida'))
}
module.exports.deleteRecord = deleteRecord