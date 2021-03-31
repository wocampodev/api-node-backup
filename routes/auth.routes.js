const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validate-fields");
const { login, loginWithGoogle } = require("../controllers/auth.controller");


const router = Router();

router.post( '/login', [

    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validarCampos
    
], login );

router.post( '/google', [

    check('id_token', 'El token es necesario').notEmpty(),
    validarCampos
    
], loginWithGoogle );


module.exports = router;