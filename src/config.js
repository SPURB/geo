const { config } = require('dotenv')

const envFound = config()
if (envFound.error) {
  throw new Error('⚠️ Arquivo .env não encontrado! ⚠️')
}
const { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT } = process.env

module.exports = {
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  port: DB_PORT,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}
