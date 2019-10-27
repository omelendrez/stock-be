'use strict';
const bcrypt_p = require('bcrypt-promise')
const jwt = require('jsonwebtoken')
const CONFIG = require('../config')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    profileId: DataTypes.INTEGER,
    companyId: DataTypes.INTEGER,
    statusId: DataTypes.INTEGER
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
      throw new Error('Password was not set')
    }
    const pass = await bcrypt_p.compare(pw, this.password)
    if (!pass) throw new Error('Invalid password')
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

  return User
};