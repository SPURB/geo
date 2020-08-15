const fs = require('fs')
const path = require('path')
const geojson = JSON.parse(fs.readFileSync(`${path.resolve(__dirname)}/oucfl.dev.geojson`, 'utf8'))

module.exports = {
  polygons: geojson.features
    .filter(({ properties }) => properties.OUCFL_ADES)
    .map(({ properties, geometry }) => {
    return {
      id: properties.OUCFL_ADES,
      coordinates: geometry.coordinates
    }
  })
}
