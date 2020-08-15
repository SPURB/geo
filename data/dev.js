const { polygons } = require('./index')

// console.log(polygons)

// Encontra ids duplicados
let lista = polygons.map(({id}) => id)

let duplicate = lista.reduce((acc, currentValue, index, array) => {
  if (array.indexOf(currentValue)!=index && !acc.includes(currentValue)) acc.push(currentValue)
  return acc
}, [])

console.log('Itens duplicados são: ' + duplicate.join(', '))