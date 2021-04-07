const dbValidators = require('./db-validators');
const googleAuthVerify = require('./google-auth-verify');
const jwtFunctions = require('./jwt-functions');
const subirArchivo = require('./subir-archivo');


module.exports = {
    ...dbValidators,
    ...googleAuthVerify,
    ...jwtFunctions,
    ...subirArchivo
};