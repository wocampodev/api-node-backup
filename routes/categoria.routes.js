const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos, validatJWT, esAdmin } = require("../middlewares");

const { CategoriaController } = require('../controllers');

const { esCategoriaNueva, existeCategoria } = require("../helpers/db-validators");


const router = Router();

router.get( '/', CategoriaController.getCategorias );

router.get( '/:id', [

    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos

], CategoriaController.getCategoria );

router.post( '/', [

    validatJWT,
    check('nombre', 'El nombre es requerido').notEmpty(),
    validarCampos
    
], CategoriaController.crearCategoria );

router.put( '/:id', [

    validatJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCategoria ),
    check('nombre').custom( esCategoriaNueva ),
    check('nombre', 'El nombre es requerido').notEmpty(),
    validarCampos
    
], CategoriaController.actualizarCategoria );

router.delete( '/:id', [

    validatJWT,
    esAdmin,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos

], CategoriaController.deleteCategoria );


module.exports = router;