import { Router } from 'express'
import { Geo } from './controllers'

const route = Router()

route.get('/:id', Geo.findOne)

export default route