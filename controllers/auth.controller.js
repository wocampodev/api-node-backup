const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt-functions');
const { verificarTokenGoogle } = require('../helpers/google-auth-verify');

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

const loginWithGoogle = async ( req = request, res = response ) => {

    const { id_token } = req.body;

    try {
        
        const { nombre, correo, img } = await verificarTokenGoogle( id_token );
        let usuario = await Usuario.findOne({ correo });

        // Si no está creado
        if ( !usuario ) {
            
            const data = { nombre, correo, password: 'fake123', img, google: true };
            usuario = new Usuario( data );
            await usuario.save();        

        }

        // Si el usuario está deshabilidato en DB
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        const token = await generarJWT( usuario.uid );

        return res.status(200).json({
            msg: 'Login con Google exitoso',
            usuario,
            token
        });

    } catch (error) {
        
        return res.status(401).json({
            msg: 'Token de Google inválido',
        });

    }

};

module.exports = { login, loginWithGoogle };