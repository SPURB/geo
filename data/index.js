const fs = require('fs')
const path = require('path')
const geojson = JSON.parse(fs.readFileSync(`${path.resolve(__dirname)}/oucfl.dev.geojson`, 'utf8'))

module.exports = {
  polygons: (() => {
    let poligonsWithIds = []
    
    geojson.features
      .forEach(({ properties, geometry }, index) => {
        if (!properties.OUCFL_ADES) {
          properties.OUCFL_ADES = index + 10000 // atribui ids para geometrias sem ids
        }
        let id = parseInt(properties.OUCFL_ADES)

        if (poligonsWithIds.map((data)=> data.id).includes(id)) {
          id = id + 20000 // atribui ids para geometrias com ids repetidas
        }
        poligonsWithIds.push({
          id,
          coordinates: geometry.coordinates
        })
    })
    return poligonsWithIds
  })()
}
