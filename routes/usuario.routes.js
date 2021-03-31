const { Router } = require("express");
const { check } = require("express-validator");

const { validatJWT, 
        validarCampos, 
        esAdmin, 
        tieneRol } =  require('../middlewares');

const { esRolValido, 
        esEmailNuevo, 
        existeUsuarioConEseId } = require("../helpers/db-validators");

const { usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosPatch,
        usuariosDelete } = require("../controllers/usuario.controller");


const router = Router();

router.get('/', usuariosGet );

router.post('/', [

    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( esEmailNuevo ),
    check('password', 'El password debe ser de más de 6 letras').isLength({ min: 6 }),
    check('rol').custom( esRolValido ),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validarCampos

], usuariosPost );

router.put('/:id', [

    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioConEseId ),
    check('rol').custom( esRolValido ),
    validarCampos
    
], usuariosPut );

router.patch('/', usuariosPatch );

router.delete('/:id', [

    validatJWT,
    // esAdmin,
    tieneRol( "ADMIN_ROLE", "VENTAS_ROLE" ),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioConEseId ),
    validarCampos

], usuariosDelete );


module.exports = router;
