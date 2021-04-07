const path = require('path');
const { v4: uuidv4 } = require('uuid');

const extensionesDefault = ['jpg', 'jpeg', 'gif', 'png'];


const subirArchivo = ( archivo, carpeta = '', extensionesValidas = extensionesDefault ) => {

    return new Promise( ( resolve, reject ) => {

        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[ nombreCortado.length - 1 ].toLowerCase();

        if ( !extensionesValidas.includes( extension ) ) {
            return reject(`La extensión ${ extension } no es permitida - ${ extensionesValidas }`);
        }

        const nombreTemporal = uuidv4() + '.' + extension;

        const uploadPath = path.join( __dirname, '../uploads/', carpeta, nombreTemporal );

        archivo.mv( uploadPath, ( err ) => {
            if ( err ) {
                reject('Ha ocurrido un error, contacte con el administrador');
            }
            resolve( nombreTemporal );
        });

    });

};

module.exports = { subirArchivo };