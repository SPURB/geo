import { db } from './models'
const geoModel = db.Geo

const Geo = {
  findOne: (req, res) => {
    const id = req.params.id
    geoModel.findByPk(id)
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || `Ocorreu um erro na consulta de id: ${id}`
        })
      })
  }
}

export { Geo }