const Category = require('../models').category
const Sequelize = require('sequelize')
const TableHints = Sequelize.TableHints;
const Op = Sequelize.Op
const sequelize = require("sequelize");
const { ReS, ReE, updateOrCreate, verifyDelete } = require('../helpers')

const create = async (req, res) => {
  const { id, code, name, companyId } = req.body

  if (!code || !name || !companyId) {
    return ReE(res, { success: false, message: 'Faltan datos. Complete los datos faltantes y vuelva a intentar' }, 422)
  }

  let found

  found = await Category.findOne({ where: { code, companyId } })
  if (found) {
    return ReE(res, { success: false, message: 'Ese código de categoría ya existe en la base de datos' }, 422)
  }

  found = await Category.findOne({ where: { name, companyId } })
  if (found) {
    return ReE(res, { success: false, message: 'Ese nombre de categoría ya existe en la base de datos' }, 422)
  }

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
  verifyDelete(['product'], {
    categoryId: {
      [Op.eq]: req.params.id
    }
  })
    .then(records => {
      if (records === 0) {
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
      } else {
        ReE(res, `Esta categoría está siendo utilizada en ${records} tablas asociadas y por eso no puede ser eliminada`)
      }
    })
}
module.exports.deleteRecord = deleteRecord