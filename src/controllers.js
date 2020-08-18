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
  create: (req, res) => {
    const features = req.body
    Geo.create({ features })
      .then(({ id }) => {
        res.send({
          id,
          message: `Geometria de ${id} cadastrado com sucesso.`
        })
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || `Ocorreu um erro na criação da geometria`
        })
      })
  },
  update: (req, res) => {
    const { id } = req.params

    Geo.update({ features: req.body }, { where: { id } })
      .then(num => {
        if (num) {
          res.send({
            message: `Sucesso! feição de id: ${id} foi atualizado`
          })
        } else {
          res.send({
            message: `Erro. Não foi possível atualizar a feição de id: ${id}. Talvez ${id} não tenha sido enconcontrada`
          })
        }
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || `Erro. Não foi possível atualizar id: ${id}`
        })
      })
},
  delete: (req, res) => {
    const { id } = req.params

    Geo.destroy({ where: { id } })
      .then(num => {
        if (num) {
          res.send({
            message: `Sucesso! feição de id: ${id} foi deletado`
          })
        } else {
          res.send({
            message: `Erro. Não foi possível deletar a feição de id: ${id}. Talvez ${id} não tenha sido enconcontrada`
          })
        }
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || `Erro. Não foi possível deletar id: ${id}`
        })
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
