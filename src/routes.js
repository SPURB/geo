import { middlewares } from './middlewares'
import { Router } from 'express'
import { GeoController, MapasController } from './controllers'

const { isAuthorized } = middlewares

export const routeBase = (app, basePath) => {
  const route = new Router()

  route.get('/', (req, res) =>{
    const { baseUrl } = req
    res.send({
      title: 'Serviço de dados geográficos da São Paulo Urbanismo',
      endpoints: [
        {
          endpoint: `${baseUrl}/geo/:id`,
          description: 'Lista uma geometria',
          type: 'GET',
          example: 'http://localhost:5000/geo/api/geo/743'
        },
        {
          endpoint: `${baseUrl}/geo/:ids/mapear`,
          description: 'Lista conjunto de geometrias',
          type: 'GET',
          example: 'http://localhost:5000/geo/api/geo/[743,742,795]/mapear/'
        },
        {
          endpoint: `${baseUrl}/mapas/`,
          description: 'Lista de todos os mapas',
          type: 'GET',
          example: 'http://localhost:5000/geo/api/mapas/'
        },
        {
          endpoint: `${baseUrl}/mapas/:id`,
          description: 'Mapa com coleção de geometrias',
          type: 'GET',
          example: 'http://localhost:5000/geo/api/mapas/1'
        }
      ]
    })
  })
  app.use(`${basePath}`, route)
}

export const routesGeo = (app, basePath) => {
  const route = new Router()

  route.post('/', isAuthorized, GeoController.create)
  route.get('/:id', GeoController.findOne)
  route.put('/:id', isAuthorized, GeoController.update)
  route.delete('/:id', isAuthorized, GeoController.delete)

  // mapear
  route.get('/:ids/mapear/', GeoController.findMultiple)
  app.use(`${basePath}/geo`, route)
}

export const routesMapas = (app, basePath) => {
  const route = new Router()

  route.get('/', MapasController.findAll)
  route.get('/:id', MapasController.findOne)
  route.post('/', isAuthorized, MapasController.create)
  route.put('/:id', isAuthorized, MapasController.update)

  app.use(`${basePath}/mapas`, route)
}