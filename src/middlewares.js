import { db } from './models'
const Token = db.Token


export const middlewares = {
  /*
   * Define se requisição é autorizada. Se autorizado seta req.role (tipo de autorização)
  */
  isAuthorized: async (req, res, next) => {
    const { authorization } = req.headers

    try {
      const apiToken = await Token.findOne({
        attributes: [ 'token', 'role', 'valid' ],
        where: { token: authorization }
      })

      const notAuthorized = !apiToken

      if (notAuthorized) {
        res.status(403).json({
          message: 'Não autorizado. Solicite um acesso para desenvolvimento@spurbanismo.sp.gov.br para utilizar a api'
        })
      }
      else {
        const { role, valid } = apiToken.dataValues

        if (!valid) {
          res.status(403).json({
            message: 'Este token não é mais válido. Crie um novo token ou solicite um acesso para desenvolvimento@spurbanismo.sp.gov.br para utilizar a api'
          })
        }

        else {
          req.role = role
          next()
        }
      }
    }

    catch(err) {
      res.status(500).json({
        message: err.message
      })
    }
  }
}
