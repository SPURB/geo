import { middlewares } from './middlewares'
import { Router } from 'express'
import { GeoController} from './controllers'

const { isAuthorized } = middlewares

const route = Router()

route.get('/', (req, res) =>{
  const { baseUrl } = req
  res.send({
    title: 'Serviço de dados geográficos da São Paulo Urbanismo',
    endpoints: [
      {
        endpoint: `${baseUrl}/:id`,
        description: 'Lista uma geometria',
        type: 'GET',
        example: 'http://localhost:5000/geo/api/743'
      },
      {
        endpoint: `${baseUrl}/:ids/mapear`,
        description: 'Lista conjunto de geometrias',
        type: 'GET',
        example: 'http://localhost:5000/geo/api/[743,742,795]/mapear/'
      }
    ]
  })
})

route.post('/', isAuthorized, GeoController.create)
route.put('/:id', isAuthorized, GeoController.update)
route.delete('/:id', isAuthorized, GeoController.delete)
route.get('/:id', GeoController.findOne)
route.get('/:ids/mapear/', GeoController.findMultiple)

export default route