const { request, response } = require('express');


const usuariosGet = ( req = request, res = response ) => {

    const { q, nombre = 'Sin nombre', page = 1, limit = 5, apikey } = req.query;

    return res.json({
        msg: 'get Usuarios',
        q,
        nombre,
        page,
        limit,
        apikey
    });

};

const usuariosPost = ( req = request, res = response ) => {

    const { nombre, edad } = req.body;

    return res.json({
        msg: 'post Usuarios',
        nombre,
        edad
    });

};

const usuariosPut = ( req = request, res = response ) => {

    const { id } = req.params;

    return res.json({
        msg: 'put Usuarios',
        id
    });

};

const usuariosPatch = ( req, res = response ) => {
    return res.json({
        msg: 'patch Usuarios'
    });
};

const usuariosDelete = ( req, res = response ) => {
    return res.json({
        msg: 'delete Usuarios'
    });
};


module.exports = {

    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,

};