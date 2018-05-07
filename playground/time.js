let moment = require('moment');

// let date = moment();
// console.log('Tiempo formateado:', date.format());
// console.log('Tiempo formateado en [mes/dia/año]: ', date.format('MMM Do, YYYY'));
// date.add(100, 'year');  //añadir años.
// console.log('Años añadidos: ', date.format('MMM Do, YYYY'));
// date.add(100, 'year').subtract(9, 'months');    //añadir años y restar meses.
// console.log('Tiempo añadido: ', date.format('MMM Do, YYYY'));


let someTimestamp = moment().valueOf();
console.log(someTimestamp);

let createdAt = 1234;
let date = moment();
console.log(date.format('h:mm a')); //10:22 am
