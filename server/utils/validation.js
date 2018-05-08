/*fichero para las validaciones de la room. */
let isRealString = (str) => {
    return typeof str === 'string' && str.trim().length > 0;
};

module.exports = {isRealString};
