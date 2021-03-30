const Usuario = require("../models/usuario.model");
const Role = require("../models/role.model");


const esRolValido = async ( rol = '' ) => {
    
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no existe.`)
    }

};

const esEmailNuevo = async ( correo = '' ) => {

    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
        throw new Error(`El email ${ correo }, está en uso`);
    } 

};

const existeUsuarioConEseId = async ( id = '' ) => {

    const existeUsuario = await Usuario.findById( id );
    if ( !existeUsuario ) {
        throw new Error(`El usuario con id ${ id } no existe,`);
    } 

};


module.exports = { esRolValido, esEmailNuevo, existeUsuarioConEseId };