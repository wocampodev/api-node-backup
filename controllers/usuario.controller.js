const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const { Usuario } = require('../models');


const usuariosGet = async ( req = request, res = response ) => {

    const { limite = 10, desde = 0 } = req.query;
    const query = { estado: true };

    // Asincronía en su máximo esplendor
    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find( query )
            .skip( Number(desde) )
            .limit( Number(limite) )
    ]);

    return res.json({ total, usuarios });

};

const usuariosPost = async ( req = request, res = response ) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en DB
    await usuario.save();

    return res.json( usuario );

};

const usuariosPut = async ( req = request, res = response ) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...rest } = req.body;

    // Validar contra DB
    if ( password ) {
        // Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, rest );

    return res.json( usuario );

};

const usuariosPatch = ( req, res = response ) => {
    return res.json({
        msg: 'patch Usuarios'
    });
};

const usuariosDelete = async ( req = request, res = response ) => {

    const { id } = req.params;

    // Borrado físico
    // const usuario = await Usuario.findByIdAndDelete( id );

    // Borrado lógico
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false });

    return res.json( usuario );

};


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
};