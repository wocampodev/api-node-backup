const { response, request } = require("express");

const { Categoria } = require("../models");


const getCategorias = async ( req = request, res = response ) => {

    const { limite = 10, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments( query ),
        Categoria.find( query )
            .populate('user', 'nombre')
            .skip( Number(desde) )
            .limit( Number(limite) )
    ]);

    return res.json({ total, categorias });

};

const getCategoria = async ( req = request, res = response ) => {

    const { id } = req.params;

    const categoria = await Categoria.findById( id )
        .populate('user', 'nombre');

    res.status(200).json({ categoria });

};

const crearCategoria = async ( req = request, res = response ) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaPosible = await Categoria.findOne({ nombre });

    if ( categoriaPosible ) {
        return res.status(400).json({
            msg: `La categoría ${ nombre } ya fue creada`
        });
    }
    
    const data = {
        nombre,
        user: req.usuario._id
    };
    
    const categoria = new Categoria( data );

    await categoria.save();

    return res.status(201).json( categoria );

};

const actualizarCategoria = async ( req = request, res = response ) => {

    const { id } = req.params;
    const nombre = req.body.nombre.toUpperCase();
    const userId = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate( id, 
        { nombre, user: userId }, 
        { new: true } 
    ).populate('user', 'nombre');

    return res.status(200).json({
        msg: 'Categoría actualizada',
        categoria
    })

};

const deleteCategoria = async ( req = request, res = response ) => {

    const { id } = req.params;
    const userId = req.usuario._id;

    await Categoria.findByIdAndUpdate( id, 
        { estado: false, user: userId }, 
        { new: true } 
    );

    return res.status(200).json({
        msg: 'Categoría deshabilitada',
    })

};


module.exports = {
    crearCategoria,
    getCategorias,
    getCategoria,
    actualizarCategoria,
    deleteCategoria
};