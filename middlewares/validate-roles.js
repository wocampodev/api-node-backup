const { request, response } = require('express');


const esAdmin = async ( req = request, res = response, next ) => {

    if ( !req.usuario ) {
        return res.status(500).json({
            msg: 'Se quiere validar el rol sin primero validar el token'
        });
    }

    const { rol, nombre } = req.usuario;

    if ( rol !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `${ nombre } No tiene los permisos para ejecutar esta acción`
        });
    }

    next();

};

const tieneRol = ( ...roles ) => {

    return ( req = request, res = response, next ) => {

        if ( !req.usuario ) {
            return res.status(500).json({
                msg: 'Se quiere validar el rol sin primero validar el token'
            });
        }

        if ( !roles.includes( req.usuario.rol ) ) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            });
        }

        next();
    };

};


module.exports = { esAdmin, tieneRol };