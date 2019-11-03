module.exports.noProps = {
  password: undefined,
  email: undefined,
  profileId: undefined,
  companyId: undefined,
  statusId: undefined,
  createdAt: undefined,
  updatedAt: undefined
}

module.exports.updateOrCreate = (model, where, newItem, beforeCreate) => {
  return new Promise((resolve, reject) => {
    model
      .findOne({ where })
      .then(item => {
        if (!item) {
          return model.create(newItem)
            .then(item => resolve(item.data()))
            .catch(err => reject(err))
        }
        return model
          .findOne({ where })
          .then(item => {
            item.update(newItem, { where: where })
              .then(item => resolve(item.data()))
              .catch(err => reject(err))
          })
      })
  })
}

module.exports.ReE = (res, err, code) => {
  if (typeof err === 'object' && typeof err.message) {
    err = err.message
  }
  if (typeof code !== 'undefined') res.statusCode = code
  return res.json({ success: false, error: err })
}

module.exports.ReS = (res, data, code) => {
  let send_data = { success: true }
  if (typeof data === 'object') {
    send_data = Object.assign(data, send_data) // merge the objects
  }
  if (typeof code !== 'undefined') res.statusCode = code
  return res.json(send_data)
}