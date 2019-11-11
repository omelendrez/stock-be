const User = require('../models').user
const Sequelize = require('sequelize')
const TableHints = Sequelize.TableHints;
const Op = Sequelize.Op
const sequelize = require("sequelize");
const { ReS, ReE, updateOrCreate, noProps } = require('../helpers')

const create = async (req, res) => {
  return User.create(req.body)
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
  const Profile = require("../models").profile;
  const Status = require("../models").status;
  User.belongsTo(Company);
  User.belongsTo(Profile);
  User.belongsTo(Status);
  return User
    .findAll({
      raw: true,
      tableHint: TableHints.NOLOCK, attributes: ['id', 'userName', 'fullName', 'email',
        'companyId', [sequelize.col('company.name'), 'company'],
        'statusId', [sequelize.col('status.name'), 'status'],
        'profileId', [sequelize.col('profile.name'), 'profile']
      ],
      include: [{
        model: Profile,
        where: {
          id: sequelize.col('user.profileId')
        },
        attributes: []
      }, {
        model: Company,
        where: {
          id: sequelize.col('user.companyId')
        },
        attributes: []
      }, {
        model: Status,
        where: {
          id: sequelize.col('user.statusId')
        },
        attributes: []
      }]
    })
    .then(users => res
      .status(200)
      .json({ success: true, users }))
    .catch(err => ReE(res, err, 422))
}
module.exports.getAll = getAll

const auth = async (req, res) => {
  const { email, password } = req.body
  const user = await User
    .findOne({ where: { [Op.or]: [{ email }, { userName: email }] } })
  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: 'Usuario o email no registrado' })
  }
  try {
    await user.comparePassword(password)
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: 'Contraseña incorrecta' })
  }

  const userData = { ...user.toJSON(), ...noProps }
  res
    .status(200)
    .json({ success: true, message: 'Acceso autorizado', user: userData, token: user.getToken() })
}
module.exports.auth = auth

module.exports.deleteRecord = (req, res) => ReE(res, 'La tabla de usuarios es una tabla reservada y sus registros no pueden ser eliminados')
