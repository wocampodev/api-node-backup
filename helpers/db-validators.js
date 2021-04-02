const { Categoria, Usuario, Role, Producto } = require("../models");


const esRolValido = async ( rol = '' ) => {
    
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no existe.`)
    }

};

const esEmailNuevo = async ( correo = '' ) => {

    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
        throw new Error(`El email ${ correo }, está en uso.`);
    } 

};

const existeUsuarioConEseId = async ( id = '' ) => {

    const existeUsuario = await Usuario.findById( id );
    if ( !existeUsuario ) {
        throw new Error(`El usuario con id ${ id } no existe.`);
    } 

};

const esCategoriaNueva = async ( name = '' ) => {

    const nombre = name.toUpperCase();

    const existeCategoria = await Categoria.findOne({ nombre });
    if ( existeCategoria ) {
        throw new Error(`La categoría ${ nombre } ya existe.`);
    }

};

const esProductoNuevo = async ( name = '' ) => {

    const nombre = name.toUpperCase();

    const existeProducto = await Producto.findOne({ nombre });
    if ( existeProducto ) {
        throw new Error(`El producto ${ nombre } ya existe.`);
    }

};

const existeCategoria = async ( id = '' ) => {

    const existeCategoria = await Categoria.findById( id );
    if ( !existeCategoria ) {
        throw new Error(`La categoría con id ${ id } no existe.`);
    } 

};

const existeProducto = async ( id = '' ) => {

    const existeProducto = await Producto.findById( id );
    if ( !existeProducto ) {
        throw new Error(`El producto con id ${ id } no existe.`);
    } 

};


module.exports = { 
    esRolValido, 
    esEmailNuevo, 
    existeUsuarioConEseId,
    esCategoriaNueva,
    existeCategoria,
    esProductoNuevo,
    existeProducto
};