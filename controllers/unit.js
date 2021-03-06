const Unit = require('../models').unit
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

  found = await Unit.findOne({ where: { code, companyId } })
  if (found) {
    return ReE(res, { success: false, message: 'Ese código de unidad de medida ya existe en la base de datos' }, 422)
  }

  found = await Unit.findOne({ where: { name, companyId } })
  if (found) {
    return ReE(res, { success: false, message: 'Ese nombre de unidad de medida ya existe en la base de datos' }, 422)
  }

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
  verifyDelete(['product'], {
    unitId: {
      [Op.eq]: req.params.id
    }
  })
    .then(records => {
      if (records === 0) {
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
      } else {
        ReE(res, `Esta unidad de medida está siendo utilizada en ${records} tablas asociadas y por eso no puede ser eliminada`)
      }
    })
}
module.exports.deleteRecord = deleteRecord