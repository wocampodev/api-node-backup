const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos, validarArchivo } = require("../middlewares");
const { coleccionesPermitidas } = require("../helpers");

const { UploadController } = require("../controllers");


const router = Router();

router.post( '/', validarArchivo, UploadController.cargarArchivo );

router.put( '/:coleccion/:id', [

    validarArchivo,
    check('id', 'El id no es un ID de Mongo válido').isMongoId(),
    check('coleccion').custom(value => coleccionesPermitidas(value, ['usuarios', 'productos'])),
    validarCampos

], UploadController.actualizarImgs );

router.get( '/:coleccion/:id', [

    check('id', 'El id no es un ID de Mongo válido').isMongoId(),
    check('coleccion').custom(value => coleccionesPermitidas(value, ['usuarios', 'productos'])),
    validarCampos

], UploadController.mostrarImagen );


module.exports = router;