const Company = require('../models').company
const Sequelize = require('sequelize')
const TableHints = Sequelize.TableHints;
const Op = Sequelize.Op
const sequelize = require("sequelize");
const { ReS, ReE, updateOrCreate } = require('../helpers')

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
    .then(record => {
      const resp = {
        message: 'Compañía creada/actualizada',
        account: record
      }
      return ReS(res, resp, 201)
    })
    .catch(err => ReE(res, err, 422))
}
module.exports.create = create

const getAll = (req, res) => {
  const Status = require("../models").status;
  Company.belongsTo(Status);
  return Company
    .findAll({
      raw: true,
      tableHint: TableHints.NOLOCK, attributes: ['id', 'code', 'name', 'statusId', [sequelize.col('status.name'), 'status']],
      include: [{
        model: Status,
        where: {
          id: sequelize.col('company.statusId')
        },
        attributes: []
      }]
    })
    .then(companies => res
      .status(200)
      .json({ success: true, companies }))
    .catch(err => ReE(res, err, 422))
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
      company.destroy()
        .then(company => {
          const resp = {
            message: `Compañía "${company.name}" eliminada`,
            company
          }
          return ReS(res, resp, 200)
        })
        .catch(() => ReE(res, 'Error ocurrido intentando eliminar la compañía'))
    )
    .catch(() => ReE(res, 'Error ocurrido intentando eliminar la compañía'))
}
module.exports.deleteRecord = deleteRecord
