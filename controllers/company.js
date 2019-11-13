const Company = require('../models').company
const Sequelize = require('sequelize')
const TableHints = Sequelize.TableHints;
const Op = Sequelize.Op
const sequelize = require("sequelize");
const { ReS, ReE, updateOrCreate, verifyDelete } = require('../helpers')

const create = async (req, res) => {
  const { id, code, name, statusId } = req.body

  if (!code || !name || !statusId) {
    return ReE(res, { success: false, message: 'Faltan datos. Complete los datos faltantes y vuelva a intentar' }, 422)
  }

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
        message: 'Datos guardados satisfactoriamente',
        record
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
  verifyDelete(['category', 'customer', 'product', 'store', 'supplier', 'user', 'unit'], {
    companyId: {
      [Op.eq]: req.params.id
    }
  })
    .then(records => {
      if (records === 0) {
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
      } else {
        ReE(res, `Esta compañía está siendo utilizada en ${records} tablas asociadas y por eso no puede ser eliminada`)
      }
    })
}
module.exports.deleteRecord = deleteRecord
