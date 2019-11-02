const Product = require('../models').product
const Sequelize = require('sequelize')
const TableHints = Sequelize.TableHints;
const updateOrCreate = require('../helpers').updateOrCreate
const Op = Sequelize.Op
const sequelize = require("sequelize");

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
  const Category = require("../models").category;
  const Company = require("../models").company;
  const Status = require("../models").status;
  Product.belongsTo(Category);
  Product.belongsTo(Company);
  Product.belongsTo(Status);
  return Product
    .findAll({
      raw: true,
      tableHint: TableHints.NOLOCK, attributes: ['id', 'code', 'name', 'minimum', 'lastPurchaseDate', 'lastPurchasePrice', 'lastSaleDate', 'lastSalePrice', 'price',
        'categoryId', [sequelize.col('category.name'), 'category'],
        'companyId', [sequelize.col('company.name'), 'company'],
        'statusId', [sequelize.col('status.name'), 'status']
      ],
      include: [{
        model: Category,
        where: {
          id: sequelize.col('product.categoryId')
        },
        attributes: []
      }, {
        model: Company,
        where: {
          id: sequelize.col('product.companyId')
        },
        attributes: []
      }, {
        model: Status,
        where: {
          id: sequelize.col('product.statusId')
        },
        attributes: []
      }]
    })
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