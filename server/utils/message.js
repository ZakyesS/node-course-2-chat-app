/*fichero para guardar funciones utiles relacionadas con enviar mensajes */
let moment = require('moment'); //se usa la librería momentjs

let generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: moment().valueOf()   //obtener timestamp actual
    };
};

let generateLocationMessage = (from, latitude, longitude) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: moment().valueOf()
    };
};

module.exports = {generateMessage, generateLocationMessage};