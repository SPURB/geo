import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { routeBase, routesGeo, routesMapas } from './routes'
import { name } from '../package.json'

const basePath = `/${name}/api`

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

routeBase(app, basePath)
routesGeo(app, basePath)
routesMapas(app, basePath)

const PORT = process.env.PORT || 5000

app.listen(PORT, () =>
  console.log(`Serviço disponível na porta ${PORT}`)
)

// app.use((req, res, next) => {
//   const err = new Error('Not Found')
//   err.status = 404
//   next(err)
// })

// app.use((err, req, res, next) => {
//   res.status(err.status || 500).send({
//     message: err.message
//   })
// })