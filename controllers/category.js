const Category = require('../models').category
const Sequelize = require('sequelize')
const TableHints = Sequelize.TableHints;
const Op = Sequelize.Op
const sequelize = require("sequelize");
const { ReS, ReE, updateOrCreate } = require('../helpers')

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
    .then(record => {
      const resp = {
        message: 'Categoría creada/actualizada',
        account: record
      }
      return ReS(res, resp, 201)
    })
    .catch(err => ReE(res, err, 422))
}
module.exports.create = create

const getAll = (req, res) => {
  const Company = require("../models").company;
  Category.belongsTo(Company);
  return Category
    .findAll({
      raw: true,
      tableHint: TableHints.NOLOCK, attributes: ['id', 'code', 'name', 'companyId', [sequelize.col('company.name'), 'company']],
      include: [{
        model: Company,
        where: {
          id: sequelize.col('category.companyId')
        },
        attributes: [
        ]
      }]

    })
    .then(categories => res
      .status(200)
      .json({ success: true, categories }))
    .catch(err => ReE(res, err, 422))

}
module.exports.getAll = getAll

const deleteRecord = (req, res) => {
  return Category
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then(category =>
      category.destroy()
        .then(category => {
          const resp = {
            message: `Categoría "${category.name}" eliminada`,
            category
          }
          return ReS(res, resp, 200)
        })
        .catch(() => ReE(res, 'Error ocurrido intentando eliminar la categoría'))
    )
    .catch(() => ReE(res, 'Error ocurrido intentando eliminar la categoría'))
}
module.exports.deleteRecord = deleteRecord