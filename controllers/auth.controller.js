const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt-functions');
const Usuario = require('../models/usuario.model');


const login = async ( req = request, res = response ) => {

    const { correo, password } = req.body;

    try {
        
        // Verificar correo
        const usuario = await Usuario.findOne({ correo });

        if ( !usuario ) {
            return res.status(400).json({
                msg: 'Correo o contraseña inválidos - Correo'
            });
        }
        
        // Verificar si el usuario está activo
        if ( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Correo o contraseña inválidos - Estado'
            });
        }

        // Verificar contraseña
        const passwordValido = bcryptjs.compareSync( password, usuario.password );

        if ( !passwordValido ) {
            return res.status(400).json({
                msg: 'Correo o contraseña inválidos - Password'
            });
        }

        // Generar JWT
        const token = await generarJWT( usuario.id );


        return res.json({ usuario, token });

    } catch ( error ) {
        
        console.log( error );
        return res.status(500).json({
            msg: 'Algo sucedió mal. Contáctese con el administrador'
        });

    }

};


module.exports = { login };