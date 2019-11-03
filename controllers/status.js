const Status = require('../models').status
const Sequelize = require('sequelize')
const TableHints = Sequelize.TableHints;
const Op = Sequelize.Op
const { ReS, ReE, updateOrCreate } = require('../helpers')

const create = async (req, res) => {
  const { id } = req.body
  await updateOrCreate(Status,
    {
      id: {
        [Op.eq]: id
      }
    },
    req.body
  )
    .then(record => {
      const resp = {
        message: 'Status creado/actualizado',
        record
      }
      return ReS(res, resp, 201)
    })
    .catch(err => ReE(res, err, 422))
}
module.exports.create = create

const getAll = (req, res) => {
  return Status
    .findAll({ tableHint: TableHints.NOLOCK, attributes: ['id', 'code', 'name'] })
    .then(statuses => res
      .status(200)
      .json({ success: true, statuses }))
    .catch(err => ReE(res, err, 422))
}
module.exports.getAll = getAll

const deleteRecord = (req, res) => {
  return Status
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then(status =>
      status.destroy()
        .then(status => {
          const resp = {
            message: `Status "${status.name}" eliminado`,
            status
          }
          return ReS(res, resp, 200)
        })
        .catch(() => ReE(res, 'Error ocurrido intentando eliminar el status'))
    )
    .catch(() => ReE(res, 'Error ocurrido intentando eliminar el status'))
}
module.exports.deleteRecord = deleteRecord