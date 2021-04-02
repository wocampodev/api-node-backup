const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares");

const { AuthController } = require("../controllers");


const router = Router();

router.post( '/login', [

    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validarCampos
    
], AuthController.login );

router.post( '/google', [

    check('id_token', 'El token es necesario').notEmpty(),
    validarCampos
    
], AuthController.loginWithGoogle );


module.exports = router;