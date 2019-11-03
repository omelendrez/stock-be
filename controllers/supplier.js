const Supplier = require('../models').supplier
const Sequelize = require('sequelize')
const TableHints = Sequelize.TableHints;
const Op = Sequelize.Op
const sequelize = require("sequelize");
const { ReS, ReE, updateOrCreate } = require('../helpers')

const create = async (req, res) => {
  const { id } = req.body
  await updateOrCreate(Supplier,
    {
      id: {
        [Op.eq]: id
      }
    },
    req.body
  )
    .then(record => {
      const resp = {
        message: 'Proveedor creado/actualizado',
        account: record
      }
      return ReS(res, resp, 201)
    })
    .catch(err => ReE(res, err, 422))
}
module.exports.create = create

const getAll = (req, res) => {
  const Company = require("../models").company;
  const Status = require("../models").status;
  Supplier.belongsTo(Company);
  Supplier.belongsTo(Status);
  return Supplier
    .findAll({
      raw: true,
      tableHint: TableHints.NOLOCK, attributes: ['id', 'code', 'name', 'address', 'phoneNumber', 'contact',
        'companyId', [sequelize.col('company.name'), 'company'],
        'statusId', [sequelize.col('status.name'), 'status'],
      ],
      include: [{
        model: Company,
        where: {
          id: sequelize.col('supplier.companyId')
        },
        attributes: []
      }, {
        model: Status,
        where: {
          id: sequelize.col('supplier.statusId')
        },
        attributes: []
      }]

    })
    .then(suppliers => res
      .status(200)
      .json({ success: true, suppliers }))
    .catch(err => ReE(res, err, 422))
}
module.exports.getAll = getAll

const deleteRecord = (req, res) => {
  return Supplier
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then(supplier =>
      supplier.destroy()
        .then(supplier => {
          const resp = {
            message: `Proveedor "${supplier.name}" eliminada`,
            supplier
          }
          return ReS(res, resp, 200)
        })
        .catch(() => ReE(res, 'Error ocurrido intentando eliminar el proveedor'))
    )
    .catch(() => ReE(res, 'Error ocurrido intentando eliminar el proveedor'))
}
module.exports.deleteRecord = deleteRecord