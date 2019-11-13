const Store = require('../models').store
const Sequelize = require('sequelize')
const TableHints = Sequelize.TableHints;
const Op = Sequelize.Op
const sequelize = require("sequelize");
const { ReS, ReE, updateOrCreate } = require('../helpers')

const create = async (req, res) => {
  const { id, code, name, companyId, statusId } = req.body

  if (!code || !name || !companyId || !statusId) {
    return ReE(res, { success: false, message: 'Faltan datos. Complete los datos faltantes y vuelva a intentar' }, 422)
  }

  let found

  found = await Store.findOne({ where: { code, companyId } })
  if (found) {
    return ReE(res, { success: false, message: 'Ese código de depósito ya existe en la base de datos' }, 422)
  }

  found = await Store.findOne({ where: { name, companyId } })
  if (found) {
    return ReE(res, { success: false, message: 'Ese nombre de depósito ya existe en la base de datos' }, 422)
  }

  await updateOrCreate(Store,
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
  const Status = require("../models").status;
  Store.belongsTo(Company);
  Store.belongsTo(Status);
  return Store
    .findAll({
      raw: true,
      tableHint: TableHints.NOLOCK, attributes: ['id', 'code', 'name',
        'companyId', [sequelize.col('company.name'), 'company'],
        'statusId', [sequelize.col('status.name'), 'status'],
      ],
      include: [{
        model: Company,
        where: {
          id: sequelize.col('store.companyId')
        },
        attributes: []
      }, {
        model: Status,
        where: {
          id: sequelize.col('store.statusId')
        },
        attributes: []
      }]
    })
    .then(stores => res
      .status(200)
      .json({ success: true, stores }))
    .catch(err => ReE(res, err, 422))
}
module.exports.getAll = getAll

const deleteRecord = (req, res) => {
  return Store
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then(store =>
      store.destroy()
        .then(store => {
          const resp = {
            message: `Depósito "${store.name}" eliminado`,
            store
          }
          return ReS(res, resp, 200)
        })
        .catch(() => ReE(res, 'Error ocurrido intentando eliminar el depósito'))
    )
    .catch(() => ReE(res, 'Error ocurrido intentando eliminar el depósito'))
}
module.exports.deleteRecord = deleteRecord