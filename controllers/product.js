const Product = require('../models').product
const Sequelize = require('sequelize')
const TableHints = Sequelize.TableHints;
const updateOrCreate = require('../helpers').updateOrCreate
const Op = Sequelize.Op

const create = async (req, res) => {
  const { id } = req.body
  await updateOrCreate(Product,
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
  return Product
    .findAll({ tableHint: TableHints.NOLOCK, attributes: ['id', 'code', 'name', 'categoryId', 'minimum', 'lastPurchaseDate', 'lastPurchasePrice', 'lastSaleDate', 'lastSalePrice', 'price', 'companyId', 'statusId'] })
    .then(products => res
      .status(200)
      .json({ success: true, products }))
}
module.exports.getAll = getAll

const deleteRecord = (req, res) => {
  return Product
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then(product =>
      product.destroy().then(result => {
        res.status(204).json(result)
      })
    )
    .catch(error => res.status(400).send(error))
}
module.exports.deleteRecord = deleteRecord