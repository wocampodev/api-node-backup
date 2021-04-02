const { response, request } = require("express");

const { Producto, Categoria } = require("../models");


const getProductos = async ( req = request, res = response ) => {

    const { limite = 10, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, productos ] = await Promise.all([
        Producto.countDocuments( query ),
        Producto.find( query )
            .populate('user', 'nombre')
            .populate('categoria', 'nombre')
            .skip( Number(desde) )
            .limit( Number(limite) )
    ]);

    return res.json({ total, productos });

};

const getProducto = async ( req = request, res = response ) => {

    const { id } = req.params;

    const producto = await Producto.findById( id )
        .populate('user', 'nombre')
        .populate('categoria', 'nombre');

    res.status(200).json({ producto });

};

const crearProducto = async ( req = request, res = response ) => {

    const nombre = req.body.nombre.toUpperCase();
    const { precio, descripcion, categoria: cat_id } = req.body;

    const productoPosible = await Producto.findOne({ nombre });

    if ( productoPosible ) {
        return res.status(400).json({
            msg: `El producto ${ nombre } ya fue creada`
        });
    }
    
    const data = {
        nombre,
        user: req.usuario._id,
        precio: parseFloat(precio),
        descripcion,
        categoria: cat_id
    };
    
    const producto = new Producto( data );

    await producto.save();

    return res.status(201).json( producto );

};

const actualizarProducto = async ( req = request, res = response ) => {

    const { id } = req.params;
    const { estado, user, ...data } = req.body;
    const userId = req.usuario._id;

    const object = { user: userId };

    if ( data.nombre ) {
        object.nombre = data.nombre.toUpperCase();
    }
    if ( data.precio ) {
        object.precio = data.precio;
    }
    if ( data.disponible ) {
        object.disponible = data.disponible;
    }
    if ( data.categoria ) {
        object.categoria = data.categoria;
    }

    const producto = await Producto.findByIdAndUpdate( id, 
        object, 
        { new: true } 
    )
    .populate('user', 'nombre')
    .populate('categoria', 'nombre');

    return res.status(200).json({
        msg: 'Producto actualizado',
        producto
    })

};

const deleteProducto = async ( req = request, res = response ) => {

    const { id } = req.params;
    const userId = req.usuario._id;

    await Producto.findByIdAndUpdate( id, 
        { estado: false, user: userId }, 
        { new: true } 
    );

    return res.status(200).json({
        msg: 'Producto deshabilitado',
    })

};


module.exports = {
    crearProducto,
    getProductos,
    getProducto,
    actualizarProducto,
    deleteProducto
};