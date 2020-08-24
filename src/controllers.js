import { db } from './models'
const Geo = db.Geo
const Mapa = db.Mapa
const MapaGeo = db.MapaGeo

const GeoController = {
  findOne: (req, res) => {
    const { id } = req.params
    Geo.findByPk(id)
      .then(data => {

        res.send({
          type: 'Feature',
          properties: {},
          geometry: {
            type: data.features.type,
            coordinates: data.features.coordinates
          }   
        })
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || `Ocorreu um erro na consulta de id: ${id}`
        })
      })
  },
  create: async (req, res) => {
    try {
      const geo = await Geo.create({ features: req.body })

      return res.status(200).json({
        id: geo.id,
        message: `Geometria de ${geo.id} cadastrado com sucesso.`
      })
    }
    catch (err) {
      return res.status(500).json({ err })
    }
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
        const features = data.map(geo => {
          return {
            type: 'Feature',
            properties: {},
            geometry: {
              type: geo.features.type,
              coordinates: geo.features.coordinates
            }
          }
        })
        
        res.send({
          type: 'FeatureCollection',
          features
        })
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || `Ocorreu um erro na consulta`
        })
      })
  }
}

const MapasController = {
  findAll: async (req, res) => {
    let where = {}

    try {
      if (req.query) {
        where = req.query
      }
      const mapas = await Mapa.findAll({
        where,
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      })
      res.status(200).json(mapas)
    }
    catch (err) {
      res.status(500).json({
        err,
        message: err.message || 'erro'
      })
    }
  },
  create: async (req, res) => {
    try {
      const { geos, ...data } = req.body
      const mapa = await Mapa.create(data)

      if (geos && geos.length > 0) {
        mapa.setGeos(geos)
      }
      res.send(mapa)
    }
    catch (err) {
      res.status(500).json({
        err,
        message: err.message || 'Ocorreu um erro na criação do mapa'
      })
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params

      const mapa = await Mapa.findOne({ where:{ id } })

      const { geos, ...data } = req.body
      mapa.update(data)

      if (geos && geos.length > 0) {
        mapa.setGeos(geos)
      }

      res.send(mapa)
    }
    catch (err) {
      res.status(500).json({
        err,
        message: err.message || 'Ocorreu um erro na atualização do mapa'
      })
    }
  },
  findOne: (req, res) => {
    Mapa.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Geo,
          as: 'geos',
          through: { attributes: [] }
        }
      ]
    })
      .then(data => {
        const features = data.geos.map(geo => {
          return {
            type: 'Feature',
            properties: {
              id: geo.id
            },
            geometry: {
              type: geo.features.type,
              coordinates: geo.features.coordinates
            }
          }
        })
        
        res.send({
          type: 'FeatureCollection',
          properties: {
            nome: data.nome,
            descricao: data.descricao
          },
          features
        })
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || `Ocorreu um erro na consulta do mapa id: ${id}`
        })
      })
    }
}

export { GeoController, MapasController }
