const express = require('express');
const cors = require('cors');

const { DBConnection } = require('../database/bootstrap');


class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:       '/api/auth',
            buscar:     '/api/buscar',
            categorias: '/api/categorias',
            usuarios:   '/api/usuarios',
            productos:  '/api/productos',
        };
        
        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de la app
        this.routes();
    }

    async conectarDB() {
        await DBConnection();
    }

    middlewares() {

        // Cors
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio público
        this.app.use( express.static('public') );

    }

    routes() {
        
        this.app.use( this.paths.auth,         require('../routes/auth.routes') );
        this.app.use( this.paths.buscar,       require('../routes/buscar.routes') );
        this.app.use( this.paths.categorias,   require('../routes/categoria.routes') );
        this.app.use( this.paths.productos,    require('../routes/producto.routes') );
        this.app.use( this.paths.usuarios,     require('../routes/usuario.routes') );

    }

    listen() {

        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });

    }

}


module.exports = Server;