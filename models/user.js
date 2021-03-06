'use strict';
const bcrypt_p = require('bcrypt-promise')
const jwt = require('jsonwebtoken')
const CONFIG = require('../config')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    userName: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [4, 30],
          msg: 'Nombre de usuario debe tener entre 4 y 30 caracteres.'
        },
        notEmpty: { msg: 'Nombre de usuario es un campo obligatorio.' }
      },
      unique: {
        args: 'uniqueKey',
        msg: 'Nombre de usuario ya existe en la base de datos.'
      }
    },
    fullName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: {
        args: 'uniqueKey',
        msg: 'Email ya existe en la base de datos.'
      },
      validate: { isEmail: { msg: 'Email no es válido.' } }
    },
    profileId: DataTypes.TINYINT,
    companyId: DataTypes.INTEGER,
    statusId: DataTypes.TINYINT
  }, {})
  User.associate = function (models) {
    // associations can be defined here
  };
  User.beforeSave(async (user, options) => {
    if (user.changed('password')) {
      const salt = await bcrypt_p.genSalt(10)
      const hash = await bcrypt_p.hash(user.password, salt)
      user.password = hash
    }
  })

  User.prototype.comparePassword = async function (pw) {
    if (!this.password) {
      throw new Error('Password vacía')
    }
    const pass = await bcrypt_p.compare(pw, this.password)
    if (!pass) throw new Error('Password no válida')
    return this
  }

  User.prototype.getToken = function () {
    const expiration_time = parseInt(CONFIG.jwt_expiration)
    const params = {
      userId: this.id,
      email: this.email,
      userName: this.userName
    }
    const token = jwt.sign(params, CONFIG.jwt_encryption, { expiresIn: expiration_time })
    return `Bearer ${token}`
  }
  User.prototype.data = function () {
    let json = this.toJSON()
    return json
  }

  return User
};