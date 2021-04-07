const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );

const { response } = require('express');
const { subirArchivo } = require('../helpers');
const { Usuario, Producto } = require('../models');

const cargarArchivo = async ( req, res = response ) => {

    try {
        // const nombre = await subirArchivo( req.files.archivo, 'textos', ['txt', 'md'] );
        const nombre = await subirArchivo( req.files.archivo, 'imgs' );
        res.json({ nombre });
    } catch (error) {
        res.status(400).json({
            msg: 'Algo salió mal...'
        });
    }

};

// const actualizarImgs = async ( req, res = response ) => {

//     const { id, coleccion } = req.params;

//     let modelo = null;

//     switch ( coleccion ) {
//         case 'usuarios':
//             modelo = await Usuario.findById( id );
//             if ( !modelo ) {
//                 return res.status(400).json({
//                     msg: `No existe un usuario con el id ${ id }`
//                 });
//             }
//             break;
//         case 'productos':
//             modelo = await Producto.findById( id );
//             if ( !modelo ) {
//                 return res.status(400).json({
//                     msg: `No existe un producto con el id ${ id }`
//                 });
//             }
//             break;
//         default:
//             return res.status(500).json({
//                 msg: 'Colección no implementada'
//             });
//     }

//     if ( modelo.img ) {
//         const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img );
//         if ( fs.existsSync( pathImagen ) ) {
//             fs.unlinkSync( pathImagen );
//         }
//     }
    
//     const nombre = await subirArchivo( req.files.archivo, coleccion );
//     modelo.img = nombre;
//     await modelo.save();

//     res.json( modelo );

// };

const actualizarImgs = async ( req, res = response ) => {

    const { id, coleccion } = req.params;

    let modelo = null;

    switch ( coleccion ) {
        case 'usuarios':
            modelo = await Usuario.findById( id );
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                });
            }
            break;
        case 'productos':
            modelo = await Producto.findById( id );
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${ id }`
                });
            }
            break;
        default:
            return res.status(500).json({
                msg: 'Colección no implementada'
            });
    }

    if ( modelo.img ) {
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[ nombreArr.length - 1 ];
        const [ publicId ] = nombre.split('.');
        cloudinary.uploader.destroy( publicId );
    }
    
    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
    modelo.img = secure_url;

    await modelo.save();

    res.json( modelo );

};

const mostrarImagen = async ( req, res = response ) => {

    const { id, coleccion } = req.params;

    let modelo = null;

    switch ( coleccion ) {
        case 'usuarios':
            modelo = await Usuario.findById( id );
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                });
            }
            break;
        case 'productos':
            modelo = await Producto.findById( id );
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${ id }`
                });
            }
            break;
        default:
            return res.status(500).json({
                msg: 'Colección no implementada'
            });
    }

    if ( modelo.img ) {
        const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img );
        if ( fs.existsSync( pathImagen ) ) {
            return res.sendFile( pathImagen );
        }
    }

    const pathDefault = path.join( __dirname, '../public/assets/no-image.jpg' );

    res.sendFile( pathDefault );

};

module.exports = { 
    cargarArchivo,
    actualizarImgs,
    mostrarImagen
};