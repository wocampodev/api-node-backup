const { Router } = require("express");
const { check } = require("express-validator");

const { validatJWT, 
        validarCampos,
        tieneRol } =  require('../middlewares');

const { esRolValido, 
        esEmailNuevo, 
        existeUsuarioConEseId } = require("../helpers");

const { UsuarioController } = require("../controllers");


const router = Router();

router.get('/', UsuarioController.usuariosGet );

router.post('/', [

    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( esEmailNuevo ),
    check('password', 'El password debe ser de más de 6 letras').isLength({ min: 6 }),
    check('rol').custom( esRolValido ),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validarCampos

], UsuarioController.usuariosPost );

router.put('/:id', [

    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioConEseId ),
    check('rol').custom( esRolValido ),
    validarCampos
    
], UsuarioController.usuariosPut );

router.patch('/', UsuarioController.usuariosPatch );

router.delete('/:id', [

    validatJWT,
    // esAdmin,
    tieneRol( "ADMIN_ROLE", "VENTAS_ROLE" ),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioConEseId ),
    validarCampos

], UsuarioController.usuariosDelete );


module.exports = router;
