const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos, validatJWT, esAdmin, tieneRol } = require("../middlewares");

const { ProductoController } = require('../controllers');

const { esProductoNuevo, existeProducto, existeCategoria } = require("../helpers");


const router = Router();

router.get( '/', ProductoController.getProductos );

router.get( '/:id', [

    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos

], ProductoController.getProducto );

router.post( '/', [

    validatJWT,
    tieneRol( "ADMIN_ROLE", "VENTAS_ROLE" ),
    check('categoria', 'La categoría no puede ser real').isMongoId(),
    check('categoria').custom( existeCategoria ),
    check('nombre', 'El nombre es requerido').notEmpty(),
    check('nombre').custom( esProductoNuevo ),
    check('precio', 'El precio es requerido').notEmpty(),
    check('precio', 'El precio no es válido').isNumeric(),
    check('descripcion', 'La descripción es requerida').notEmpty(),
    check('descripcion', 'La descripción es muy corta').isLength({min: 12}),
    validarCampos
    
], ProductoController.crearProducto );

router.put( '/:id', [

    validatJWT,
    tieneRol( "ADMIN_ROLE", "VENTAS_ROLE" ),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeProducto ),
    // check('categoria', 'La categoría no puede ser real').isMongoId(),
    // check('categoria').custom( existeCategoria ),
    // check('nombre').custom( esProductoNuevo ),
    // check('precio', 'El precio no es válido').isNumeric(),
    // check('descripcion', 'La descripción es muy corta').isLength({min: 12}),
    // check('disponible', 'El valor es incorrecto').isBoolean(),
    validarCampos
    
], ProductoController.actualizarProducto );

router.delete( '/:id', [

    validatJWT,
    esAdmin,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos

], ProductoController.deleteProducto );


module.exports = router;