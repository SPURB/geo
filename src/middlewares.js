export default {
  /*
   * Authorization: API Key
   */
  isAuth: async (req, res, next) => {
    const { authorization } = req.headers
    const isAuthorized = config.API_KEY === authorization
    isAuthorized ? next() : res.status(403).json({ message: 'Não Autorizado' })
  }
}
