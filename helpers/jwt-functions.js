const jwt = require('jsonwebtoken');

const firma = process.env.SECRETORPRIVATEKEY;


const generarJWT = ( uid = '' ) => {

    return new Promise( ( resolve, reject ) => {

        const payload = { uid };

        jwt.sign( payload, firma, { expiresIn: '4h' }, ( error, token ) => {

            if ( error ) {
                console.log( error );
                reject('No se pudo generar el token');
            } else {
                resolve( token );
            }

        });

    });

};


module.exports = { generarJWT };