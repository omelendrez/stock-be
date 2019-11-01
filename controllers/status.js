const Status = require('../models').status
const Sequelize = require('sequelize')
const TableHints = Sequelize.TableHints;
const updateOrCreate = require('../helpers').updateOrCreate
const Op = Sequelize.Op

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
    .then(() => res
      .status(201)
      .json({ success: true })
    )
}
module.exports.create = create

const getAll = (req, res) => {
  return Status
    .findAll({ tableHint: TableHints.NOLOCK, attributes: ['id', 'code', 'name'] })
    .then(statuses => res
      .status(200)
      .json({ success: true, statuses }))
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
      status.destroy().then(result => {
        res.status(204).json(result)
      })
    )
    .catch(error => res.status(400).send(error))
}
module.exports.deleteRecord = deleteRecord