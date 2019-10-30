module.exports.noProps = {
  password: undefined,
  email: undefined,
  profileId: undefined,
  companyId: undefined,
  statusId: undefined,
  createdAt: undefined,
  updatedAt: undefined
}

module.exports.updateOrCreate = (model, where, newItem, beforeCreate, res) => {
  return model
    .findOne({ where })
    .then(item => {
      if (!item) {
        Promise.resolve(beforeCreate)
          .then(() =>
            model.create(newItem)
              .then(item => item)
          )
      }
      return model
        .update(newItem, { where: where })
        .then(item => item)
    })
}
