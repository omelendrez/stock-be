const Category = require('../models').category
const Sequelize = require('sequelize')
const TableHints = Sequelize.TableHints;
const updateOrCreate = require('../helpers').updateOrCreate
const Op = Sequelize.Op

const create = async (req, res) => {
  const { id } = req.body
  await updateOrCreate(Category,
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
  return Category
    .findAll({ tableHint: TableHints.NOLOCK, attributes: ['id', 'code', 'name', 'companyId'] })
    .then(categories => res
      .status(200)
      .json({ success: true, categories }))
}
module.exports.getAll = getAll
