import { db } from './models'
const Token = db.Token


export const middlewares = {
  /*
   * Define se requisição é autorizada. Seta req.role
  */
  isAuthorized: async (req, res, next) => {
    const { authorization } = req.headers

    try {
      const apiToken = await Token.findOne({
        attributes: [ 'token', 'role' ],
        where: { token: authorization }
      })

      const notAuthorized = !apiToken

      if (notAuthorized) {
        res.status(403).json({
          message: 'Não autorizado. Solicite um acesso para desenvolvimento@spurbanismo.sp.gov.br para utilizar a api'
        })
      }
      else {
        req.role = apiToken.dataValues.role
        next()
      }
    }

    catch(err) {
      res.status(500).json({
        message: err.message
      })
    }
  }
}
