import { db } from './models'
const Geo = db.Geo

const GeoController = {
  findOne: (req, res) => {
    const { id } = req.params
    Geo.findByPk(id)
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || `Ocorreu um erro na consulta de id: ${id}`
        })
      })
  },
  findOrCreate: (req, res) => {
    res.send({
      olar: `${req.role} autorizado`
    })
  },
  findMultiple: (req, res) => {
    const ids = JSON.parse(req.params.ids)
    Promise.all(ids.map(id => Geo.findByPk(id)))
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || `Ocorreu um erro na consulta`
        })
      })
  }
}

export { GeoController }
