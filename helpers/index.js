module.exports.throwErr = (err_message) => {
  throw new Error(err_message)
}

module.exports.noProps = {
  password: undefined,
  email: undefined,
  profileId: undefined,
  companyId: undefined,
  statusId: undefined,
  createdAt: undefined,
  updatedAt: undefined
}