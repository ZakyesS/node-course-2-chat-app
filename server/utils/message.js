/*fichero para guardar funciones utiles relacionadas con enviar mensajes */
let generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    };
};

module.exports = {generateMessage};