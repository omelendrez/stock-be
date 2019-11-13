const Profile = require('../models').profile
const Sequelize = require('sequelize')
const TableHints = Sequelize.TableHints;
const Op = Sequelize.Op
const { ReS, ReE, updateOrCreate, verifyDelete } = require('../helpers')

const create = async (req, res) => {
  const { id, code, name } = req.body

  if (!code || !name) {
    return ReE(res, { success: false, message: 'Faltan datos. Complete los datos faltantes y vuelva a intentar' }, 422)
  }

  await updateOrCreate(Profile,
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
  return Profile
    .findAll({ tableHint: TableHints.NOLOCK, attributes: ['id', 'code', 'name'] })
    .then(profiles => res
      .status(200)
      .json({ success: true, profiles }))
    .catch(err => ReE(res, err, 422))
}
module.exports.getAll = getAll

const deleteRecord = (req, res) => {
  verifyDelete(['user'], {
    profileId: {
      [Op.eq]: req.params.id
    }
  })
    .then(records => {
      if (records === 0) {
        return Profile
          .findOne({
            where: {
              id: req.params.id
            }
          })
          .then(profile =>
            profile.destroy()
              .then(profile => {
                const resp = {
                  message: `Perfil "${profile.name}" eliminado`,
                  profile
                }
                return ReS(res, resp, 200)
              })
              .catch(() => ReE(res, 'Error ocurrido intentando eliminar el profile'))
          )
          .catch(() => ReE(res, 'Error ocurrido intentando eliminar el profile'))
      } else {
        ReE(res, `Este perfil está siendo utilizado en ${records} tablas asociadas y por eso no puede ser eliminado`)
      }
    })
}
module.exports.deleteRecord = deleteRecord