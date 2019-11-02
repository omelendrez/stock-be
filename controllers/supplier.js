const Supplier = require('../models').supplier
const Sequelize = require('sequelize')
const TableHints = Sequelize.TableHints;
const updateOrCreate = require('../helpers').updateOrCreate
const Op = Sequelize.Op
const sequelize = require("sequelize");

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
    .then(() => res
      .status(201)
      .json({ success: true })
    )
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
      supplier.destroy().then(result => {
        res.status(204).json(result)
      })
    )
    .catch(error => res.status(400).send(error))
}
module.exports.deleteRecord = deleteRecord