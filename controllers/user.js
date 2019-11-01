const User = require('../models').user
const Sequelize = require('sequelize')
const TableHints = Sequelize.TableHints;
const Op = Sequelize.Op
const { noProps } = require('../helpers')
const sequelize = require("sequelize");

const create = async (req, res) => {
  const { email, userName } = req.body
  const user = await User.findOne({ where: { [Op.or]: [{ email }, { userName }] } })
  if (user) {
    return res
      .status(400)
      .json({ success: false, message: 'Usuario o email ya registrado' })
  }
  return User.create(req.body)
    .then(user => {
      const data = { success: true, message: 'Ok', user: { ...user.toJSON(), password: undefined } }
      res
        .status(201)
        .json(data)
    })
    .catch(err => {
      res
        .status(500)
        .json({ success: false, message: 'Error insertando datos', err })
    })
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
      tableHint: TableHints.NOLOCK, attributes: ['id', 'userName', 'email'],
      include: [{
        model: Profile,
        where: {
          id: sequelize.col('user.profileId')
        },
        attributes: [
          ['id', 'profileId'], 'name'
        ]
      }, {
        model: Company,
        where: {
          id: sequelize.col('user.companyId')
        },
        attributes: [
          ['id', 'companyId'], 'name'
        ]
      }, {
        model: Status,
        where: {
          id: sequelize.col('user.statusId')
        },
        attributes: [
          ['id', 'statusId'], 'name'
        ]
      }]
    })
    .then(users => res
      .status(200)
      .json({ success: true, users }))
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