import { Router } from 'express'
import { GeoController } from './controllers'

const route = Router()

//http://localhost:5000/geo/api/743
route.get('/:id', GeoController.findOne)

//http://localhost:5000/geo/api/[743, 742, 795]/mapear/
route.get('/:ids/mapear/', GeoController.findMultiple)

export default route