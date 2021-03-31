const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const firma = process.env.SECRETORPRIVATEKEY;

const Usuario = require('../models/usuario.model');


const validatJWT = async ( req = request, res = response, next ) => {

    const token = req.header('x-token');
    
    if ( !token ) {
        return res.status(401).json({
            msg: 'El token es requerido'
        });
    }

    try {
        
        const { uid } = jwt.verify( token, firma );
        const usuario = await Usuario.findById( uid );

        if ( !usuario ) {
            res.status(401).json({
                msg: 'Token inválido o expirado - usuario no disponible en la db'
            });
        }

        if ( !usuario.estado ) {
            res.status(401).json({
                msg: 'Token inválido o expirado - usuario deshabilitado'
            });
        }
        
        req.usuario = usuario;

        next();

    } catch ( error ) {
        
        console.log( error );
        res.status(401).json({
            msg: 'Token inválido o expirado'
        });

    }

};


module.exports = { validatJWT };