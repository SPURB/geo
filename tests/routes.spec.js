import request from 'supertest'
import { app, basePath } from '../src/app'

describe('GET /', () => {
  it('Status deve ser 200', async () => {
    await request(app).get(basePath).expect(200)
  })
})